"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let ApplicationService = class ApplicationService {
    prisma;
    cloudinaryService;
    constructor(prisma, cloudinaryService) {
        this.prisma = prisma;
        this.cloudinaryService = cloudinaryService;
    }
    async applyJob(userId, jobId, file) {
        if (!file) {
            throw new common_1.BadRequestException('CV wajib diupload.');
        }
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User tidak ditemukan.');
        }
        if (user.role !== client_1.Role.JOBSEEKER) {
            throw new common_1.ForbiddenException('Hanya jobseeker yang dapat melamar.');
        }
        const job = await this.prisma.job.findUnique({
            where: {
                id: jobId,
            },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job tidak ditemukan.');
        }
        if (job.status !== client_1.StatusJob.OPEN) {
            throw new common_1.BadRequestException('Lowongan sudah ditutup.');
        }
        const existing = await this.prisma.application.findUnique({
            where: {
                userId_jobId: {
                    userId,
                    jobId,
                },
            },
        });
        if (existing) {
            throw new common_1.BadRequestException('Kamu sudah melamar pekerjaan ini.');
        }
        const upload = await this.cloudinaryService.uploadFile(file, 'careerhub/cv');
        const application = await this.prisma.application.create({
            data: {
                userId,
                jobId,
                cvUrl: upload.secure_url,
                status: client_1.StatusApplication.PENDING,
            },
            include: {
                job: {
                    select: {
                        id: true,
                        title: true,
                        location: true,
                        company: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            },
        });
        return {
            message: 'Lamaran berhasil dikirim.',
            data: application,
        };
    }
    async findRecruiterApplications(userId) {
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
    async findOneForRecruiter(id, userId) {
        const application = await this.prisma.application.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
                job: {
                    include: {
                        company: true,
                    },
                },
            },
        });
        if (!application) {
            throw new common_1.NotFoundException('Application tidak ditemukan.');
        }
        if (application.job.company.userId !== userId) {
            throw new common_1.ForbiddenException('Tidak memiliki akses.');
        }
        return application;
    }
    async accept(id, userId) {
        const application = await this.findOneForRecruiter(id, userId);
        if (application.status !==
            client_1.StatusApplication.PENDING) {
            throw new common_1.BadRequestException('Application sudah diproses.');
        }
        return this.prisma.application.update({
            where: {
                id,
            },
            data: {
                status: client_1.StatusApplication.ACCEPTED,
            },
        });
    }
    async reject(id, userId) {
        const application = await this.findOneForRecruiter(id, userId);
        if (application.status !==
            client_1.StatusApplication.PENDING) {
            throw new common_1.BadRequestException('Application sudah diproses.');
        }
        return this.prisma.application.update({
            where: {
                id,
            },
            data: {
                status: client_1.StatusApplication.REJECTED,
            },
        });
    }
    async findMyApplications(userId) {
        return this.prisma.application.findMany({
            where: {
                userId,
            },
            include: {
                job: {
                    include: {
                        company: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async findMyApplication(id, userId) {
        const application = await this.prisma.application.findUnique({
            where: {
                id,
            },
            include: {
                job: {
                    include: {
                        company: true,
                    },
                },
            },
        });
        if (!application) {
            throw new common_1.NotFoundException('Application tidak ditemukan.');
        }
        if (application.userId !== userId) {
            throw new common_1.ForbiddenException('Tidak memiliki akses.');
        }
        return application;
    }
};
exports.ApplicationService = ApplicationService;
exports.ApplicationService = ApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cloudinary_service_1.CloudinaryService])
], ApplicationService);
//# sourceMappingURL=application.service.js.map