import React from 'react';
import './Register.css';
import gLogo from "./images/Google-Buttons/g-logo.png"
import { Card, CardActions, CardContent, TextField, Button, Grid, IconButton } from '@material-ui/core';
import {NavigateBeforeTwoTone} from '@material-ui/icons'
import { getMainTheme } from './Themes';
import {MuiThemeProvider} from '@material-ui/core/styles'
import { widgetWrap, ScreenEnum } from './MainContainer';
import TouchRipple from '@material-ui/core/ButtonBase'

/** Main theme for the web application */
const mainTheme = getMainTheme();

document.documentElement.style.setProperty("--field-focus-border", mainTheme.palette.primary.main)

/** Styles for the register page */
const style = {
    container: {
        minHeight: "740px",
        height: "80%"
    },
    card: {
        position: "relative",
        width: "100%",
        height: "100%",
    },

    title: {
        fontSize: "3em",
        cursor: "default",
        color: mainTheme.palette.primary.light
    },

    back: {
        backgroundColor: mainTheme.palette.primary.main,
        color: mainTheme.palette.secondary.main,
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

const registerPage = 
    <Grid item xs={7} style={style.container}>
        <Card style={style.card}>
            <CardContent>
                <Grid container>
                    <Grid item xs={10} sm={11}>
                        <label style={style.title}>Register</label>
                    </Grid>
                    <Grid item xs={2} sm={1} style={{textAlign: "center", display: "flex"}} justify="center" alignItems="center">
                        <IconButton aria-label="Back" style={style.back} onClick={onBackClick}>
                            <NavigateBeforeTwoTone fontSize="default"/>
                        </IconButton>
                    </Grid>
                </Grid>

                <form noValidate>
                    <MuiThemeProvider theme={getMainTheme}>
                        <Grid container spacing={8}>
                            <Grid item xs={12} sm={6}>
                                <TextField className="registerField" label="First Name" autoComplete="on" onChange={event => {onFnameFieldChange(event.target.value)}}
                                        margin="normal" inputProps={style.fieldText} fullWidth={true} variant="outlined"/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField className="registerField" label="Last Name" autoComplete="lname" autoComplete="on" onChange={event => {onLnameFieldChange(event.target.value)}}
                                        margin="normal" inputProps={style.fieldText} fullWidth={true} variant="outlined"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField className="registerField" label="Username" autoComplete="username" onChange={event => {onUsernameFieldChange(event.target.value)}}
                                        margin="normal" inputProps={style.fieldText} fullWidth={true} variant="outlined"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField className="registerField" label="Email" autoComplete="email" onChange={event => {onEmail1FieldChange(event.target.value)}}
                                        margin="normal" inputProps={style.fieldText} fullWidth={true} variant="outlined"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField className="registerField" label="Re-Type Email" autoComplete="email" onChange={event => {onEmail2FieldChange(event.target.value)}}
                                        margin="normal" inputProps={style.fieldText} fullWidth={true} variant="outlined"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField className="registerField" label="Password" autoComplete="password" onChange={event => {onPassword1FieldChange(event.target.value)}}
                                        margin="normal" type="password" inputProps={style.fieldText} fullWidth={true} variant="outlined"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField className="registerField" label="Re-Type Password" autoComplete="password" onChange={event => {onPassword2FieldChange(event.target.value)}}
                                        margin="normal" type="password" inputProps={style.fieldText} fullWidth={true} variant="outlined"/>
                            </Grid>
                        </Grid>
                    </MuiThemeProvider>
                </form>
            </CardContent>
            <CardActions style={style.cardAction}>
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <Button size="large" style={style.registerButton} onClick={onRegisterClick}>Register</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <TouchRipple style={style.gButton} onClick={onGoogleRegisterClick}>
                            <img src={gLogo} style={{width: "50px", height: "50px", userSelect: "none"}}/>
                            <div style={style.gButtonTextContainer}>
                                <p style={style.gButtonText}>Register using Google</p>
                            </div>
                        </TouchRipple>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    </Grid>

var fname;
var lname;
var username;
var email1;
var email2;
var password1;
var password2;

/** Handles changes to the fname field */
function onFnameFieldChange(text) {
    fname = text
}

/** Handles changes to the lname field */
function onLnameFieldChange(text) {
    lname = text
}

/** Handles changes to the username field */
function onUsernameFieldChange(text) {
    username = text;
}

/** Handles changes to the email1 field */
function onEmail1FieldChange(text) {
    email1 = text
}

/** Handles changes to the email2 field */
function onEmail2FieldChange(text) {
    email2 = text
}

/** Handles changes to the password1 field */
function onPassword1FieldChange(text) {
    password1 = text
}

/** Handles changes to the password2 field */
function onPassword2FieldChange(text) {
    password2 = text
}

/** Back button click handler */
function onBackClick() {
    console.log("Back clicked");
    widgetWrap.displayScreen(ScreenEnum.Login);
}

/** Register button click handler */
function onRegisterClick() {
    console.log("Register clicked");
}

function onGoogleRegisterClick() {
    
}

export function getRegisterPage() {
    return registerPage
}