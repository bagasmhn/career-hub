import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { Role } from '@prisma/client';

interface User {
  id: number;
  email: string;
  role: Role;
  password?: string;
}

export interface TokenResponseDto {
  message: string;
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const email = dto.email.toLowerCase().trim();

    const existingUser = await this.userService.findByEmail(email);

    if (existingUser) {
      throw new BadRequestException('Email sudah digunakan');
    }

    // Hanya boleh register sebagai JOB_SEEKER atau RECRUITER
    if (
      dto.role !== Role.JOBSEEKER &&
      dto.role !== Role.RECRUITER
    ) {
      throw new BadRequestException(
        'Role yang dipilih tidak valid.',
      );
    }

    const hashedPassword = await bcrypt.hash(dto.password.trim(), 10);

    const user = await this.userService.create({
      fullname: dto.fullname.trim(),
      email,
      password: hashedPassword,
      role: dto.role,
    });

    return {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(
      email.toLowerCase().trim(),
    );

    if (!user) {
      throw new UnauthorizedException('User tidak ditemukan');
    }

    const isMatch = await bcrypt.compare(
      password.trim(),
      user.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException('Password salah');
    }

    return user;
  }

  async login(
    email: string,
    password: string,
  ): Promise<TokenResponseDto> {
    const user = await this.validateUser(email, password);

    return this.generateToken(user);
  }

  private generateToken(user: User): TokenResponseDto {
    return {
      message: 'Berhasil login',
      access_token: this.jwtService.sign({
        sub: user.id,
        email: user.email,
        role: user.role,
      }),
    };
  }
}