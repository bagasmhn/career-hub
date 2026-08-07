import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<{
        email: string;
        createdAt: Date;
        id: number;
        banner: string | null;
        fullname: string;
        profilePhoto: string | null;
        role: import(".prisma/client").$Enums.Role;
        skills: ({
            skill: {
                createdAt: Date;
                id: number;
                name: string;
            };
        } & {
            createdAt: Date;
            id: number;
            userId: number;
            skillId: number;
        })[];
    }[]>;
    findAllAdmin(): Promise<{
        email: string;
        createdAt: Date;
        id: number;
        banner: string | null;
        fullname: string;
        profilePhoto: string | null;
        role: import(".prisma/client").$Enums.Role;
    }[]>;
    findOne(id: number): Promise<{
        email: string;
        createdAt: Date;
        id: number;
        banner: string | null;
        fullname: string;
        profilePhoto: string | null;
        role: import(".prisma/client").$Enums.Role;
        skills: ({
            skill: {
                createdAt: Date;
                id: number;
                name: string;
            };
        } & {
            createdAt: Date;
            id: number;
            userId: number;
            skillId: number;
        })[];
    }>;
    updateMyProfile(req: any, body: {
        fullname?: string;
    }, files: {
        profilePhoto?: Express.Multer.File[];
        banner?: Express.Multer.File[];
    }): Promise<{
        message: string;
        data: {
            email: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            banner: string | null;
            fullname: string;
            profilePhoto: string | null;
            role: import(".prisma/client").$Enums.Role;
            skills: ({
                skill: {
                    createdAt: Date;
                    id: number;
                    name: string;
                };
            } & {
                createdAt: Date;
                id: number;
                userId: number;
                skillId: number;
            })[];
        };
    }>;
    update(id: number, dto: any): Promise<{
        email: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        banner: string | null;
        fullname: string;
        profilePhoto: string | null;
        role: import(".prisma/client").$Enums.Role;
    }>;
    remove(id: number): Promise<{
        password: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        banner: string | null;
        fullname: string;
        profilePhoto: string | null;
        role: import(".prisma/client").$Enums.Role;
    }>;
}
