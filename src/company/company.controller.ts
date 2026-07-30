import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';

import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { RejectCompanyDto } from './dto/reject-company.dto';

import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorators';

@ApiTags('Companies')
@Controller('companies')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
  ) {}

  // =========================
  // CREATE COMPANY
  // =========================
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.RECRUITER)
  @Post()
  create(
    @Req() req,
    @Body() dto: CreateCompanyDto,
  ) {
    return this.companyService.create(
      req.user.id,
      dto,
    );
  }

  // =========================
  // GET ALL COMPANY (PUBLIC)
  // =========================
  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  // =========================
  // GET MY COMPANY
  // =========================
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.RECRUITER)
  @Get('me')
  myCompany(@Req() req) {
    return this.companyService.myCompany(req.user.id);
  }

  // =========================
  // GET PENDING COMPANY
  // =========================
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Get('pending')
  findPending() {
    return this.companyService.findPending();
  }

  // =========================
  // GET COMPANY BY ID
  // =========================
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.companyService.findOne(id);
  }

  // =========================
  // UPDATE COMPANY
  // =========================
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.RECRUITER)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
    @Body() dto: UpdateCompanyDto,
  ) {
    return this.companyService.update(
      id,
      req.user.id,
      dto,
    );
  }

  // =========================
  // DELETE COMPANY
  // =========================
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.RECRUITER)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
  ) {
    return this.companyService.remove(
      id,
      req.user.id,
    );
  }

  // =========================
  // APPROVE COMPANY
  // =========================
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Patch(':id/approve')
  approve(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.companyService.approve(id);
  }

  // =========================
  // REJECT COMPANY
  // =========================
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Patch(':id/reject')
  reject(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: RejectCompanyDto,
  ) {
    return this.companyService.reject(id, dto);
  }
}