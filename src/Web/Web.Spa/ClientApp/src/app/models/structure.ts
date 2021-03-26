import { Department } from '../models/department';
export class Structure {

    public id: string;

    public bossPosition: string;

    public departments: Department[];

    public heads: string[];
}
