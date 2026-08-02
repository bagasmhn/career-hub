import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import {
  Role,
  StatusJob,
  StatusRequest,
} from '@prisma/client';

import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ApplicationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // =====================================================
  // APPLY JOB
  // JOBSEEKER
  // =====================================================

  async apply(
    userId: number,
    jobId: number,
    cv: Express.Multer.File,
  ) {
    // =====================================================
    // 1. CEK USER
    // =====================================================

    const user =
      await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

    if (!user) {
      throw new NotFoundException(
        'User tidak ditemukan.',
      );
    }

    // =====================================================
    // 2. CEK ROLE
    // =====================================================

    if (user.role !== Role.JOBSEEKER) {
      throw new ForbiddenException(
        'Hanya jobseeker yang dapat melamar pekerjaan.',
      );
    }

    // =====================================================
    // 3. CV WAJIB
    // =====================================================

    if (!cv) {
      throw new BadRequestException(
        'CV wajib diupload.',
      );
    }

    // =====================================================
    // 4. CEK JOB
    // =====================================================

    const job =
      await this.prisma.job.findUnique({
        where: {
          id: jobId,
        },

        include: {
          company: true,
        },
      });

    if (!job) {
      throw new NotFoundException(
        'Job tidak ditemukan.',
      );
    }

    // =====================================================
    // 5. CEK COMPANY
    // =====================================================

    if (
      job.company.status !==
      StatusRequest.ACCEPTED
    ) {
      throw new ForbiddenException(
        'Company belum disetujui admin.',
      );
    }

    // =====================================================
    // 6. CEK STATUS JOB
    // =====================================================

    if (job.status !== StatusJob.OPEN) {
      throw new BadRequestException(
        'Job sudah ditutup dan tidak dapat dilamar.',
      );
    }

    // =====================================================
    // 7. CEK SUDAH PERNAH APPLY
    // =====================================================

    const existingApplication =
      await this.prisma.application.findUnique({
        where: {
          userId_jobId: {
            userId,
            jobId,
          },
        },
      });

    if (existingApplication) {
      throw new BadRequestException(
        'Kamu sudah melamar pekerjaan ini.',
      );
    }

    // =====================================================
    // 8. UPLOAD CV KE CLOUDINARY
    // =====================================================

    const result =
      await this.cloudinaryService.uploadFile(
        cv,
        'careerhub/applications/cv',
      );

    const cvUrl = result.secure_url;

    // =====================================================
    // 9. SIMPAN APPLICATION
    // =====================================================

    const application =
      await this.prisma.application.create({
        data: {
          userId,
          jobId,
          cvUrl,
        },

        include: {
          user: {
            select: {
              id: true,
              fullname: true,
              email: true,
            },
          },

          job: {
            select: {
              id: true,
              title: true,
              location: true,
              salary: true,

              company: {
                select: {
                  id: true,
                  name: true,
                  logo: true,
                },
              },
            },
          },
        },
      });

    return {
      message:
        'Lamaran berhasil dikirim.',
      data: application,
    };
  }

  // =====================================================
  // GET MY APPLICATIONS
  // JOBSEEKER
  // =====================================================

  async findMyApplications(
    userId: number,
  ) {
    return this.prisma.application.findMany({
      where: {
        userId,
      },

      include: {
        job: {
          select: {
            id: true,
            title: true,
            description: true,
            location: true,
            salary: true,
            status: true,

            company: {
              select: {
                id: true,
                name: true,
                logo: true,
              },
            },
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // =====================================================
  // GET APPLICATION BY ID
  // JOBSEEKER / RECRUITER
  // =====================================================

  async findOne(
    id: number,
    userId: number,
  ) {
    const application =
      await this.prisma.application.findUnique({
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

          job: {
            include: {
              company: true,
            },
          },
        },
      });

    if (!application) {
      throw new NotFoundException(
        'Lamaran tidak ditemukan.',
      );
    }

    // Jobseeker hanya boleh melihat lamaran miliknya
    if (
      application.userId === userId
    ) {
      return application;
    }

    // Recruiter hanya boleh melihat lamaran
    // pada company miliknya
    if (
      application.job.company.userId ===
      userId
    ) {
      return application;
    }

    throw new ForbiddenException(
      'Kamu tidak memiliki akses ke lamaran ini.',
    );
  }

  // =====================================================
  // GET APPLICANTS BY JOB
  // RECRUITER
  // =====================================================

  async findByJob(
    jobId: number,
    userId: number,
  ) {
    const job =
      await this.prisma.job.findUnique({
        where: {
          id: jobId,
        },

        include: {
          company: true,
        },
      });

    if (!job) {
      throw new NotFoundException(
        'Job tidak ditemukan.',
      );
    }

    // Pastikan job milik recruiter
    if (
      job.company.userId !== userId
    ) {
      throw new ForbiddenException(
        'Kamu tidak memiliki job ini.',
      );
    }

    return this.prisma.application.findMany({
      where: {
        jobId,
      },

      include: {
        user: {
          select: {
            id: true,
            fullname: true,
            email: true,
          },
        },

        job: {
          select: {
            id: true,
            title: true,
            location: true,
            status: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}