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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const cloudinary_service_1 = require("src/cloudinary/cloudinary.service");
let CompanyService = class CompanyService {
    prisma;
    cloudinaryService;
    constructor(prisma, cloudinaryService) {
        this.prisma = prisma;
        this.cloudinaryService = cloudinaryService;
    }
    async create(userId, dto, logo, banner) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.role !== client_1.Role.RECRUITER) {
            throw new common_1.ForbiddenException('Only recruiter can create company.');
        }
        const existingCompany = await this.prisma.company.findUnique({
            where: {
                userId,
            },
        });
        if (existingCompany) {
            throw new common_1.BadRequestException('Kamu telah mempunyai sebuah perusahaan.');
        }
        let logoUrl;
        if (logo) {
            const result = await this.cloudinaryService.uploadImage(logo, 'careerhub/companies/logo');
            logoUrl = result.secure_url;
        }
        let bannerUrl;
        if (banner) {
            const result = await this.cloudinaryService.uploadImage(banner, 'careerhub/companies/banner');
            bannerUrl = result.secure_url;
        }
        const company = await this.prisma.company.create({
            data: {
                ...dto,
                userId,
                logo: logoUrl,
                banner: bannerUrl,
                status: client_1.StatusRequest.PENDING,
                rejectionReason: null,
            },
        });
        return {
            message: 'Company berhasil dibuat dan sedang menunggu persetujuan admin.',
            data: company,
        };
    }
    async findAll() {
        return this.prisma.company.findMany({
            where: {
                status: client_1.StatusRequest.ACCEPTED,
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
    async findPending() {
        return this.prisma.company.findMany({
            where: {
                status: client_1.StatusRequest.PENDING,
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
    async approve(id) {
        const company = await this.findOne(id);
        if (company.status !==
            client_1.StatusRequest.PENDING) {
            throw new common_1.BadRequestException('Company is not pending.');
        }
        const updatedCompany = await this.prisma.company.update({
            where: {
                id,
            },
            data: {
                status: client_1.StatusRequest.ACCEPTED,
                rejectionReason: null,
            },
        });
        return {
            message: 'Company berhasil disetujui.',
            data: updatedCompany,
        };
    }
    async reject(id, dto) {
        const company = await this.findOne(id);
        if (company.status !==
            client_1.StatusRequest.PENDING) {
            throw new common_1.BadRequestException('Company is not pending.');
        }
        const updatedCompany = await this.prisma.company.update({
            where: {
                id,
            },
            data: {
                status: client_1.StatusRequest.REJECTED,
                rejectionReason: dto.reason,
            },
        });
        return {
            message: 'Company berhasil ditolak.',
            data: updatedCompany,
        };
    }
    async findOne(id) {
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
            throw new common_1.NotFoundException('Company not found');
        }
        return company;
    }
    async myCompany(userId) {
        const company = await this.prisma.company.findUnique({
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
            throw new common_1.NotFoundException('Company not found');
        }
        return company;
    }
    async update(id, userId, dto) {
        const company = await this.findOne(id);
        if (company.userId !== userId) {
            throw new common_1.ForbiddenException('You cannot update this company.');
        }
        const updatedCompany = await this.prisma.company.update({
            where: {
                id,
            },
            data: {
                ...dto,
            },
        });
        return {
            message: 'Company berhasil diperbarui.',
            data: updatedCompany,
        };
    }
    async remove(id, userId) {
        const company = await this.findOne(id);
        if (company.userId !== userId) {
            throw new common_1.ForbiddenException('You cannot delete this company.');
        }
        await this.prisma.company.delete({
            where: {
                id,
            },
        });
        return {
            message: 'Company berhasil dihapus.',
        };
    }
};
exports.CompanyService = CompanyService;
exports.CompanyService = CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cloudinary_service_1.CloudinaryService])
], CompanyService);
//# sourceMappingURL=company.service.js.map