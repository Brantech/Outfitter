import React, { Component } from 'react';
import './Register.css';
import { Card, CardActions, CardContent, TextField, Button, Grid, IconButton } from '@material-ui/core';
import {NavigateBeforeTwoTone} from '@material-ui/icons'
import {MuiThemeProvider} from '@material-ui/core/styles'
import { widgetWrap, ScreenEnum } from './MainContainer';
import {Auth} from 'aws-amplify';
import aws_exports from './aws-exports';

Auth.configure(aws_exports);

//region Styling

/** Styles for the register page */
const style = (theme) => {
    document.documentElement.style.setProperty("--field-focus-border", theme.palette.highlight.main)
    
    return ({
        container: {
            minHeight: "740px",
            height: "80%"
        },

        card: {
            position: "relative",
            width: "100%",
            height: "100%",
            backgroundColor: theme.palette.secondary.light,
        },

        title: {
            fontSize: "3em",
            cursor: "default",
            color: theme.palette.highlight.main
        },

        back: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
        },

        fieldText: {
            style: {
                color: theme.palette.highlight.main,
            }
        },

        cardAction: {
            position: "absolute",
            bottom: "0",
            width: "100%",
        },

        loginButton: {
            backgroundColor: theme.palette.secondary.main, 
            float: "right", 
            width: "100%"
        },

        registerButton: {
            backgroundColor: theme.palette.primary.main, 
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
            shrink: theme.overrides.MuiInputLabel.shrink
        }
    });
};

export class RegisterPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            fname: "",
            lname: "",
            username: "",
            email1: "",
            email2: "",
            password1: "",
            password2: "",
            theme: props.theme,
        }

        this.style = style(props.theme);
    }

    setTheme = function(theme) {
        this.setState({theme: theme});
        this.style = style(theme);
    }

    /** Handles changes to the fname field */
    onFnameFieldChange(text) {
        this.setState({fname: text});
    }

    /** Handles changes to the lname field */
    onLnameFieldChange(text) {
        this.setState({lname: text});
    }

    /** Handles changes to the username field */
    onUsernameFieldChange(text) {
        this.setState({username: text});
    }

    /** Handles changes to the email1 field */
    onEmail1FieldChange(text) {
        this.setState({email1: text});
    }

    /** Handles changes to the email2 field */
    onEmail2FieldChange(text) {
        this.setState({email2: text});
    }

    /** Handles changes to the password1 field */
    onPassword1FieldChange(text) {
        this.setState({password1: text});
    }

    /** Handles changes to the password2 field */
    onPassword2FieldChange(text) {
        this.setState({password2: text});
    }

    /** Back button click handler */
    onBackClick() {
        widgetWrap.displayScreen(ScreenEnum.Login);
    }

    /** Register button click handler */
    onRegisterClick() {
        // if(this.state.password1 !== this.state.password2) {
        //     return;
        // }

        // if(this.state.email1 !== this.state.email2) {
        //     return;
        // }


        Auth.signUp({
            username: this.state.username,
            password: this.state.password1,
            attributes: {
                email: this.state.email1,
                family_name: this.state.lname,
                name: this.state.fname
            }, 

        }).then(data => console.log(data)).catch(e => console.log(e.message));
    }

    onGoogleRegisterClick() {
        
    }

    render() {
        this.style = style(this.props.theme);

        return (
            <Grid item xs={7} style={this.style.container}>
                <Card style={this.style.card} elevation={5}>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={10} sm={11}>
                                <label style={this.style.title}>Register</label>
                            </Grid>
                            <Grid item xs={2} sm={1} style={{justifyContent: "center", display: "flex"}}>
                                <IconButton aria-label="Back" style={this.style.back} onClick={() => this.onBackClick()}>
                                    <NavigateBeforeTwoTone fontSize="default"/>
                                </IconButton>
                            </Grid>
                        </Grid>

                        <form noValidate>
                            <MuiThemeProvider theme={this.props.theme}>
                                <Grid container spacing={8}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField className="registerField" label="First Name" autoComplete="fname" onChange={event => {this.onFnameFieldChange(event.target.value)}}
                                                margin="normal" inputProps={this.style.fieldText} fullWidth={true} variant="outlined"/>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField className="registerField" label="Last Name" autoComplete="lname" onChange={event => {this.onLnameFieldChange(event.target.value)}}
                                                margin="normal" inputProps={this.style.fieldText} fullWidth={true} variant="outlined"/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField className="registerField" label="Username" autoComplete="username" onChange={event => {this.onUsernameFieldChange(event.target.value)}}
                                                margin="normal" inputProps={this.style.fieldText} fullWidth={true} variant="outlined"/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField className="registerField" label="Email" autoComplete="email" onChange={event => {this.onEmail1FieldChange(event.target.value)}}
                                                margin="normal" inputProps={this.style.fieldText} fullWidth={true} variant="outlined"/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField className="registerField" label="Re-Type Email" autoComplete="email" onChange={event => {this.onEmail2FieldChange(event.target.value)}}
                                                margin="normal" inputProps={this.style.fieldText} fullWidth={true} variant="outlined"/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField className="registerField" label="Password" autoComplete="password" onChange={event => {this.onPassword1FieldChange(event.target.value)}}
                                                margin="normal" type="password" inputProps={this.style.fieldText} fullWidth={true} variant="outlined"/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField className="registerField" label="Re-Type Password" autoComplete="password" onChange={event => {this.onPassword2FieldChange(event.target.value)}}
                                                margin="normal" type="password" inputProps={this.style.fieldText} fullWidth={true} variant="outlined"/>
                                    </Grid>
                                </Grid>
                            </MuiThemeProvider>
                        </form>
                    </CardContent>
                    <CardActions style={this.style.cardAction}>
                        <Grid container spacing={8}>
                            <Grid item xs={12}>
                                <Button size="large" style={this.style.registerButton} onClick={() => this.onRegisterClick()} draggable="false">Register</Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}