import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiTags,
} from '@nestjs/swagger';

import { FileInterceptor } from '@nestjs/platform-express';

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
  // APPLY JOB
  // POST /api/applications/:jobId
  // JOBSEEKER
  // =====================================================

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.JOBSEEKER)
  @Post(':jobId')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',

      properties: {
        cv: {
          type: 'string',
          format: 'binary',
          description:
            'CV dalam format PDF, DOC, atau DOCX',
        },
      },

      required: ['cv'],
    },
  })
  @UseInterceptors(
    FileInterceptor('cv', {
      limits: {
        fileSize: 5 * 1024 * 1024,
      },

      fileFilter: (
        req,
        file,
        callback,
      ) => {
        const allowedMimeTypes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];

        if (
          !allowedMimeTypes.includes(
            file.mimetype,
          )
        ) {
          return callback(
            new BadRequestException(
              'CV harus berupa PDF, DOC, atau DOCX.',
            ),
            false,
          );
        }

        callback(null, true);
      },
    }),
  )
  apply(
    @Req() req,

    @Param(
      'jobId',
      ParseIntPipe,
    )
    jobId: number,

    @UploadedFile()
    cv: Express.Multer.File,
  ) {
    return this.applicationService.apply(
      req.user.id,
      jobId,
      cv,
    );
  }

  // =====================================================
  // GET MY APPLICATIONS
  // GET /api/applications/me
  // JOBSEEKER
  // =====================================================

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
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
  // GET APPLICANTS BY JOB
  // GET /api/applications/job/:jobId
  // RECRUITER
  // =====================================================

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.RECRUITER)
  @Get('job/:jobId')
  findByJob(
    @Param(
      'jobId',
      ParseIntPipe,
    )
    jobId: number,

    @Req() req,
  ) {
    return this.applicationService.findByJob(
      jobId,
      req.user.id,
    );
  }

  // =====================================================
  // GET APPLICATION BY ID
  // GET /api/applications/:id
  // =====================================================

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,

    @Req() req,
  ) {
    return this.applicationService.findOne(
      id,
      req.user.id,
    );
  }
}