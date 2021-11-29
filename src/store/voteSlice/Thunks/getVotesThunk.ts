import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../server";
import IVote from "../../../models/vote";

const getVotes = createAsyncThunk(
    "vote/getvote",
    async() => {
        const res = await instance.get<IVote>("vote/getvote");
        if (res.status === 200)
            return res.data; 
    }
)

export default getVotes;