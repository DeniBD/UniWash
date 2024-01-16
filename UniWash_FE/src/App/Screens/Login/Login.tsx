import { Button, Grid, Paper, TextField } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import {GoogleLogin} from 'react-google-login';
import React from 'react';
const Login = () => {
    const clientId = "21799809046-p643b3dhbgpbqsfrujgp23vndshpu4so.apps.googleusercontent.com";
    const navigate = useNavigate();
    const handleLogin = () => {
        //navigate('/dashboard');
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
                    <form className="form_container">
                        <div className="title_right">Sign in</div>

                        <TextField
                            className="input"
                            label="Email"
                            type="email"
                        />
                        <TextField
                            className="input"
                            label="Password"
                            type="password"
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className="button"
                            onClick = {handleLogin}

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