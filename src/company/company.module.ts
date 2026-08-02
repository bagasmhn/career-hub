import { Module } from '@nestjs/common';

import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    CloudinaryModule,
  ],
  controllers: [
    CompanyController,
  ],
  providers: [
    CompanyService,
    PrismaService,
  ],
})
export class CompanyModule {}