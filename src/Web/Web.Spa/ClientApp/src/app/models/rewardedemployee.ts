export class RewardedEmployee {
    public name: string;

    public position: string;

    public dateBirth: string;

    public dateStart: string;

    public dateEnd: string;

    public dateReward: string;

    public rewards: {
         rewardId: string;
         dateReward: string;
    }[];
}
