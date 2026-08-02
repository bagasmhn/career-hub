import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  // =====================================================
  // UPLOAD IMAGE
  // Untuk logo, banner, dan gambar lainnya
  // =====================================================

  async uploadImage(
    file: Express.Multer.File,
    folder: string,
  ) {
    return new Promise<any>((resolve, reject) => {
      const uploadStream =
        cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: 'image',
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        );

      uploadStream.end(file.buffer);
    });
  }

  // =====================================================
  // UPLOAD FILE
  // Untuk CV PDF, DOC, DOCX
  // =====================================================

  async uploadFile(
    file: Express.Multer.File,
    folder: string,
  ) {
    return new Promise<any>((resolve, reject) => {
      const uploadStream =
        cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: 'raw',
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        );

      uploadStream.end(file.buffer);
    });
  }
}