import { createSlice, PayloadAction,  } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import IUser from "../../models/user";

const initialState: IUser | null = null;

const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        check_user: () => {
            const res: string | undefined = Cookies.get("user");
            console.log(res);
            // const user: IUser | null = res ? res : null;
            // return user;
        },
        set_user: (_ , action:PayloadAction<IUser> ) => action.payload,
    }
})


export { check_user, set_user } = userSlice.actions;
export default userSlice.reducer;