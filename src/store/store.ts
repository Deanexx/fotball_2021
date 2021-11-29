import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice/userSlice";
import voteSlice from "./voteSlice/voteSlice";
import errorSlice from "./errorSlice/errorSlice";
const store = configureStore({
    reducer: {
        user: userSlice,
        vote: voteSlice,
        error: errorSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;