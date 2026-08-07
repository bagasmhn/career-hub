import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
export declare class SkillController {
    private readonly skillService;
    constructor(skillService: SkillService);
    findAll(): Promise<{
        createdAt: Date;
        id: number;
        name: string;
    }[]>;
    addSkill(req: any, dto: CreateSkillDto): Promise<{
        message: string;
        data: {
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
        };
    }>;
    getMySkills(req: any): Promise<({
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
    })[]>;
    removeSkill(req: any, skillId: number): Promise<{
        message: string;
    }>;
}
