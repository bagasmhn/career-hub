import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

import {
  StatusJob,
  StatusRequest,
} from '@prisma/client';

@Injectable()
export class JobService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // =====================================================
  // CREATE JOB
  // RECRUITER
  // =====================================================

  async create(
    userId: number,
    dto: CreateJobDto,
  ) {
    // Cari company milik recruiter yang sedang login
    const company =
      await this.prisma.company.findUnique({
        where: {
          userId,
        },
      });

    if (!company) {
      throw new NotFoundException(
        'Kamu belum memiliki company.',
      );
    }

    // Company harus sudah diterima admin
    if (
      company.status !==
      StatusRequest.ACCEPTED
    ) {
      throw new ForbiddenException(
        'Company kamu belum disetujui admin.',
      );
    }

    // Buat job
    const job =
      await this.prisma.job.create({
        data: {
          companyId: company.id,

          title: dto.title,
          description: dto.description,
          location: dto.location,
          salary: dto.salary,

          // Default OPEN
          status: StatusJob.OPEN,
        },

        include: {
          company: {
            select: {
              id: true,
              name: true,
              logo: true,
              banner: true,
            },
          },
        },
      });

    return {
      message:
        'Job telah berhasil ditambahkan.',
      data: job,
    };
  }

  // =====================================================
  // GET ALL OPEN JOB
  // PUBLIC
  // GET /api/jobs
  // =====================================================

  async findAll() {
    return this.prisma.job.findMany({
      where: {
        // Hanya job yang masih OPEN
        status: StatusJob.OPEN,

        // Company juga harus ACCEPTED
        company: {
          status: StatusRequest.ACCEPTED,
        },
      },

      include: {
        company: {
          select: {
            id: true,
            name: true,
            logo: true,
            banner: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // =====================================================
  // GET JOB BY ID
  // PUBLIC
  // GET /api/jobs/:id
  // =====================================================

  async findOne(id: number) {
    const job =
      await this.prisma.job.findUnique({
        where: {
          id,
        },

        include: {
          company: {
            select: {
              id: true,
              name: true,
              description: true,
              email: true,
              phone: true,
              website: true,
              industry: true,
              address: true,
              logo: true,
              banner: true,
              status: true,
            },
          },
        },
      });

    if (!job) {
      throw new NotFoundException(
        'Job not found.',
      );
    }

    return job;
  }

  // =====================================================
  // GET MY JOBS
  // RECRUITER
  // GET /api/jobs/my
  // =====================================================

  async findMyJobs(userId: number) {
    const company =
      await this.prisma.company.findUnique({
        where: {
          userId,
        },
      });

    if (!company) {
      throw new NotFoundException(
        'Kamu belum memiliki company.',
      );
    }

    return this.prisma.job.findMany({
      where: {
        companyId: company.id,
      },

      include: {
        company: {
          select: {
            id: true,
            name: true,
            logo: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // =====================================================
  // UPDATE JOB
  // RECRUITER
  // PATCH /api/jobs/:id
  // =====================================================

  async update(
    id: number,
    userId: number,
    dto: UpdateJobDto,
  ) {
    const job =
      await this.prisma.job.findUnique({
        where: {
          id,
        },

        include: {
          company: true,
        },
      });

    if (!job) {
      throw new NotFoundException(
        'Job not found.',
      );
    }

    // Pastikan job milik company recruiter
    if (
      job.company.userId !== userId
    ) {
      throw new ForbiddenException(
        'Kamu tidak memiliki job ini.',
      );
    }

    const updatedJob =
      await this.prisma.job.update({
        where: {
          id,
        },

        data: dto,
      });

    return {
      message:
        'Job berhasil diperbarui.',
      data: updatedJob,
    };
  }

  // =====================================================
  // DELETE JOB
  // RECRUITER
  // DELETE /api/jobs/:id
  // =====================================================

  async remove(
    id: number,
    userId: number,
  ) {
    const job =
      await this.prisma.job.findUnique({
        where: {
          id,
        },

        include: {
          company: true,
        },
      });

    if (!job) {
      throw new NotFoundException(
        'Job not found.',
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

    await this.prisma.job.delete({
      where: {
        id,
      },
    });

    return {
      message:
        'Job berhasil dihapus.',
    };
  }

  // =====================================================
// CLOSE JOB
// RECRUITER
// PATCH /api/jobs/:id/close
// =====================================================

async close(
  id: number,
  userId: number,
) {
  const job =
    await this.prisma.job.findUnique({
      where: {
        id,
      },
      include: {
        company: true,
      },
    });

  if (!job) {
    throw new NotFoundException(
      'Job not found.',
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

  // Pastikan job masih OPEN
  if (job.status === StatusJob.CLOSED) {
    throw new BadRequestException(
      'Job ini sudah ditutup.',
    );
  }

  const closedJob =
    await this.prisma.job.update({
      where: {
        id,
      },
      data: {
        status: StatusJob.CLOSED,
      },
    });

  return {
    message:
      'Job berhasil ditutup.',
    data: closedJob,
  };
}
}