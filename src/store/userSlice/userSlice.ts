import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import IUser from "../../models/user";
import { setUser } from "./Thunks/userThunksReg";
// import ReadCookie from "../../utils/ReadCookie";

const initialState: IUser = {
    _id: "",
    name: "",
    loading: false
};

const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        check_user: (state) => {
            // const cookie = ReadCookie("userSF");
            // if(cookie) return {...cookie, loading: false }  as IUser;
            let user: any = localStorage.getItem("user");
            if (user) {
                user = JSON.parse(user);
                return {
                    ...state,
                    _id: user._id,
                    name: user.name,
                }
            }
            
        },
        signOutUser: () => {
            localStorage.clear();
            return { _id: "", name: "", loading: false }
        },

    },
    extraReducers: {
        [setUser.fulfilled.type]: (_, action: PayloadAction<Omit<IUser, "loading">>) => {
            localStorage.setItem("user", JSON.stringify(action.payload))
            return { _id : action.payload._id,
                     name : action.payload.name,
                     loading: false }
        },
        [setUser.pending.type]: (state) => {
            state.loading = true;
        },
        [setUser.rejected.type]: (state) => {
            state.loading = false;
        }
    }
})

export const { check_user, signOutUser } = userSlice.actions;
export default userSlice.reducer;