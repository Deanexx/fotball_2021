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
        // console.log(name, endPoint, "Before request sent")
        const {status, data} = await instance.post<IUser>(`user/${endPoint}`, { name });
        // console.log(status, data, "DATA, STATUS!!!");
        if (status === 201)
            return data
})

export { setUser };