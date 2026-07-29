import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // CREATE USER
  async create(data: any) {
    return this.prisma.user.create({
      data,
    });
  }

  // FIND USER BY EMAIL
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // FIND USER BY ID
  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        fullname: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  }

  // GET USER BY ID
  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        fullname: true,
        email: true,
        role: true,
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

  // GET ALL PEMBELI
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
        createdAt: true,
      },
    });
  }

  // GET ALL ADMIN / PETUGAS
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
        createdAt: true,
      },
    });
  }

  // UPDATE USER
  async update(id: number, data: any) {
    await this.findOne(id);

    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  // DELETE USER
  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
