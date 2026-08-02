import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import {
  StatusApplication,
  StatusJob,
  Role,
} from '@prisma/client';

import { CloudinaryService } from 'src/cloudinary/cloudinary.service';



@Injectable()
export class ApplicationService {


  constructor(

    private readonly prisma: PrismaService,

    private readonly cloudinaryService: CloudinaryService,

  ) {}





  // =====================================================
  // JOBSEEKER APPLY JOB + UPLOAD CV
  // =====================================================

  async applyJob(

    userId:number,

    jobId:number,

    file:Express.Multer.File,

  ){


    const user =
    await this.prisma.user.findUnique({

      where:{
        id:userId,
      },

    });



    if(!user){

      throw new NotFoundException(
        'User tidak ditemukan.'
      );

    }



    if(user.role !== Role.JOBSEEKER){

      throw new ForbiddenException(
        'Hanya jobseeker yang dapat melamar.'
      );

    }





    const job =
    await this.prisma.job.findUnique({

      where:{
        id:jobId,
      },

    });



    if(!job){

      throw new NotFoundException(
        'Job tidak ditemukan.'
      );

    }





    if(job.status !== StatusJob.OPEN){

      throw new BadRequestException(
        'Job sudah ditutup.'
      );

    }





    const existing =
    await this.prisma.application.findUnique({

      where:{

        userId_jobId:{

          userId,

          jobId,

        },

      },

    });





    if(existing){

      throw new BadRequestException(
        'Kamu sudah pernah melamar pekerjaan ini.'
      );

    }





    const upload =

    await this.cloudinaryService.uploadFile(

      file,

      'careerhub/cv'

    );






    const application =

    await this.prisma.application.create({

      data:{


        userId,

        jobId,


        cvUrl:
        upload.secure_url,


        status:
        StatusApplication.PENDING,


      },


      include:{


        job:{


          select:{


            id:true,

            title:true,

            location:true,


            company:{


              select:{


                id:true,

                name:true,


              },


            },


          },


        },


      },


    });






    return {


      message:
      'Lamaran berhasil dikirim.',


      data:application,


    };


  }












  // =====================================================
  // RECRUITER GET ALL APPLICATION
  // =====================================================

  async findRecruiterApplications(

    userId:number,

  ){


    return this.prisma.application.findMany({

      where:{


        job:{


          company:{


            userId,


          },


        },


      },



      include:{


        user:{


          select:{


            id:true,

            fullname:true,

            email:true,


          },


        },



        job:{


          select:{


            id:true,

            title:true,

            location:true,

            salary:true,

            status:true,



            company:{


              select:{


                id:true,

                name:true,

                logo:true,


              },


            },


          },


        },


      },



      orderBy:{


        createdAt:'desc',


      },


    });


  }









  // =====================================================
  // RECRUITER GET APPLICATION DETAIL
  // =====================================================

  async findOneForRecruiter(

    id:number,

    userId:number,

  ){



    const application =

    await this.prisma.application.findUnique({

      where:{
        id,
      },


      include:{


        user:{


          select:{


            id:true,

            fullname:true,

            email:true,


          },


        },


        job:{


          include:{


            company:true,


          },


        },


      },


    });





    if(!application){

      throw new NotFoundException(
        'Application tidak ditemukan.'
      );

    }





    if(

      application.job.company.userId !== userId

    ){

      throw new ForbiddenException(
        'Kamu tidak memiliki akses.'
      );

    }





    return application;


  }









  // =====================================================
  // RECRUITER ACCEPT
  // =====================================================

  async accept(

    id:number,

    userId:number,

  ){



    const application =

    await this.findOneForRecruiter(

      id,

      userId

    );





    if(

      application.status !==

      StatusApplication.PENDING

    ){

      throw new BadRequestException(
        'Application sudah diproses.'
      );

    }





    const updated =

    await this.prisma.application.update({

      where:{
        id,
      },


      data:{


        status:
        StatusApplication.ACCEPTED,


      },


    });





    return {


      message:
      'Lamaran diterima.',


      data:updated,


    };


  }









  // =====================================================
  // RECRUITER REJECT
  // =====================================================

  async reject(

    id:number,

    userId:number,

  ){



    const application =

    await this.findOneForRecruiter(

      id,

      userId

    );





    if(

      application.status !==

      StatusApplication.PENDING

    ){

      throw new BadRequestException(
        'Application sudah diproses.'
      );

    }





    const updated =

    await this.prisma.application.update({

      where:{
        id,
      },


      data:{


        status:
        StatusApplication.REJECTED,


      },


    });





    return {


      message:
      'Lamaran ditolak.',


      data:updated,


    };


  }









  // =====================================================
  // JOBSEEKER GET MY APPLICATION
  // =====================================================

  async findMyApplications(

    userId:number,

  ){


    return this.prisma.application.findMany({

      where:{

        userId,

      },


      include:{


        job:{


          select:{


            id:true,

            title:true,

            description:true,

            location:true,

            salary:true,

            status:true,


            company:{


              select:{


                id:true,

                name:true,

                logo:true,


              },


            },


          },


        },


      },


      orderBy:{


        createdAt:'desc',


      },


    });


  }









  // =====================================================
  // JOBSEEKER DETAIL APPLICATION
  // =====================================================

  async findMyApplication(

    id:number,

    userId:number,

  ){


    const application =

    await this.prisma.application.findUnique({

      where:{
        id,
      },


      include:{


        job:{


          include:{


            company:true,


          },


        },


      },


    });





    if(!application){

      throw new NotFoundException(
        'Application tidak ditemukan.'
      );

    }





    if(application.userId !== userId){

      throw new ForbiddenException(
        'Kamu tidak memiliki akses.'
      );

    }





    return application;


  }



}