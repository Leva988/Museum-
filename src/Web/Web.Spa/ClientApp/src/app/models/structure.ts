import { Department } from '../models/department';
import { Substructure } from './substructure';
export class Structure {

    public id: string;

    public bossPosition: string;

    public substructures: Substructure[];

}
