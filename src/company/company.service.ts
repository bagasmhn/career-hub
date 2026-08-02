import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateCompanyDto } from './dto/create.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { RejectCompanyDto } from './dto/reject-company.dto';

import {
  Role,
  StatusRequest,
} from '@prisma/client';

import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class CompanyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // =====================================================
  // CREATE COMPANY
  // POST /companies
  // =====================================================

  async create(
    userId: number,
    dto: CreateCompanyDto,
    logo?: Express.Multer.File,
    banner?: Express.Multer.File,
  ) {
    // =====================================================
    // 1. CARI USER
    // =====================================================

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // =====================================================
    // 2. CEK ROLE
    // =====================================================

    if (user.role !== Role.RECRUITER) {
      throw new ForbiddenException(
        'Only recruiter can create company.',
      );
    }

    // =====================================================
    // 3. CEK APAKAH SUDAH PUNYA COMPANY
    // =====================================================

    const existingCompany =
      await this.prisma.company.findUnique({
        where: {
          userId,
        },
      });

    if (existingCompany) {
      throw new BadRequestException(
        'Kamu telah mempunyai sebuah perusahaan.',
      );
    }

    // =====================================================
    // 4. UPLOAD LOGO
    // =====================================================

    let logoUrl: string | undefined;

    if (logo) {
      const result =
        await this.cloudinaryService.uploadImage(
          logo,
          'careerhub/companies/logo',
        );

      logoUrl = result.secure_url;
    }

    // =====================================================
    // 5. UPLOAD BANNER
    // =====================================================

    let bannerUrl: string | undefined;

    if (banner) {
      const result =
        await this.cloudinaryService.uploadImage(
          banner,
          'careerhub/companies/banner',
        );

      bannerUrl = result.secure_url;
    }

    // =====================================================
    // 6. CREATE COMPANY
    // =====================================================

    const company =
      await this.prisma.company.create({
        data: {
          ...dto,

          userId,

          logo: logoUrl,
          banner: bannerUrl,

          status: StatusRequest.PENDING,

          rejectionReason: null,
        },
      });

    return {
      message:
        'Company berhasil dibuat dan sedang menunggu persetujuan admin.',
      data: company,
    };
  }

  // =====================================================
  // GET ALL ACCEPTED COMPANY
  // GET /companies
  // PUBLIC
  // =====================================================

  async findAll() {
    return this.prisma.company.findMany({
      where: {
        status: StatusRequest.ACCEPTED,
      },

      include: {
        user: {
          select: {
            id: true,
            fullname: true,
            email: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // =====================================================
  // GET ALL COMPANY
  // GET /companies/admin/all
  // ADMIN / SUPERADMIN
  // =====================================================

  async findAllAdmin() {
    return this.prisma.company.findMany({
      include: {
        user: {
          select: {
            id: true,
            fullname: true,
            email: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // =====================================================
  // GET PENDING COMPANY
  // GET /companies/pending
  // ADMIN / SUPERADMIN
  // =====================================================

  async findPending() {
    return this.prisma.company.findMany({
      where: {
        status: StatusRequest.PENDING,
      },

      include: {
        user: {
          select: {
            id: true,
            fullname: true,
            email: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // =====================================================
  // APPROVE COMPANY
  // PATCH /companies/:id/approve
  // =====================================================

  async approve(id: number) {
    const company = await this.findOne(id);

    if (
      company.status !==
      StatusRequest.PENDING
    ) {
      throw new BadRequestException(
        'Company is not pending.',
      );
    }

    const updatedCompany =
      await this.prisma.company.update({
        where: {
          id,
        },

        data: {
          status: StatusRequest.ACCEPTED,
          rejectionReason: null,
        },
      });

    return {
      message:
        'Company berhasil disetujui.',
      data: updatedCompany,
    };
  }

  // =====================================================
  // REJECT COMPANY
  // PATCH /companies/:id/reject
  // =====================================================

  async reject(
    id: number,
    dto: RejectCompanyDto,
  ) {
    const company = await this.findOne(id);

    if (
      company.status !==
      StatusRequest.PENDING
    ) {
      throw new BadRequestException(
        'Company is not pending.',
      );
    }

    const updatedCompany =
      await this.prisma.company.update({
        where: {
          id,
        },

        data: {
          status: StatusRequest.REJECTED,
          rejectionReason: dto.reason,
        },
      });

    return {
      message:
        'Company berhasil ditolak.',
      data: updatedCompany,
    };
  }

  // =====================================================
  // GET COMPANY BY ID
  // GET /companies/:id
  // =====================================================

  async findOne(id: number) {
    const company =
      await this.prisma.company.findUnique({
        where: {
          id,
        },

        include: {
          user: {
            select: {
              id: true,
              fullname: true,
              email: true,
            },
          },
        },
      });

    if (!company) {
      throw new NotFoundException(
        'Company not found',
      );
    }

    return company;
  }

  // =====================================================
  // GET MY COMPANY
  // GET /companies/me
  // =====================================================

  async myCompany(userId: number) {
    const company =
      await this.prisma.company.findUnique({
        where: {
          userId,
        },

        include: {
          user: {
            select: {
              id: true,
              fullname: true,
              email: true,
            },
          },
        },
      });

    if (!company) {
      throw new NotFoundException(
        'Company not found',
      );
    }

    return company;
  }

  // =====================================================
  // UPDATE COMPANY
  // PATCH /companies/:id
  // =====================================================

  async update(
    id: number,
    userId: number,
    dto: UpdateCompanyDto,
  ) {
    const company = await this.findOne(id);

    if (company.userId !== userId) {
      throw new ForbiddenException(
        'You cannot update this company.',
      );
    }

    const updatedCompany =
      await this.prisma.company.update({
        where: {
          id,
        },

        data: {
          ...dto,
        },
      });

    return {
      message:
        'Company berhasil diperbarui.',
      data: updatedCompany,
    };
  }

  // =====================================================
  // DELETE COMPANY
  // DELETE /companies/:id
  // =====================================================

  async remove(
    id: number,
    userId: number,
  ) {
    const company = await this.findOne(id);

    if (company.userId !== userId) {
      throw new ForbiddenException(
        'You cannot delete this company.',
      );
    }

    await this.prisma.company.delete({
      where: {
        id,
      },
    });

    return {
      message:
        'Company berhasil dihapus.',
    };
  }
}