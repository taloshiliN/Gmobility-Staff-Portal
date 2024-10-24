import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated: false,
    data: [],
    status: "idle",
    error: null,
    position: null, // Added to store user position
    userRoles: [],  // Added to store user roles
};

// Async thunk for logging in
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ firstname, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:8080/api/login", {
                firstname,
                password,
            });
            return response.data;
        } catch (err) {
            if (err.response && err.response.data.message) {
                return rejectWithValue(err.response.data.message);
            }
            return rejectWithValue("Something went wrong");
        }
    }
);

// Async thunk for fetching user roles
export const fetchUserRoles = createAsyncThunk(
    "auth/fetchUserRoles",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8080/roles/${id}`);
            return response.data; // Assuming response.data is an array of roles
        } catch (err) {
            return rejectWithValue("Failed to fetch user roles");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserRoles: (state, action) => {
            state.userRoles = action.payload; // Update state with fetched roles
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log(action.payload);
                if (action.payload.message === "Login successful") {
                    state.isAuthenticated = true;
                    state.data.push(action.payload.user); // Store user object directly
                    state.position = action.payload.user.Position;
                } else {
                    state.error = action.payload.message;
                }
                state.status = "idle";
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.error?.message || "Failed to Login";
                state.status = "failed";
            })
            .addCase(fetchUserRoles.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUserRoles.fulfilled, (state, action) => {
                state.userRoles = action.payload; // Set user roles from fetched data
                state.status = "idle";
            })
            .addCase(fetchUserRoles.rejected, (state, action) => {
                state.error = action.payload || "Failed to fetch user roles";
                state.status = "failed";
            });
    },
});

export const { setUserRoles } = authSlice.actions; // Export the action to set user roles
export default authSlice.reducer;
