import { Button, Grid, Paper, TextField } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import React, {useState} from 'react';
import axios from "axios";
import {IconButton, InputAdornment} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState(''); // State for email
    const [password, setPassword] = useState(''); // State for password
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    const handleLogin = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        // Clear previous errors
        setEmailError('');
        setPasswordError('');

        // Email and password validation
        const emailRegex = /^[a-zA-Z]+.[a-zA-Z]+@e-uvt\.ro$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

        let valid = true;

        if (!emailRegex.test(email)) {
            setEmailError("Invalid email format. It should be FullName@e-uvt.ro");
            valid = false;
        }

        if (!passwordRegex.test(password)) {
            setPasswordError("Password must be at least 8 characters long and include at least one uppercase letter, one number, and one symbol.");
            valid = false;
        }

        if (!valid) {
            return; // Stop the login process if validation fails
        }

        navigate('/dashboard'); //asta se sterge dupa ce verificam logarea ca merge

        // try {
        //     const response = await axios.post('http://localhost:8090/auth/login', {
        //         email: email,
        //         password: password,
        //     });
        //
        //     // Assuming the server sends back a token or user data
        //     // You might want to do something with this data, like storing it for future requests
        //     if (response.data) {
        //         // Example: localStorage.setItem('authToken', response.data.token);
        //
        //         // Navigate to the dashboard on successful login
        //         navigate('/dashboard');
        //     }
        // } catch (error: unknown) {
        //     // Check if the error is an instance of the Error class
        //     if (error instanceof Error) {
        //         console.error('Login failed:', error.message);
        //         alert('Login failed. Please check your credentials and try again.');
        //     } else {
        //         // Handle cases where the error is not an Error object
        //         console.error('An unexpected error occurred:', error);
        //         alert('An unexpected error occurred. Please try again.');
        //     }
        // }

    }
    return (
        <Grid container className="page">
            <Grid item xs={12} sm={7} md={7} lg={8}>
                <Paper className="left">
                    <div className="text_container">
                        <div className="title_left">Sign in to</div>
                        <div className="subtitle_left">
                            Make Your Appointment
                        </div>
                    </div>
                    <img className="image" src={require('../../Assets/loginPage.png')} alt="Logo" />
                </Paper>
            </Grid>

            <Grid item xs={12} sm={5} md={5} lg={4}>
                <Paper className="right">
                    <form className="form_container" onSubmit={handleLogin}>
                        <div className="title_right">Sign in</div>

                        <TextField
                            className="input"
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!emailError}
                            helperText={emailError}
                        />
                        <TextField
                            className="input"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!passwordError}
                            helperText={passwordError}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className="button"
                        >
                            Login
                        </Button>

                        <div className="delimiter">
                            <div className="line"></div>
                            <div className="word">or</div>
                            <div className="line"></div>
                        </div>

                        <Button className="google_button">
                            <img className="google" src={require('../../Assets/googleLogo.png')} alt="Logo" />
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Login;