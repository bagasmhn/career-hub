import { Role } from '@prisma/client';
export declare class RegisterDto {
    fullname: string;
    email: string;
    password: string;
    role: Role;
}
