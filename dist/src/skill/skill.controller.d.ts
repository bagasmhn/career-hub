import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
export declare class SkillController {
    private readonly skillService;
    constructor(skillService: SkillService);
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        name: string;
    }[]>;
    addSkill(req: any, dto: CreateSkillDto): Promise<{
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
    getMySkills(req: any): Promise<({
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
    removeSkill(req: any, skillId: number): Promise<{
        message: string;
    }>;
}
