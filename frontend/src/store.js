// import {configureStore} from '@reduxjs/toolkit';
// import authReducer from './authslice';

// export const store = configureStore({
//     reducer: {
//         auth: authReducer,
//     },
// });

import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice"
import authReducer from "./dataloginslice"
import leaveReducer from "./leaveSlice"
import overtimeReducer from "./overtimeSlice"

export const store = configureStore({
    reducer: {
        data: dataReducer,
        auth: authReducer,
        leave: leaveReducer,
        overtime: overtimeReducer
    }
});