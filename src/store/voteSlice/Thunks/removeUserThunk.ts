import { createAsyncThunk } from "@reduxjs/toolkit";
import { remove_user } from "./../voteSlice";
import instance from "../../../server";

const removeUser = createAsyncThunk(
    "user/remove",
    async(id: string, thunkApi) => {
        const { status } = await instance.post<{status: string}>("vote/deleteuser", { _id: id });

        if (status === 204)
            thunkApi.dispatch(remove_user(id))
    })

export { removeUser };