import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';

import { Role } from '@prisma/client';

import { ApplicationService } from './application.service';

import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorators';

@ApiTags('Applications')
@Controller('applications')
export class ApplicationController {
  constructor(
    private readonly applicationService: ApplicationService,
  ) {}

  // =====================================================
  // RECRUITER
  // GET ALL APPLICATION
  // =====================================================

  @ApiBearerAuth()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(Role.RECRUITER)
  @Get('recruiter')
  findRecruiterApplications(
    @Req() req,
  ) {
    return this.applicationService.findRecruiterApplications(
      req.user.id,
    );
  }

  // =====================================================
  // RECRUITER
  // GET APPLICATION BY ID
  // =====================================================

  @ApiBearerAuth()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(Role.RECRUITER)
  @Get('recruiter/:id')
  findOneForRecruiter(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,

    @Req() req,
  ) {
    return this.applicationService.findOneForRecruiter(
      id,
      req.user.id,
    );
  }

  // =====================================================
  // RECRUITER
  // ACCEPT APPLICATION
  // =====================================================

  @ApiBearerAuth()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(Role.RECRUITER)
  @Patch(':id/accept')
  accept(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,

    @Req() req,
  ) {
    return this.applicationService.accept(
      id,
      req.user.id,
    );
  }

  // =====================================================
  // RECRUITER
  // REJECT APPLICATION
  // =====================================================

  @ApiBearerAuth()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(Role.RECRUITER)
  @Patch(':id/reject')
  reject(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,

    @Req() req,
  ) {
    return this.applicationService.reject(
      id,
      req.user.id,
    );
  }

  // =====================================================
  // JOBSEEKER
  // GET MY APPLICATIONS
  // =====================================================

  @ApiBearerAuth()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(Role.JOBSEEKER)
  @Get('me')
  findMyApplications(
    @Req() req,
  ) {
    return this.applicationService.findMyApplications(
      req.user.id,
    );
  }

  // =====================================================
  // JOBSEEKER
  // GET MY APPLICATION BY ID
  // =====================================================

  @ApiBearerAuth()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(Role.JOBSEEKER)
  @Get('me/:id')
  findMyApplication(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,

    @Req() req,
  ) {
    return this.applicationService.findMyApplication(
      id,
      req.user.id,
    );
  }
}