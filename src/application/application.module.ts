import { Module } from '@nestjs/common';

import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';

import { PrismaModule } from '../prisma/prisma.module';

import { CloudinaryModule } from '../cloudinary/cloudinary.module';


@Module({

imports:[
 PrismaModule,
 CloudinaryModule
],


controllers:[
 ApplicationController
],


providers:[
 ApplicationService
],


exports:[
 ApplicationService
]


})
export class ApplicationModule {}