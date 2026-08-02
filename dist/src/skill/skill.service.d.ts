import { PrismaService } from '../prisma/prisma.service';
import { CreateSkillDto } from './dto/create-skill.dto';
export declare class SkillService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        name: string;
    }[]>;
    addSkill(userId: number, dto: CreateSkillDto): Promise<{
        message: string;
        data: {
            skill: {
                id: number;
                createdAt: Date;
                name: string;
            };
        } & {
            id: number;
            createdAt: Date;
            userId: number;
            skillId: number;
        };
    }>;
    getMySkills(userId: number): Promise<({
        skill: {
            id: number;
            createdAt: Date;
            name: string;
        };
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        skillId: number;
    })[]>;
    removeSkill(userId: number, skillId: number): Promise<{
        message: string;
    }>;
}
