import {
  Module,
} from '@nestjs/common';

import {
  ApplicationController,
} from './application.controller';

import {
  ApplicationService,
} from './application.service';

import {
  PrismaService,
} from '../prisma/prisma.service';

import {
  CloudinaryService,
} from '../cloudinary/cloudinary.service';

@Module({
  controllers: [
    ApplicationController,
  ],

  providers: [
    ApplicationService,
    PrismaService,
    CloudinaryService,
  ],

  exports: [
    ApplicationService,
  ],
})
export class ApplicationModule {}