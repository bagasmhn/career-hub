import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Role } from '@prisma/client';
import { RejectCompanyDto } from './dto/reject-company.dto';
import { StatusRequest } from '@prisma/client';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, dto: CreateCompanyDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role !== Role.RECRUITER) {
      throw new ForbiddenException(
        'Only recruiter can create company.',
      );
    }

    const existingCompany = await this.prisma.company.findUnique({
      where: {
        userId,
      },
    });

    if (existingCompany) {
      throw new BadRequestException(
        'Kamu telah mempunyai sebuah perusahaan.',
      );
    }

    return this.prisma.company.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  // GET ALL
    async findAll() {
      return this.prisma.company.findMany();
    }

//PENDING COMPANY
async findPending() {
  return this.prisma.company.findMany({
    where: {
    status: StatusRequest.PENDING
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
}

//ACCEPT COMPANY
async approve(id: number) {
  const company = await this.findOne(id);

  return this.prisma.company.update({
    where: {
      id: company.id,
    },
    data: {
      status: StatusRequest.ACCEPTED,
      rejectionReason: null,
    },
  });
}

//REJECT COMPANY
async reject(
  id: number,
  dto: RejectCompanyDto,
) {
  const company = await this.findOne(id);

  return this.prisma.company.update({
    where: {
      id: company.id,
    },
    data: {
      status: StatusRequest.REJECTED,
      rejectionReason: dto.reason,
    },
  });
}



// GET COMPANY BY ID
  async findOne(id: number) {
    const company = await this.prisma.company.findUnique({
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
      throw new NotFoundException('Company not found');
    }

    return company;
  }

  async myCompany(userId: number) {
    const company = await this.prisma.company.findUnique({
      where: {
        userId,
      },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return company;
  }

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

    return this.prisma.company.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: number, userId: number) {
    const company = await this.findOne(id);

    if (company.userId !== userId) {
      throw new ForbiddenException(
        'You cannot delete this company.',
      );
    }

    return this.prisma.company.delete({
      where: {
        id,
      },
    });
  }
}