import { createAsyncThunk } from "@reduxjs/toolkit";
import IUser from "../../../models/user";
import instance from "../../../server";
import { add_user } from "../voteSlice";

const addUser = createAsyncThunk<void, IUser>(
    "vote/adduser",
    async(user, thunkApi) => {
        const res = await instance.get("vote/adduser");
        
        if(res.status === 204)
            thunkApi.dispatch(add_user(user));
    })

export default addUser;