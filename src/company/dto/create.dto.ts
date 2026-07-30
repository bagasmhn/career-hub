import {
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsString()
  industry?: string;

  @IsOptional()
  @IsString()
  address?: string;
}