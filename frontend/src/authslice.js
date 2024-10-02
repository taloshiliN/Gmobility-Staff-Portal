import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async({username, password}, thunkAPI) => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });
            const data = await response.json();

            if (response.ok){
                return data;
            } else {
                return thunkAPI.rejectWithValue(data)
            }
        } catch (error) {
            return thunkAPI.rejectWithValue({error: 'Network Error'})
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerStaff',
    async({Name, Surname, ID_Number, DOB, Nationality, Home_Language, Other_Languages, Position, Password}, thunkAPI) => {
        try {
            const response = await fetch('/api/registerStaff',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({Name, Surname, ID_Number, DOB, Nationality, Home_Language, Other_Languages, Position, Password}),
            });
            const data = await response.json()

            if(response.ok){
                return data;
            } else {
                return thunkAPI.rejectWithValue(data)
            }
        } catch (error){
            return thunkAPI.rejectWithValue({error: 'Network Error'})
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = true;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })

            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action)=> {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
    },
})

export const {logout} = authSlice.actions;
export default authSlice.reducer;