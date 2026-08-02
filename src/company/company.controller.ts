import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiTags,
} from '@nestjs/swagger';

import {
  FileFieldsInterceptor,
} from '@nestjs/platform-express';

import { memoryStorage } from 'multer';

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

  // =====================================================
  // CREATE COMPANY
  // RECRUITER
  // =====================================================

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.RECRUITER)
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',

      properties: {
        name: {
          type: 'string',
          example: 'PT CareerHub Indonesia',
        },

        description: {
          type: 'string',
          example:
            'Perusahaan teknologi yang bergerak di bidang software development.',
        },

        email: {
          type: 'string',
          example: 'hello@careerhub.id',
        },

        phone: {
          type: 'string',
          example: '081234567890',
        },

        website: {
          type: 'string',
          example: 'https://careerhub.id',
        },

        industry: {
          type: 'string',
          example: 'Technology',
        },

        address: {
          type: 'string',
          example: 'Malang, Jawa Timur',
        },

        logo: {
          type: 'string',
          format: 'binary',
        },

        banner: {
          type: 'string',
          format: 'binary',
        },
      },

      required: [
        'name',
        'description',
      ],
    },
  })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'logo',
          maxCount: 1,
        },
        {
          name: 'banner',
          maxCount: 1,
        },
      ],
      {
        // File disimpan sementara di memory
        // sehingga tersedia sebagai file.buffer
        storage: memoryStorage(),

        limits: {
          fileSize: 5 * 1024 * 1024,
        },

        fileFilter: (
          req,
          file,
          callback,
        ) => {
          const allowedMimeTypes = [
            'image/jpeg',
            'image/png',
            'image/webp',
          ];

          if (
            !allowedMimeTypes.includes(
              file.mimetype,
            )
          ) {
            return callback(
              new BadRequestException(
                'File harus berupa JPG, PNG, atau WEBP.',
              ),
              false,
            );
          }

          callback(null, true);
        },
      },
    ),
  )
  create(
    @Req() req,
    @Body() dto: CreateCompanyDto,

    @UploadedFiles()
    files: {
      logo?: Express.Multer.File[];
      banner?: Express.Multer.File[];
    },
  ) {
    const logo =
      files?.logo?.[0];

    const banner =
      files?.banner?.[0];

    return this.companyService.create(
      req.user.id,
      dto,
      logo,
      banner,
    );
  }

  // =====================================================
  // GET ALL ACCEPTED COMPANY
  // GET /companies
  // PUBLIC
  // =====================================================

  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  // =====================================================
  // GET ALL COMPANY
  // GET /companies/admin/all
  // ADMIN / SUPERADMIN
  // =====================================================

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    Role.ADMIN,
    Role.SUPERADMIN,
  )
  @Get('admin/all')
  findAllAdmin() {
    return this.companyService.findAllAdmin();
  }

  // =====================================================
  // GET MY COMPANY
  // GET /companies/me
  // RECRUITER
  // =====================================================

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.RECRUITER)
  @Get('me')
  myCompany(@Req() req) {
    return this.companyService.myCompany(
      req.user.id,
    );
  }

  // =====================================================
  // GET PENDING COMPANY
  // GET /companies/pending
  // ADMIN / SUPERADMIN
  // =====================================================

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    Role.ADMIN,
    Role.SUPERADMIN,
  )
  @Get('pending')
  findPending() {
    return this.companyService.findPending();
  }

  // =====================================================
  // GET COMPANY BY ID
  // GET /companies/:id
  // PUBLIC
  // =====================================================

  @Get(':id')
  findOne(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,
  ) {
    return this.companyService.findOne(id);
  }

  // =====================================================
  // UPDATE COMPANY
  // PATCH /companies/:id
  // RECRUITER
  // =====================================================

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.RECRUITER)
  @Patch(':id')
  update(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,

    @Req() req,

    @Body()
    dto: UpdateCompanyDto,
  ) {
    return this.companyService.update(
      id,
      req.user.id,
      dto,
    );
  }

  // =====================================================
  // DELETE COMPANY
  // DELETE /companies/:id
  // RECRUITER
  // =====================================================

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
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
    return this.companyService.remove(
      id,
      req.user.id,
    );
  }

  // =====================================================
  // APPROVE COMPANY
  // PATCH /companies/:id/approve
  // ADMIN / SUPERADMIN
  // =====================================================

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    Role.ADMIN,
    Role.SUPERADMIN,
  )
  @Patch(':id/approve')
  approve(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,
  ) {
    return this.companyService.approve(id);
  }

  // =====================================================
  // REJECT COMPANY
  // PATCH /companies/:id/reject
  // ADMIN / SUPERADMIN
  // =====================================================

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    Role.ADMIN,
    Role.SUPERADMIN,
  )
  @Patch(':id/reject')
  reject(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,

    @Body()
    dto: RejectCompanyDto,
  ) {
    return this.companyService.reject(
      id,
      dto,
    );
  }
}