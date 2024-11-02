import {createSlice} from '@reduxjs/toolkit';

interface IAuthState {
    isAuthenticated: boolean,
    login: string,
    password: string,

}
const initialState: IAuthState = {
    isAuthenticated: sessionStorage.getItem('isAuthenticated') === 'true' || false,
    login: process.env.REACT_APP_LOGIN || '',
    password: process.env.REACT_APP_PASSWORD || '',
}

const createAuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
           try{
               const { loginUser, password } = action.payload;
               if(state.login === loginUser && state.password === password) {
                   state.isAuthenticated = true;
                   sessionStorage.setItem('isAuthenticated', 'true');
                   console.log('correctly')
               }
               else {
                   alert('Invalid login or password');
                   console.log('Invalid login or password');
               }
           } catch(error) {
               console.log(error)
           }
        },
        logout: (state, action) => {
            state.isAuthenticated = false
            sessionStorage.removeItem('isAuthenticated');
        }
    }
})

export const {login, logout} = createAuthSlice.actions;
export default createAuthSlice.reducer
