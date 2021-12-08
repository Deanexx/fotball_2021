import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import IUser from "../../models/user";
import { setUser } from "./Thunks/userThunksReg";
import ReadCookie from "../../utils/ReadCookie";

const initialState: IUser = {
    _id: "",
    name: "",
    loading: false
};

const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        check_user: () => {
            const cookie = ReadCookie("userSF");
            if(cookie) return {...cookie, loading: false }  as IUser;
        },
        signOutUser: () => {
            return { _id: "", name: "", loading: false }
        },

    },
    extraReducers: {
        [setUser.fulfilled.type]: (_, action: PayloadAction<Omit<IUser, "loading">>) => {
            return { _id : action.payload._id,
                     name : action.payload.name,
                     loading: false }
        },
        [setUser.pending.type]: (state) => {
            console.log("PENNDING")
            state.loading = true;
        },
        [setUser.rejected.type]: (state) => {
            state.loading = false;
        }
    }
})

export const { check_user, signOutUser } = userSlice.actions;
export default userSlice.reducer;