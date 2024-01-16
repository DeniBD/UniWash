import { Button, Grid, Paper, TextField } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import {GoogleLogin} from 'react-google-login';
import React, {useState} from 'react';
import axios from "axios";
import {IconButton, InputAdornment} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
const Login = () => {
    const clientId = "21799809046-p643b3dhbgpbqsfrujgp23vndshpu4so.apps.googleusercontent.com";
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
        const emailRegex = /^[a-zA-Z]+\.?[a-zA-Z]*\d{2}@e-uvt\.ro$/;
        const passwordRegex = /.+/;

        let valid = true;

        if (!emailRegex.test(email)) {
            setEmailError("Invalid email format.");
            valid = false;
        }

        // if (!passwordRegex.test(password)) {
        //     setPasswordError("Password must be at least 8 characters long and include at least one uppercase letter, one number, and one symbol.");
        //     valid = false;
        // }

        if (!valid) {
            return; // Stop the login process if validation fails
        }

        // navigate('/dashboard'); //asta se sterge dupa ce verificam logarea ca merge


        try {
            // Step 1: Fetch the user by their email
            const userResponse = await axios.get(`http://localhost:8090/users/email/${email}`);

            // Assuming the server sends back the user data including the password
            // Note: Passwords should not be sent over an API and should be compared on the server.
            const user = userResponse.data;

            // Step 2: Compare the provided password with the one from the user data
            // This is a placeholder: You should have password hashing and comparison logic on the server
            if (user && user.password === password) {
                // Login successful

                // Store any relevant data in localStorage or context
                // Navigate to the dashboard
                navigate('/dashboard');
            } else {
                // Passwords don't match or user not found
                setPasswordError('Invalid credentials.');
            }
        } catch (error: unknown) {
            // Type check and handle the error
            if (axios.isAxiosError(error)) {
                // Handle error returned from Axios request
                const message = error.response?.data?.message || 'Login failed. Please try again.';
                setEmailError(message);
            } else if (error instanceof Error) {
                // Handle generic errors
                console.error('Login failed:', error.message);
                alert('Login failed. Please check your credentials and try again.');
            } else {
                // Handle cases where the error is not an Error object
                console.error('An unexpected error occurred:', error
                );
                alert('An unexpected error occurred. Please try again.');
            }
        }

    }
    
    const handleLoginFailure = () => {
        alert("Login failed");
    }
    
    const handleLoginSuccess = () => {
        navigate('/dashboard');
        //alert("Login success");
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

                        {/* <Button className="google_button">
                            <img className="google" src={require('../../Assets/googleLogo.png')} alt="Logo" />
                        </Button> */}
                        <div className="google_button" id="signInButton">
                        <GoogleLogin
                        clientId={clientId}
                        onSuccess={handleLoginSuccess}
                        onFailure={handleLoginFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                        buttonText="Login with Google"
                    />
                        </div>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );

};

export default Login;