import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Put,
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

import {
  memoryStorage,
} from 'multer';

import { UserService } from './user.service';

import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorators';


@ApiTags('Users')
@ApiBearerAuth()
@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) {}


  // =====================================================
  // GET ALL USER
  // ADMIN / SUPERADMIN
  // =====================================================

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(
    'SUPERADMIN',
    'ADMIN',
  )
  @Get()
  findAll() {

    return this.userService.findAll();

  }


  // =====================================================
  // GET ALL ADMIN
  // SUPERADMIN
  // =====================================================

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles('SUPERADMIN')
  @Get('admin/all')
  findAllAdmin() {

    return this.userService.findAllAdmin();

  }


  // =====================================================
  // GET USER BY ID
  // SUPERADMIN
  // =====================================================

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles('SUPERADMIN')
  @Get(':id')
  findOne(

    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,

  ) {

    return this.userService.findOne(id);

  }


  // =====================================================
  // UPDATE MY PROFILE
  //
  // PATCH /api/user/profile
  //
  // Bisa:
  // - fullname
  // - profilePhoto
  // - banner
  // =====================================================

  @UseGuards(JwtAuthGuard)

  @Patch('profile')

  @ApiConsumes(
    'multipart/form-data',
  )

  @ApiBody({

    schema: {

      type: 'object',

      properties: {

        fullname: {

          type: 'string',

          example:
            'Bagas Mahendra',

        },

        profilePhoto: {

          type: 'string',

          format: 'binary',

        },

        banner: {

          type: 'string',

          format: 'binary',

        },

      },

    },

  })

  @UseInterceptors(

    FileFieldsInterceptor(

      [

        {
          name: 'profilePhoto',
          maxCount: 1,
        },

        {
          name: 'banner',
          maxCount: 1,
        },

      ],

      {

        storage:
          memoryStorage(),

        limits: {

          fileSize:
            5 * 1024 * 1024,

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

                'Foto harus berupa JPG, PNG, atau WEBP.',

              ),

              false,

            );

          }


          callback(
            null,
            true,
          );

        },

      },

    ),

  )

  updateMyProfile(

    @Req() req,

    @Body()
    body: {
      fullname?: string;
    },

    @UploadedFiles()

    files: {

      profilePhoto?:
        Express.Multer.File[];

      banner?:
        Express.Multer.File[];

    },

  ) {

    const profilePhoto =
      files?.profilePhoto?.[0];

    const banner =
      files?.banner?.[0];


    return this.userService.updateMyProfile(

      req.user.id,

      body.fullname,

      profilePhoto,

      banner,

    );

  }


  // =====================================================
  // UPDATE USER
  // SUPERADMIN
  // =====================================================

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles('SUPERADMIN')
  @Put(':id')
  update(

    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,

    @Body()
    dto: any,

  ) {

    return this.userService.update(
      id,
      dto,
    );

  }


  // =====================================================
  // DELETE USER
  // SUPERADMIN
  // =====================================================

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles('SUPERADMIN')
  @Delete(':id')
  remove(

    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,

  ) {

    return this.userService.remove(id);

  }

}