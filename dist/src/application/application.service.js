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
    async apply(userId, jobId, cv) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User tidak ditemukan.');
        }
        if (user.role !== client_1.Role.JOBSEEKER) {
            throw new common_1.ForbiddenException('Hanya jobseeker yang dapat melamar pekerjaan.');
        }
        if (!cv) {
            throw new common_1.BadRequestException('CV wajib diupload.');
        }
        const job = await this.prisma.job.findUnique({
            where: {
                id: jobId,
            },
            include: {
                company: true,
            },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job tidak ditemukan.');
        }
        if (job.company.status !==
            client_1.StatusRequest.ACCEPTED) {
            throw new common_1.ForbiddenException('Company belum disetujui admin.');
        }
        if (job.status !== client_1.StatusJob.OPEN) {
            throw new common_1.BadRequestException('Job sudah ditutup dan tidak dapat dilamar.');
        }
        const existingApplication = await this.prisma.application.findUnique({
            where: {
                userId_jobId: {
                    userId,
                    jobId,
                },
            },
        });
        if (existingApplication) {
            throw new common_1.BadRequestException('Kamu sudah melamar pekerjaan ini.');
        }
        const result = await this.cloudinaryService.uploadFile(cv, 'careerhub/applications/cv');
        const cvUrl = result.secure_url;
        const application = await this.prisma.application.create({
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
            message: 'Lamaran berhasil dikirim.',
            data: application,
        };
    }
    async findMyApplications(userId) {
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
    async findOne(id, userId) {
        const application = await this.prisma.application.findUnique({
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
            throw new common_1.NotFoundException('Lamaran tidak ditemukan.');
        }
        if (application.userId === userId) {
            return application;
        }
        if (application.job.company.userId ===
            userId) {
            return application;
        }
        throw new common_1.ForbiddenException('Kamu tidak memiliki akses ke lamaran ini.');
    }
    async findByJob(jobId, userId) {
        const job = await this.prisma.job.findUnique({
            where: {
                id: jobId,
            },
            include: {
                company: true,
            },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job tidak ditemukan.');
        }
        if (job.company.userId !== userId) {
            throw new common_1.ForbiddenException('Kamu tidak memiliki job ini.');
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
};
exports.ApplicationService = ApplicationService;
exports.ApplicationService = ApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cloudinary_service_1.CloudinaryService])
], ApplicationService);
//# sourceMappingURL=application.service.js.map