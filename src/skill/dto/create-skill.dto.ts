    import { IsString, MinLength } from 'class-validator';

export class CreateSkillDto {
  @IsString()
  @MinLength(2)
  skill!: string;
}