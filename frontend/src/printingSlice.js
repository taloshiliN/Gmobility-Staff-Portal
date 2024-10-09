import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    printingData: [],
    status: "idle",
    error: null
};

// Thunk to handle the printing request
export const createPrintingRequest = createAsyncThunk(
    "printing/createPrintingRequest",
    async ({ from, to, subject, message }) => {
        try {
            const response = await axios.post("http://localhost:8080/api/printing", {
                from,
                to,
                subject,
                message
            });
            return response.data;
        } catch (error) {
            throw Error("Failed to create printing request");
        }
    }
);

const printingSlice = createSlice({
    name: "printing",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPrintingRequest.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createPrintingRequest.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.printingData.push(action.payload);
            })
            .addCase(createPrintingRequest.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    }
});

export default printingSlice.reducer;
