import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IUser from "../../models/user";
import IVote from "../../models/vote";
import getVotes from "./Thunks/getVotesThunk";

const initialState: IVote = {
    _id: "",
    users: [],
    maxPlayers: 0,
    isGoals: "",
    active: false,
    totalUsers: 0
};

const voteSlice = createSlice({
    name: "Vote",
    initialState,
    reducers: {
        add_user: (state, action: PayloadAction<IUser>) => {
            state.users.push(action.payload);
        }
    },
    extraReducers: {
        [getVotes.fulfilled.type]: 
            (_, action: PayloadAction<IVote>) => {
            return action.payload
        }
    }
})
export const { add_user } = voteSlice.actions;
export default voteSlice.reducer;