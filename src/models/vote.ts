import IUser from "./user";

export default interface IVote {
    _id: string,
    users: IUser[],
    maxPlayers: number,
    isGoals: string,
    active: boolean,
    totalUsers: number
}