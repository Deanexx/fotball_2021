import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IVote from "../../models/vote";
import { getVotes } from "./voteThunks";

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

    },
    extraReducers: {
        [getVotes.fulfilled.type]: (_, action: PayloadAction<IVote>) => {
            return action.payload
        }
    }
})

export default voteSlice.reducer;