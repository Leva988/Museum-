import { Department } from '../models/department';
import { SubStructure } from '../models/substructure';

export class Structure {

    public id: string;

    public bossPosition: string;

    public departments: Department[];

    public substructures: SubStructure[];
}
