import React from 'react';
import { Card, CardActions, CardContent, TextField, Button, Grid } from '@material-ui/core';
import { getMainTheme } from './Themes';

const mainTheme = getMainTheme();

const style = {
    card: {
        position: "relative",
        width: "400px",
        minHeight: "450px",
    },

    title: {
        fontSize: "3em",
        cursor: "default"
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
    }
}

const loginPage = 
    <Grid item>
        <Card style={style.card}>
            <CardContent>
                <label style={style.title}>Login</label>

                <form noValidate>

                    <TextField label="Username" autoFocus={true} margin="normal" inputProps={style.fieldText} fullWidth={true} variant="outlined"/>
                    <TextField label="Password" margin="normal" type="password" inputProps={style.fieldText} fullWidth={true} variant="outlined"/>
                </form>
            </CardContent>
            <CardActions style={style.cardAction}>
                <Grid container spacing={8}>
                    <Grid item xs={12} sm={12} md={6}>
                        <Button size="large" style={style.registerButton}>Register</Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Button size="large" style={style.loginButton}>Login</Button>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    </Grid>

export function getLoginPage() {
    return loginPage;
}