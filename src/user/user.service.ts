import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class UserService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}


  // =====================================================
  // CREATE USER
  // =====================================================

  async create(data: any) {

    return this.prisma.user.create({
      data,
    });

  }


  // =====================================================
  // FIND USER BY EMAIL
  // =====================================================

  async findByEmail(email: string) {

    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });

  }


  // =====================================================
  // FIND USER BY ID
  // =====================================================

  async findById(id: number) {

    return this.prisma.user.findUnique({

      where: {
        id,
      },

      select: {

        id: true,

        fullname: true,

        email: true,

        role: true,

        profilePhoto: true,

        banner: true,

        skills: {
          include: {
            skill: true,
          },
        },

        createdAt: true,

      },

    });

  }


  // =====================================================
  // GET USER BY ID
  // SUPERADMIN
  // =====================================================

  async findOne(id: number) {

    const user =
      await this.prisma.user.findUnique({

        where: {
          id,
        },

        select: {

          id: true,

          fullname: true,

          email: true,

          role: true,

          profilePhoto: true,

          banner: true,

          skills: {
            include: {
              skill: true,
            },
          },

          createdAt: true,

        },

      });


    if (!user) {

      throw new NotFoundException(
        'User tidak ditemukan',
      );

    }


    return user;

  }


  // =====================================================
  // GET ALL USER
  // =====================================================

  async findAll() {

    return this.prisma.user.findMany({

      where: {
        role: 'JOBSEEKER',
      },

      select: {

        id: true,

        fullname: true,

        email: true,

        role: true,

        profilePhoto: true,

        banner: true,

        skills: {
          include: {
            skill: true,
          },
        },

        createdAt: true,

      },

    });

  }


  // =====================================================
  // GET ALL ADMIN
  // =====================================================

  async findAllAdmin() {

    return this.prisma.user.findMany({

      where: {
        role: 'ADMIN',
      },

      select: {

        id: true,

        fullname: true,

        email: true,

        role: true,

        profilePhoto: true,

        banner: true,

        createdAt: true,

      },

    });

  }


  // =====================================================
  // UPDATE USER
  // SUPERADMIN
  // =====================================================

  async update(
    id: number,
    data: any,
  ) {

    await this.findOne(id);

    return this.prisma.user.update({

      where: {
        id,
      },

      data,

      select: {

        id: true,

        fullname: true,

        email: true,

        role: true,

        profilePhoto: true,

        banner: true,

        createdAt: true,

        updatedAt: true,

      },

    });

  }


  // =====================================================
  // UPDATE MY PROFILE
  //
  // User sendiri bisa:
  // - ganti nama
  // - upload foto profile
  // - upload banner
  // =====================================================

  async updateMyProfile(

    userId: number,

    fullname?: string,

    profilePhoto?: Express.Multer.File,

    banner?: Express.Multer.File,

  ) {

    const user =
      await this.prisma.user.findUnique({

        where: {
          id: userId,
        },

      });


    if (!user) {

      throw new NotFoundException(
        'User tidak ditemukan',
      );

    }


    // ===================================================
    // VALIDASI
    // ===================================================

    if (
      fullname !== undefined &&
      fullname.trim().length < 2
    ) {

      throw new BadRequestException(
        'Nama minimal 2 karakter.',
      );

    }


    // ===================================================
    // DATA YANG AKAN DIUPDATE
    // ===================================================

    const updateData: any = {};


    if (fullname !== undefined) {

      updateData.fullname =
        fullname.trim();

    }


    // ===================================================
    // UPLOAD PROFILE PHOTO
    // ===================================================

    if (profilePhoto) {

      const uploadedProfile =
        await this.cloudinaryService.uploadImage(

          profilePhoto,

          'careerhub/profile',

        );


      updateData.profilePhoto =
        uploadedProfile.secure_url;

    }


    // ===================================================
    // UPLOAD BANNER
    // ===================================================

    if (banner) {

      const uploadedBanner =
        await this.cloudinaryService.uploadImage(

          banner,

          'careerhub/banner',

        );


      updateData.banner =
        uploadedBanner.secure_url;

    }


    // ===================================================
    // JIKA TIDAK ADA DATA
    // ===================================================

    if (
      Object.keys(updateData).length === 0
    ) {

      throw new BadRequestException(
        'Tidak ada data yang ingin diubah.',
      );

    }


    // ===================================================
    // UPDATE DATABASE
    // ===================================================

    const updatedUser =
      await this.prisma.user.update({

        where: {
          id: userId,
        },

        data: updateData,

        select: {

          id: true,

          fullname: true,

          email: true,

          role: true,

          profilePhoto: true,

          banner: true,

          skills: {

            include: {

              skill: true,

            },

          },

          createdAt: true,

          updatedAt: true,

        },

      });


    return {

      message:
        'Profile berhasil diperbarui.',

      data:
        updatedUser,

    };

  }


  // =====================================================
  // DELETE USER
  // =====================================================

  async remove(id: number) {

    await this.findOne(id);

    return this.prisma.user.delete({

      where: {
        id,
      },

    });

  }

}