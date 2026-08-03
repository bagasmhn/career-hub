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
exports.JobService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let JobService = class JobService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        const company = await this.prisma.company.findUnique({
            where: {
                userId,
            },
        });
        if (!company) {
            throw new common_1.NotFoundException('Kamu belum memiliki company.');
        }
        if (company.status !==
            client_1.StatusRequest.ACCEPTED) {
            throw new common_1.ForbiddenException('Company kamu belum disetujui admin.');
        }
        const job = await this.prisma.job.create({
            data: {
                companyId: company.id,
                title: dto.title,
                description: dto.description,
                location: dto.location,
                salary: dto.salary,
                status: client_1.StatusJob.OPEN,
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
            message: 'Job telah berhasil ditambahkan.',
            data: job,
        };
    }
    async findAll() {
        return this.prisma.job.findMany({
            where: {
                status: client_1.StatusJob.OPEN,
                company: {
                    status: client_1.StatusRequest.ACCEPTED,
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
    async findOne(id) {
        const job = await this.prisma.job.findUnique({
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
            throw new common_1.NotFoundException('Job not found.');
        }
        return job;
    }
    async findMyJobs(userId) {
        const company = await this.prisma.company.findUnique({
            where: {
                userId,
            },
        });
        if (!company) {
            throw new common_1.NotFoundException('Kamu belum memiliki company.');
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
    async update(id, userId, dto) {
        const job = await this.prisma.job.findUnique({
            where: {
                id,
            },
            include: {
                company: true,
            },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found.');
        }
        if (job.company.userId !== userId) {
            throw new common_1.ForbiddenException('Kamu tidak memiliki job ini.');
        }
        const updatedJob = await this.prisma.job.update({
            where: {
                id,
            },
            data: dto,
        });
        return {
            message: 'Job berhasil diperbarui.',
            data: updatedJob,
        };
    }
    async remove(id, userId) {
        const job = await this.prisma.job.findUnique({
            where: {
                id,
            },
            include: {
                company: true,
            },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found.');
        }
        if (job.company.userId !== userId) {
            throw new common_1.ForbiddenException('Kamu tidak memiliki job ini.');
        }
        await this.prisma.job.delete({
            where: {
                id,
            },
        });
        return {
            message: 'Job berhasil dihapus.',
        };
    }
    async close(id, userId) {
        const job = await this.prisma.job.findUnique({
            where: {
                id,
            },
            include: {
                company: true,
            },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found.');
        }
        if (job.company.userId !== userId) {
            throw new common_1.ForbiddenException('Kamu tidak memiliki job ini.');
        }
        if (job.status === client_1.StatusJob.CLOSED) {
            throw new common_1.BadRequestException('Job ini sudah ditutup.');
        }
        const closedJob = await this.prisma.job.update({
            where: {
                id,
            },
            data: {
                status: client_1.StatusJob.CLOSED,
            },
        });
        return {
            message: 'Job berhasil ditutup.',
            data: closedJob,
        };
    }
};
exports.JobService = JobService;
exports.JobService = JobService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], JobService);
//# sourceMappingURL=job.service.js.map