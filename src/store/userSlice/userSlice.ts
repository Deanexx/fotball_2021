import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import IUser from "../../models/user";
import { setUser } from "./userThunks";
import ReadCookie from "../../utils/ReadCookie";

const initialState: IUser = {
    _id: "",
    name: ""
};

const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        check_user: () => {
            const cookie = ReadCookie("userSF");
            if(cookie) return cookie as IUser;
        }
    },
    extraReducers: {
        [setUser.fulfilled.type]: (_, action: PayloadAction<IUser>) => {
            return action.payload
        }
    }
})

export const { check_user } = userSlice.actions;
export default userSlice.reducer;