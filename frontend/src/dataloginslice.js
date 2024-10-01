import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  data: [],
  status: "idle",
  error: null
}

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ firstname, password }, {rejectWithValue}) => {
      try {
        const response = await axios.post("http://localhost:8080/api/login", {
          firstname,
          password,
        });
        return response.data;
      } catch (err){
        if(err.response && err.response.data.message){
          return rejectWithValue(err.response.data.message)
        }
        return rejectWithValue("Something went wrong")
      }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          state.status = "loading";
          state.error=null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          console.log(action.payload);
          if (action.payload.message === "Login successful") {
            state.isAuthenticated = true;
            state.data.push(action.payload);
            state.position = action.payload.user.Position;
          } else {
            state.error = action.payload.message;
          }
          state.status = "idle";
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.error = action.error?.message || "Failed to Login";
          state.status = "failed";
        });
    },
});

export default authSlice.reducer;