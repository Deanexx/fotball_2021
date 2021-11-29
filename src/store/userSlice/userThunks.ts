import { createAsyncThunk } from "@reduxjs/toolkit";
import IUser from "./../../models/user";
import instance from "./../../server/"

interface ISubmit {
    endPoint: "login" | "register",
    name: string
}

const setUser = createAsyncThunk(
    "user/regLog",
    async (payload: ISubmit) => {
        const {name, endPoint} = payload;
        const {status, data} = await instance.post<IUser>(`user/${endPoint}`, { name });
        if (status === 201)
            return data
})

export { setUser };