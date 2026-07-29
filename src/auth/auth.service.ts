import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { Role } from '@prisma/client'; // ✅ import enum

interface User {
  id: number; 
  email: string;
  role?: string;
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

  // ✅ REGISTER
  async register(dto: RegisterDto) {
    const email = dto.email.toLowerCase().trim();

    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email sudah digunakan');
    }

    const hashedPassword = await bcrypt.hash(dto.password.trim(), 10);

    const user = await this.userService.create({
      fullname: dto.fullname,
      email,
      password: hashedPassword,
      role: Role.JOBSEEKER, // ✅ pakai enum
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

  // ✅ VALIDATE USER
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(
      email.toLowerCase().trim(),
    );

    if (!user) {
      throw new UnauthorizedException('User tidak ditemukan');
    }

    if (!user.password) {
      throw new UnauthorizedException('Password tidak tersedia');
    }

    const isMatch = await bcrypt.compare(password.trim(), user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Password salah');
    }

    return user as User;
  }

  async login(email: string, password: string): Promise<TokenResponseDto> {
    const user = await this.validateUser(email, password);
    return this.generateToken(user);
  }


  // ✅ GENERATE TOKEN
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