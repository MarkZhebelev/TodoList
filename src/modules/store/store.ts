import {configureStore} from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlice';
import authSlice from './slices/authSlice';
const store =  configureStore({
    reducer: {
        todos: todoReducer,
        auth: authSlice
    }
})
export type RootState = ReturnType<typeof store.getState>;
export default store;