import React, { Component } from 'react';
import './Login.css';
import { Card, CardActions, CardContent, TextField, Button, Grid } from '@material-ui/core';
import {MuiThemeProvider} from '@material-ui/core/styles';
import { widgetWrap, ScreenEnum } from './MainContainer';
import {Auth} from 'aws-amplify';
import aws_exports from './aws-exports';
import GoogleLogin from 'react-google-login';

Auth.configure(aws_exports);

//region Styling

/** Styles for the login page */
const style = (theme) => {
    document.documentElement.style.setProperty("--field-focus-border", theme.palette.highlight.main);

    return ({
        card: {
            position: "relative",
            width: "400px",
            minHeight: "450px",
            backgroundColor: theme.palette.secondary.light,
        },

        title: {
            fontSize: "3em",
            cursor: "default",
            color: theme.palette.highlight.main
        },

        fieldText: {
            style: {
                color: theme.palette.highlight.main,
            },
        },

        cardAction: {
            position: "absolute",
            bottom: "0",
            width: "100%",
            padding: "16px"
        },

        loginButton: {
            backgroundColor: theme.palette.primary.main, 
            float: "right", 
            width: "100%",
            height: "50px"
        },

        registerButton: {
            backgroundColor: theme.palette.secondary.main, 
            border: "1px solid " + theme.palette.highlight.light,
            color: theme.palette.secondary.contrastText,
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
            shrink: theme.overrides.MuiInputLabel.shrink
        }
    });
};

//endregion

function progressLogIn(session) {
    console.log(session);
}

export class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            theme: props.theme,
        }

        this.style = style(props.theme);
    }

    setTheme = function(theme) {
        this.setState({theme: theme});
        this.style = style(theme);
    }

    /** Handles changes to the username field */
    onUsernameFieldChange(text) {
        this.setState({username: text});
    }

    /** Handles changes to the password field */
    onPasswordFieldChange(text) {
        this.setState({password: text});
    }

    /** Click handler for register button */
    onRegisterClick() {
        widgetWrap.displayScreen(ScreenEnum.Register);
        console.log(widgetWrap.getSelectedTheme())
    }

    /** Click handler for login button */
    onLoginClick() {

        if(this.state.username == null || this.state.password == null || this.state.username.length === 0 || this.state.password.length === 0) {
            console.log("Username and password cannot be empty");
        }
        Auth.signOut().catch(err => console.log(err))

        Auth.signIn({
            username: this.state.username,
            password: this.state.password,
        }).then(user => progressLogIn(user.signInUserSession))
        .catch(err => console.log(err));

        widgetWrap.displayScreen(ScreenEnum.Home);
        // TODO: Contact server and wait for a response
    }

    async onGoogleSignInClick(res) {
        let user = {
            username: res.profileObj.googleId,
            email: res.profileObj.email,
            family_name: res.profileObj.familyName,
            name: res.profileObj.givenName
        }

        Auth.signOut().catch(err => console.log(err))
        const cred = await Auth.federatedSignIn(
            'google',
            {token: res.Zi.id_token, expires_at: res.Zi.expires_at},
            user
        )
    }

    render() {
        this.style = style(this.props.theme);
        
        return (
            <Grid item>
                <Card style={this.style.card} elevation={5}>
                    <CardContent>
                        <label style={this.style.title}>Login</label>
                        <MuiThemeProvider theme={this.state.mainTheme}>
                            <TextField onChange={event => {this.onUsernameFieldChange(event.target.value)}} className="loginField" label="Username" autoComplete="new-username" 
                                        margin="normal" inputProps={this.style.fieldText} fullWidth={true} variant="outlined"/>
                                        
                            <TextField onChange={event => {this.onPasswordFieldChange(event.target.value)}} className="loginField" label="Password" autoComplete="new-password" 
                                        margin="normal" type="password" inputProps={this.style.fieldText} fullWidth={true} variant="outlined"/>
                        </MuiThemeProvider>
                    </CardContent>
                    <CardActions style={this.style.cardAction}>
                        <Grid container spacing={8}>
                            <Grid item xs={12} sm={12} md={6}>
                                <Button onClick={() => this.onRegisterClick()} size="large" style={this.style.registerButton}>Register</Button>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <Button onClick={() => this.onLoginClick()} size="large" style={this.style.loginButton}>Login</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <GoogleLogin
                                    className="gButton"
                                    theme="dark"
                                    scope="profile email openid"
                                    clientId='507614168208-7dsdu2m7imgq6t0dvbb32pt85h1j67bo.apps.googleusercontent.com'
                                    buttonText="Login in with Google"
                                    onSuccess={(res) => this.onGoogleSignInClick(res)}
                                    onFailure={(err) => console.log(err)}
                                    />
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}