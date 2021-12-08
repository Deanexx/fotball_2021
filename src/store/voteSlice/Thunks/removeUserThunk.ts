import { createAsyncThunk } from "@reduxjs/toolkit";
import { remove_user } from "./../voteSlice";
import instance from "../../../server";

const removeUser = createAsyncThunk(
    "user/remove",
    async(id: string, thunkApi) => {
        const { status } = await instance.delete<{status: string}>("vote/deleteuser");

        if (status === 204)
            thunkApi.dispatch(remove_user(id))
    })

export { removeUser };