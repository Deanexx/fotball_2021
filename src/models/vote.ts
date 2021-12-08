import IUser from "./user";

export default interface IVote {
    _id: string,
    users: Omit<IUser, "loading">[],
    maxPlayers: number,
    isGoals: Omit<IUser, "loading"> | null,
    active: boolean,
    totalUsers: number,
    location: {
        type: "Point",
        coordinates: number[];
    }
}