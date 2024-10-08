import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    overtimeData: [],
    status: "idle",
    error: null
};

export const createOvertimeRequest = createAsyncThunk(
    "overtime/createOvertimeRequest",
    async ({ employeeName, date, start_time, end_time, duration, reason, position }) => { // Added position here
        const response = await axios.post("http://localhost:8080/api/overtime", {
            employeeName,
            position, // Include position in the payload
            date,
            start_time,
            end_time,
            duration,
            reason,
        });
        return response.data;
    }
);

const overtimeSlice = createSlice({
    name: "overtime",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOvertimeRequest.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createOvertimeRequest.fulfilled, (state, action) => {
                state.status = "succeed";
                state.overtimeData.push(action.payload);
            })
            .addCase(createOvertimeRequest.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    }
});

export default overtimeSlice.reducer;
