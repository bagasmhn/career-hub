import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { Role } from '@prisma/client';
interface User {
    id: number;
    email: string;
    role: Role;
    password?: string;
}
export interface TokenResponseDto {
    message: string;
    access_token: string;
}
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        id: number;
        fullname: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    validateUser(email: string, password: string): Promise<User>;
    login(email: string, password: string): Promise<TokenResponseDto>;
    private generateToken;
}
export {};
