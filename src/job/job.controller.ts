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

import {
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';

import { Role } from '@prisma/client';

import { JobService } from './job.service';

import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorators';

@ApiTags('Jobs')
@Controller('jobs')
export class JobController {
  constructor(
    private readonly jobService: JobService,
  ) {}

  // =====================================================
  // GET ALL OPEN JOB
  // PUBLIC
  // =====================================================

  @Get()
  findAll() {
    return this.jobService.findAll();
  }

  // =====================================================
  // CREATE JOB
  // RECRUITER
  // =====================================================

  @ApiBearerAuth()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(Role.RECRUITER)
  @Post()
  create(
    @Req() req,
    @Body() dto: CreateJobDto,
  ) {
    return this.jobService.create(
      req.user.id,
      dto,
    );
  }

 // GET MY JOBS
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.RECRUITER)
@Get('me')
findMyJobs(@Req() req) {
  return this.jobService.findMyJobs(req.user.id);
}

// GET JOB BY ID
@Get(':id')
findOne(
  @Param('id', ParseIntPipe) id: number,
) {
  return this.jobService.findOne(id);
}

  // =====================================================
  // UPDATE JOB
  // RECRUITER
  // =====================================================

  @ApiBearerAuth()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(Role.RECRUITER)
  @Patch(':id')
  update(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,

    @Req() req,

    @Body() dto: UpdateJobDto,
  ) {
    return this.jobService.update(
      id,
      req.user.id,
      dto,
    );
  }

  // =====================================================
  // DELETE JOB
  // RECRUITER
  // =====================================================

  @ApiBearerAuth()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(Role.RECRUITER)
  @Delete(':id')
  remove(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,

    @Req() req,
  ) {
    return this.jobService.remove(
      id,
      req.user.id,
    );
  }
// =====================================================
// CLOSE JOB
// RECRUITER
// PATCH /api/jobs/:id/close
// =====================================================

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.RECRUITER)
@Patch(':id/close')
close(
  @Param('id', ParseIntPipe) id: number,
  @Req() req,
) {
  return this.jobService.close(
    id,
    req.user.id,
  );
}
  
}