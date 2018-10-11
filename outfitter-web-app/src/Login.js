import React from 'react';
import './Login.css';
import { Card, CardActions, CardContent, TextField, Button, Grid } from '@material-ui/core';
import { getMainTheme } from './Themes';
import {MuiThemeProvider} from '@material-ui/core/styles'

//region Styling

const mainTheme = getMainTheme();

document.body.style.setProperty('--input-focus-border', mainTheme.palette.secondary.main);

const style = {
    card: {
        position: "relative",
        width: "400px",
        minHeight: "450px",
    },

    title: {
        fontSize: "3em",
        cursor: "default",
        color: mainTheme.palette.primary.light
    },

    fieldText: {
        style: {
            color: "black"
        }
    },

    cardAction: {
        position: "absolute",
        bottom: "0",
        width: "100%",
    },

    loginButton: {
        backgroundColor: mainTheme.palette.secondary.main, 
        float: "right", 
        width: "100%"
    },

    registerButton: {
        backgroundColor: mainTheme.palette.primary.main, 
        float: "right", 
        width: "100%"
    },

    inputLabels: {
        shrink: mainTheme.overrides.MuiInputLabel.shrink
    }
};

//endregion

var username;
var password;

/** Tags for the login widget */
const loginPage = 
    <Grid item>
        <Card style={style.card}>
            <CardContent>
                <label style={style.title}>Login</label>

                <form noValidate>
                    <MuiThemeProvider theme={getMainTheme}>
                        <TextField onChange={event => {onLoginFieldChange(event.target.value)}} className="loginField" label="Username" autoComplete="username" 
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
                </Grid>
            </CardActions>
        </Card>
    </Grid>

/** Handles changes to the login field */
function onLoginFieldChange(text) {
    username = text;
}

/** Handles changes to the password field */
function onPasswordFieldChange(text) {
    password = text
}

/** Click handler for register button */
function onRegisterClick() {
    console.log("Register Clicked");
    // TODO: Navigate to Register page
}

/** Click handler for login button */
function onLoginClick() {
    console.log("Login Clicked");

    if(username == null || password == null || username.length == 0 || password.length == 0) {
        console.log("Username and password cannot be empty");
    }
    // TODO: Contact server and wait for a response
}

export function getLoginPage() {
    return loginPage;
}