import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IError from "../../models/error";

const initialState: IError = {
    message: "",
    status: 400,
    active: false
}

const ErrorSlice = createSlice({
    name: "Error",
    initialState,
    reducers: {
        addError: (_, action: PayloadAction<IError>) => action.payload,
        deleteError: (_) => {
            return { 
                message: "",
                status: 400,
                active: false } as IError   }
    }
})

export default ErrorSlice.reducer;
export const { addError, deleteError } = ErrorSlice.actions;