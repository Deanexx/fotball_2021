import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IUser from "../../models/user";
import IVote from "../../models/vote";
import getVotes from "./Thunks/getVotesThunk";

const initialState: IVote = {
    _id: "",
    users: [],
    maxPlayers: 0,
    isGoals: null,
    active: false,
    totalUsers: 0,
    location: {
        type: "Point",
        coordinates: [0, 0]
    }
};

const voteSlice = createSlice({
    name: "Vote",
    initialState,
    reducers: {
        add_user: (state, action: PayloadAction<IUser>) => {
            state.users.push(action.payload);
            state.totalUsers += 1;
        },
        remove_user: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter(el => el._id !== action.payload);
            state.totalUsers -= 1;
        },
        set_map: (state, action: PayloadAction<{lat:number, lng:number}>) => {
            state.location.coordinates = [action.payload.lat, action.payload.lng];
        },
        set_goals_user: (state, action: PayloadAction<Omit<IUser, "loading">>) => {
            state.isGoals = { 
                _id: action.payload._id,
                name: action.payload.name
             }    
        },
        remove_goals_user: (state) => {
            state.isGoals = null  
        }

    },
    extraReducers: {
        [getVotes.fulfilled.type]: 
            (_, action: PayloadAction<IVote>) => {
            return action.payload
        }
    },
})
export const { add_user, remove_user, set_map, set_goals_user, remove_goals_user } = voteSlice.actions;
export default voteSlice.reducer;