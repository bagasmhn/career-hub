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
exports.SkillController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const skill_service_1 = require("./skill.service");
const create_skill_dto_1 = require("./dto/create-skill.dto");
const jwt_auth_guard_1 = require("src/auth/guard/jwt-auth.guard");
let SkillController = class SkillController {
    skillService;
    constructor(skillService) {
        this.skillService = skillService;
    }
    findAll() {
        return this.skillService.findAll();
    }
    addSkill(req, dto) {
        return this.skillService.addSkill(req.user.id, dto);
    }
    getMySkills(req) {
        return this.skillService.getMySkills(req.user.id);
    }
    removeSkill(req, skillId) {
        return this.skillService.removeSkill(req.user.id, skillId);
    }
};
exports.SkillController = SkillController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SkillController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('me'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_skill_dto_1.CreateSkillDto]),
    __metadata("design:returntype", void 0)
], SkillController.prototype, "addSkill", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SkillController.prototype, "getMySkills", null);
__decorate([
    (0, common_1.Delete)('me/:skillId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('skillId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], SkillController.prototype, "removeSkill", null);
exports.SkillController = SkillController = __decorate([
    (0, swagger_1.ApiTags)('Skills'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('skills'),
    __metadata("design:paramtypes", [skill_service_1.SkillService])
], SkillController);
//# sourceMappingURL=skill.controller.js.map