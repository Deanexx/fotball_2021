import { createSlice  } from "@reduxjs/toolkit";
import IUser from "../../models/user";
import { setUser } from "./userThunks";
import ReadCookie from "../../utils/ReadCookie";

const initialState: IUser | null = null;

const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        check_user: () => {
            const cookie = ReadCookie("userSF");
            if(cookie) return void (cookie as IUser);
        }
    },
    extraReducers: {
        [setUser.fulfilled.type]: (state, action) => {
            console.log(action, "ACTION!!!")
            return action.payload
        }
    }
})

export const { check_user } = userSlice.actions;
export default userSlice.reducer;