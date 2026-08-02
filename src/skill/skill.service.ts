import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateSkillDto } from './dto/create-skill.dto';

@Injectable()
export class SkillService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // ==========================================
  // GET ALL SKILL
  // ==========================================

  async findAll() {
    return this.prisma.skill.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  // ==========================================
  // ADD SKILL TO MY PROFILE
  // ==========================================

  async addSkill(
    userId: number,
    dto: CreateSkillDto,
  ) {
    // Cari atau buat skill
    let skill = await this.prisma.skill.findUnique({
      where: {
        name: dto.skill,
      },
    });

    if (!skill) {
      skill = await this.prisma.skill.create({
        data: {
          name: dto.skill,
        },
      });
    }

    // Cek apakah user sudah memiliki skill
    const existingUserSkill =
      await this.prisma.userSkill.findUnique({
        where: {
          userId_skillId: {
            userId,
            skillId: skill.id,
          },
        },
      });

    if (existingUserSkill) {
      throw new BadRequestException(
        'Kamu sudah memiliki skill ini.',
      );
    }

    // Hubungkan skill dengan user yang sedang login
    const userSkill =
      await this.prisma.userSkill.create({
        data: {
          userId,
          skillId: skill.id,
        },

        include: {
          skill: true,
        },
      });

    return {
      message: 'Skill berhasil ditambahkan.',
      data: userSkill,
    };
  }

  // ==========================================
  // GET MY SKILLS
  // ==========================================

  async getMySkills(userId: number) {
    return this.prisma.userSkill.findMany({
      where: {
        userId,
      },

      include: {
        skill: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // ==========================================
  // DELETE MY SKILL
  // ==========================================

  async removeSkill(
    userId: number,
    skillId: number,
  ) {
    const userSkill =
      await this.prisma.userSkill.findUnique({
        where: {
          userId_skillId: {
            userId,
            skillId,
          },
        },
      });

    if (!userSkill) {
      throw new NotFoundException(
        'Skill tidak ditemukan di profile kamu.',
      );
    }

    await this.prisma.userSkill.delete({
      where: {
        userId_skillId: {
          userId,
          skillId,
        },
      },
    });

    return {
      message: 'Skill berhasil dihapus.',
    };
  }
}