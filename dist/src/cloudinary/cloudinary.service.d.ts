export declare class CloudinaryService {
    constructor();
    uploadImage(file: Express.Multer.File, folder: string): Promise<any>;
    uploadFile(file: Express.Multer.File, folder: string): Promise<any>;
}
