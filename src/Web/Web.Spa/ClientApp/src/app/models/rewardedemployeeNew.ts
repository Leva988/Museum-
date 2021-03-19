import { RewardWithYear } from './rewardwithYear';

export class RewardedEmployeeNew {

    public id: string;

    public name: string;

    public position: string;

    public dateBirth: Date;

    public dateStart: Date;

    public dateEnd: Date;

    public rewards: RewardWithYear[];
}
