import React from 'react';
import './Login.css';
import gLogo from "./images/Google-Buttons/g-logo.png"
import { Card, CardActions, CardContent, TextField, Button, Grid } from '@material-ui/core';
import { getMainTheme } from './Themes';
import {MuiThemeProvider} from '@material-ui/core/styles'
import { widgetWrap, ScreenEnum } from './MainContainer';
import TouchRipple from '@material-ui/core/ButtonBase'

//region Styling

/** Main theme for the web application */
const mainTheme = getMainTheme();

document.documentElement.style.setProperty("--field-focus-border", mainTheme.palette.primary.main)

/** Styles for the login page */
const style = {
    card: {
        position: "relative",
        width: "400px",
        minHeight: "450px",
    },

    title: {
        fontSize: "3em",
        cursor: "default",
        color: mainTheme.palette.primary.main
    },

    fieldText: {
        style: {
            color: "black"
        },

        '&$focused': {
            borderColor: mainTheme.palette.primary.main,
        }
    },

    cardAction: {
        position: "absolute",
        bottom: "0",
        width: "100%",
        padding: "16px"
    },

    loginButton: {
        backgroundColor: mainTheme.palette.primary.main, 
        float: "right", 
        width: "100%",
        height: "50px"
    },

    registerButton: {
        backgroundColor: mainTheme.palette.secondary.main, 
        border: "1px solid gainsboro",
        color: "black",
        float: "right", 
        width: "100%",
        height: "50px"
    },

    gButton: {
        display: "flex",
        border: "1px solid gainsboro",
        borderRadius: "4px",
        cursor: "pointer",
        width: "100%",
        color: "white"
    },

    gButtonTextContainer: {
        flex: "1", 
        height: "50px",
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        backgroundColor: "#4285F4"
    },

    gButtonText: {
        fontSize: "17px",
        fontWeight: "500",
        color: "white", 
        userSelect: "none", 
        cursor: "pointer",
        fontFamily: "Roboto"
    },

    inputLabels: {
        shrink: mainTheme.overrides.MuiInputLabel.shrink
    }
};

//endregion

/** Stores the typed in username */
var username;

/** Stores the typed in password */
var password;

/** Tags for the login widget */
const loginPage = 
    <Grid item>
        <Card style={style.card}>
            <CardContent>
                <label style={style.title}>Login</label>

                <form noValidate>
                    <MuiThemeProvider theme={getMainTheme}>
                        <TextField onChange={event => {onUsernameFieldChange(event.target.value)}} className="loginField" label="Username" autoComplete="username" 
                                    margin="normal" inputProps={style.fieldText} fullWidth={true} variant="outlined"/>
                                    
                        <TextField onChange={event => {onPasswordFieldChange(event.target.value)}} className="loginField" label="Password" autoComplete="password" 
                                    margin="normal" type="password" inputProps={style.fieldText} fullWidth={true} variant="outlined"/>
                    </MuiThemeProvider>
                </form>
            </CardContent>
            <CardActions style={style.cardAction}>
                <Grid container spacing={8}>
                    <Grid item xs={12} sm={12} md={6}>
                        <Button onClick={onRegisterClick} size="large" style={style.registerButton}>Register</Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Button onClick={onLoginClick} size="large" style={style.loginButton}>Login</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <TouchRipple style={style.gButton} onClick={onGoogleSignInClick}>
                            <img src={gLogo} style={{width: "50px", height: "50px", userSelect: "none"}}/>
                            <div style={style.gButtonTextContainer}>
                                <p style={style.gButtonText}>Login with Google</p>
                            </div>
                        </TouchRipple>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    </Grid>

/** Handles changes to the username field */
function onUsernameFieldChange(text) {
    username = text;
}

/** Handles changes to the password field */
function onPasswordFieldChange(text) {
    password = text
}

/** Click handler for register button */
function onRegisterClick() {
    widgetWrap.displayScreen(ScreenEnum.Register);
}

/** Click handler for login button */
function onLoginClick() {

    if(username == null || password == null || username.length === 0 || password.length === 0) {
        console.log("Username and password cannot be empty");
    }
    // TODO: Contact server and wait for a response
}

function onGoogleSignInClick() {

}

export function getLoginPage() {
    return loginPage;
}