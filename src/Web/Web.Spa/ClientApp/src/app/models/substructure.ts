import { Department } from './department';

export class Substructure {
    public id: string;
    public number: number;
    public bossPosition: string;
    public bossName: string;
    public structureId: string;
    public departments: Department[];
}