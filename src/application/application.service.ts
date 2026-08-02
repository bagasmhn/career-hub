import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import {
  Role,
  StatusApplication,
  StatusJob,
  StatusRequest,
} from '@prisma/client';

@Injectable()
export class ApplicationService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // =====================================================
  // GET ALL APPLICATION
  // RECRUITER
  // HANYA LAMARAN PADA JOB MILIKNYA
  // =====================================================

  async findRecruiterApplications(
    userId: number,
  ) {
    return this.prisma.application.findMany({
      where: {
        job: {
          company: {
            userId,
          },
        },
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
  // RECRUITER
  // =====================================================

  async findOneForRecruiter(
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
        'Application tidak ditemukan.',
      );
    }

    // Pastikan job berasal dari company recruiter
    if (
      application.job.company.userId !==
      userId
    ) {
      throw new ForbiddenException(
        'Kamu tidak memiliki akses ke application ini.',
      );
    }

    return application;
  }

  // =====================================================
  // ACCEPT APPLICATION
  // RECRUITER
  // =====================================================

  async accept(
    id: number,
    userId: number,
  ) {
    const application =
      await this.findOneForRecruiter(
        id,
        userId,
      );

    // Hanya PENDING yang bisa diterima
    if (
      application.status !==
      StatusApplication.PENDING
    ) {
      throw new BadRequestException(
        'Application sudah diproses.',
      );
    }

    // Pastikan job masih OPEN
    if (
      application.job.status !==
      StatusJob.OPEN
    ) {
      throw new BadRequestException(
        'Job sudah ditutup.',
      );
    }

    const updatedApplication =
      await this.prisma.application.update({
        where: {
          id,
        },

        data: {
          status:
            StatusApplication.ACCEPTED,
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
            },
          },
        },
      });

    return {
      message:
        'Application berhasil diterima.',
      data: updatedApplication,
    };
  }

  // =====================================================
  // REJECT APPLICATION
  // RECRUITER
  // =====================================================

  async reject(
    id: number,
    userId: number,
  ) {
    const application =
      await this.findOneForRecruiter(
        id,
        userId,
      );

    // Hanya PENDING yang bisa ditolak
    if (
      application.status !==
      StatusApplication.PENDING
    ) {
      throw new BadRequestException(
        'Application sudah diproses.',
      );
    }

    const updatedApplication =
      await this.prisma.application.update({
        where: {
          id,
        },

        data: {
          status:
            StatusApplication.REJECTED,
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
            },
          },
        },
      });

    return {
      message:
        'Application berhasil ditolak.',
      data: updatedApplication,
    };
  }

  // =====================================================
  // GET MY APPLICATION
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
  // JOBSEEKER
  // =====================================================

  async findMyApplication(
    id: number,
    userId: number,
  ) {
    const application =
      await this.prisma.application.findUnique({
        where: {
          id,
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
      });

    if (!application) {
      throw new NotFoundException(
        'Application tidak ditemukan.',
      );
    }

    if (
      application.userId !== userId
    ) {
      throw new ForbiddenException(
        'Kamu tidak memiliki application ini.',
      );
    }

    return application;
  }
}