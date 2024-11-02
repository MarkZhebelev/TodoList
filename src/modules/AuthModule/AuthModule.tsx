import TextField from '@mui/material/TextField';
import { FormControl, InputAdornment, InputLabel, OutlinedInput} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, {useRef} from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from 'react-redux';
import {login, logout} from '../store/slices/authSlice';
import {useNavigate} from 'react-router-dom';
import {RootState} from '../store/store';


const AuthModule = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated)
    const dispatch = useDispatch();
    const refPassword = useRef<HTMLInputElement>(null);
    const refLogin = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleSingIn = () => {
        const loginUser = refLogin.current?.value;
        const password = refPassword.current?.value;
        if(loginUser && password){
            dispatch(login({loginUser, password}))
            navigate("/todolist");
        }
    }

    const handleSingOut = () => {
        dispatch(logout({}))
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <Box>
            <TextField
                disabled={isAuth}
                inputRef={refLogin}
                id="outlined-basic"
                label="Login"
                variant="outlined"
                sx={{ m: 1,width: '100%', backgroundColor: 'white' }}
            />
            <FormControl sx={{ m: 1, width: '100%', backgroundColor: 'white', borderRadius: '5px' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    disabled={isAuth}
                    inputRef={refPassword}
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={
                                    showPassword ? 'hide the password' : 'display the password'
                                }
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
          <ButtonGroup >
              <Button disabled={isAuth} onClick={handleSingIn} variant="contained">sing in</Button>
              <Button disabled={!isAuth} onClick={handleSingOut} variant="contained">sing out</Button>
          </ButtonGroup>
        </Box>
    );
};
const Box = styled.div`
    background-color: #9e9e9e69;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 500px;
    height: 100vh;
    padding: 20px 10px;
`
const ButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
    gap:30px; 
    width: 100%;
`
export default AuthModule;

