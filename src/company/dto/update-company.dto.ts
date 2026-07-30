import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create.dto';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}