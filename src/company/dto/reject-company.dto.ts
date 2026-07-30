import { IsNotEmpty, IsString } from 'class-validator';

export class RejectCompanyDto {
  @IsString()
  @IsNotEmpty()
  reason!: string;
}