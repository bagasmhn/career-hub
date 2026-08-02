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
let ApplicationService = class ApplicationService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
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
            throw new common_1.NotFoundException('Application tidak ditemukan.');
        }
        if (application.job.company.userId !==
            userId) {
            throw new common_1.ForbiddenException('Kamu tidak memiliki akses ke application ini.');
        }
        return application;
    }
    async accept(id, userId) {
        const application = await this.findOneForRecruiter(id, userId);
        if (application.status !==
            client_1.StatusApplication.PENDING) {
            throw new common_1.BadRequestException('Application sudah diproses.');
        }
        if (application.job.status !==
            client_1.StatusJob.OPEN) {
            throw new common_1.BadRequestException('Job sudah ditutup.');
        }
        const updatedApplication = await this.prisma.application.update({
            where: {
                id,
            },
            data: {
                status: client_1.StatusApplication.ACCEPTED,
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
            message: 'Application berhasil diterima.',
            data: updatedApplication,
        };
    }
    async reject(id, userId) {
        const application = await this.findOneForRecruiter(id, userId);
        if (application.status !==
            client_1.StatusApplication.PENDING) {
            throw new common_1.BadRequestException('Application sudah diproses.');
        }
        const updatedApplication = await this.prisma.application.update({
            where: {
                id,
            },
            data: {
                status: client_1.StatusApplication.REJECTED,
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
            message: 'Application berhasil ditolak.',
            data: updatedApplication,
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
    async findMyApplication(id, userId) {
        const application = await this.prisma.application.findUnique({
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
            throw new common_1.NotFoundException('Application tidak ditemukan.');
        }
        if (application.userId !== userId) {
            throw new common_1.ForbiddenException('Kamu tidak memiliki application ini.');
        }
        return application;
    }
};
exports.ApplicationService = ApplicationService;
exports.ApplicationService = ApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApplicationService);
//# sourceMappingURL=application.service.js.map