import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';

import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@ApiTags('Skills')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('skills')
export class SkillController {
  constructor(
    private readonly skillService: SkillService,
  ) {}

  // ==========================================
  // GET ALL SKILLS
  // ==========================================

  @Get()
  findAll() {
    return this.skillService.findAll();
  }

  // ==========================================
  // ADD SKILL TO MY PROFILE
  // ==========================================

  @Post('me')
  addSkill(
    @Req() req,
    @Body() dto: CreateSkillDto,
  ) {
    return this.skillService.addSkill(
      req.user.id,
      dto,
    );
  }

  // ==========================================
  // GET MY SKILLS
  // ==========================================

  @Get('me')
  getMySkills(@Req() req) {
    return this.skillService.getMySkills(
      req.user.id,
    );
  }

  // ==========================================
  // DELETE MY SKILL
  // ==========================================

  @Delete('me/:skillId')
  removeSkill(
    @Req() req,
    @Param(
      'skillId',
      ParseIntPipe,
    )
    skillId: number,
  ) {
    return this.skillService.removeSkill(
      req.user.id,
      skillId,
    );
  }
}