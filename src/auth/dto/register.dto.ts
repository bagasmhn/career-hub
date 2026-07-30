import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '@prisma/client';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  fullname!: string;

  @IsEmail()
  email!: string;

  @MinLength(8)
  password!: string;

  @IsEnum(Role)
  role!: Role;
}