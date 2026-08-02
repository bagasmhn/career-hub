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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const client_1 = require("@prisma/client");
const application_service_1 = require("./application.service");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
const roles_guard_1 = require("../auth/guard/roles.guard");
const roles_decorators_1 = require("../auth/decorators/roles.decorators");
let ApplicationController = class ApplicationController {
    applicationService;
    constructor(applicationService) {
        this.applicationService = applicationService;
    }
    applyJob(jobId, cv, req) {
        return this.applicationService.applyJob(req.user.id, jobId, cv);
    }
    findRecruiterApplications(req) {
        return this.applicationService.findRecruiterApplications(req.user.id);
    }
    findOneForRecruiter(id, req) {
        return this.applicationService.findOneForRecruiter(id, req.user.id);
    }
    accept(id, req) {
        return this.applicationService.accept(id, req.user.id);
    }
    reject(id, req) {
        return this.applicationService.reject(id, req.user.id);
    }
    findMyApplications(req) {
        return this.applicationService.findMyApplications(req.user.id);
    }
    findMyApplication(id, req) {
        return this.applicationService.findMyApplication(id, req.user.id);
    }
};
exports.ApplicationController = ApplicationController;
__decorate([
    (0, common_1.Post)(':jobId'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                cv: {
                    type: 'string',
                    format: 'binary',
                },
            },
            required: [
                'cv'
            ],
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('cv')),
    __param(0, (0, common_1.Param)('jobId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "applyJob", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)(client_1.Role.RECRUITER),
    (0, common_1.Get)('recruiter'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "findRecruiterApplications", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)(client_1.Role.RECRUITER),
    (0, common_1.Get)('recruiter/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "findOneForRecruiter", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)(client_1.Role.RECRUITER),
    (0, common_1.Patch)(':id/accept'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "accept", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)(client_1.Role.RECRUITER),
    (0, common_1.Patch)(':id/reject'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "reject", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)(client_1.Role.JOBSEEKER),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "findMyApplications", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)(client_1.Role.JOBSEEKER),
    (0, common_1.Get)('me/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "findMyApplication", null);
exports.ApplicationController = ApplicationController = __decorate([
    (0, swagger_1.ApiTags)('Applications'),
    (0, common_1.Controller)('applications'),
    __metadata("design:paramtypes", [application_service_1.ApplicationService])
], ApplicationController);
//# sourceMappingURL=application.controller.js.map