import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../server";
import { signOutUser } from "./../userSlice";

const signOut = createAsyncThunk(
    "user/signout",
    async (_, ThunkApi) => {
        let { status } = await instance.get<{ status: number }>("user/signout");
        if (status === 204) ThunkApi.dispatch(signOutUser());
    }
)

export { signOut };