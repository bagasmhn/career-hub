import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiConsumes,
  ApiTags,
} from '@nestjs/swagger';

import {
  FileInterceptor,
} from '@nestjs/platform-express';


import { Role } from '@prisma/client';

import { ApplicationService } from './application.service';

import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorators';



@ApiTags('Applications')
@Controller('applications')
export class ApplicationController {


constructor(
 private readonly applicationService: ApplicationService,
) {}



// =====================================================
// JOBSEEKER
// APPLY JOB + UPLOAD CV
// =====================================================


@ApiBearerAuth()

@UseGuards(
 JwtAuthGuard,
 RolesGuard,
)

@Roles(Role.JOBSEEKER)

@Post(':jobId')

@ApiConsumes(
'multipart/form-data'
)

@UseInterceptors(

FileInterceptor(

'cv',

{

limits:{

fileSize:
5 * 1024 * 1024,

},


fileFilter:

(req,file,callback)=>{


const allowed=[

'application/pdf',

'application/msword',

'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

];


if(
!allowed.includes(file.mimetype)
){

return callback(

new BadRequestException(
'CV harus PDF, DOC, atau DOCX'
),

false

);

}


callback(null,true);


},

}

)

)


applyJob(

@Param(
'jobId',
ParseIntPipe,
)
jobId:number,


@Req() req,


@UploadedFile()
cv:Express.Multer.File,

){

return this.applicationService.applyJob(

req.user.id,

jobId,

cv,

);

}






// =====================================================
// RECRUITER
// GET ALL APPLICATION
// =====================================================


@ApiBearerAuth()

@UseGuards(
JwtAuthGuard,
RolesGuard,
)

@Roles(Role.RECRUITER)

@Get('recruiter')

findRecruiterApplications(
@Req() req,
){

return this.applicationService.findRecruiterApplications(
req.user.id,
);

}







// =====================================================
// RECRUITER
// GET APPLICATION BY ID
// =====================================================


@ApiBearerAuth()

@UseGuards(
JwtAuthGuard,
RolesGuard,
)

@Roles(Role.RECRUITER)

@Get('recruiter/:id')

findOneForRecruiter(

@Param(
'id',
ParseIntPipe,
)
id:number,


@Req() req,

){

return this.applicationService.findOneForRecruiter(

id,

req.user.id,

);

}






// =====================================================
// RECRUITER ACCEPT
// =====================================================


@ApiBearerAuth()

@UseGuards(
JwtAuthGuard,
RolesGuard,
)

@Roles(Role.RECRUITER)

@Patch(':id/accept')

accept(

@Param(
'id',
ParseIntPipe,
)
id:number,


@Req() req,

){

return this.applicationService.accept(

id,

req.user.id,

);

}







// =====================================================
// RECRUITER REJECT
// =====================================================


@ApiBearerAuth()

@UseGuards(
JwtAuthGuard,
RolesGuard,
)

@Roles(Role.RECRUITER)

@Patch(':id/reject')

reject(

@Param(
'id',
ParseIntPipe,
)
id:number,


@Req() req,

){

return this.applicationService.reject(

id,

req.user.id,

);

}








// =====================================================
// JOBSEEKER
// GET MY APPLICATION
// =====================================================


@ApiBearerAuth()

@UseGuards(
JwtAuthGuard,
RolesGuard,
)

@Roles(Role.JOBSEEKER)

@Get('me')

findMyApplications(
@Req() req,
){

return this.applicationService.findMyApplications(

req.user.id,

);

}







// =====================================================
// JOBSEEKER
// GET MY APPLICATION DETAIL
// =====================================================


@ApiBearerAuth()

@UseGuards(
JwtAuthGuard,
RolesGuard,
)

@Roles(Role.JOBSEEKER)

@Get('me/:id')

findMyApplication(

@Param(
'id',
ParseIntPipe,
)
id:number,


@Req() req,

){

return this.applicationService.findMyApplication(

id,

req.user.id,

);

}



}