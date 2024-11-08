import authReducer, {login, logout} from './authSlice';

describe('authSlice', () => {

    it('should return the initial state', () => {
        const emptyAction =  { type: '' };
        expect(authReducer(undefined, emptyAction)).toEqual({
            isAuthenticated: false,
            login: 'admin' || '',
            password: 'admin' || '',
        })
    })
    it('Verify that the login was done successfully', () => {
        const initialState = {
            isAuthenticated:  false,
            login: 'admin',
            password: 'admin',
        }
        const action = login({
            loginUser: 'admin',
            password: 'admin'
        })
        const nextState = authReducer(initialState, action);
        expect(nextState.isAuthenticated).toBe(true);
        expect(nextState.login).toBe('admin');
        expect(nextState.password).toBe('admin');
    })
    it('Verify that the logout was done successfully', () => {
        const initialState = {
            isAuthenticated:  true,
            login: 'admin',
            password: 'admin',
        }
        const action = logout({})
        const nextState = authReducer(initialState, action);
        expect(nextState.isAuthenticated).toBe(false);

    })
})