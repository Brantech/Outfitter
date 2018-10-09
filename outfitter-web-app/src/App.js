import React, { Component } from 'react';
import './App.css';
import {MuiThemeProvider} from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Grid } from '@material-ui/core';
import { getMainTheme } from './Themes';
import { getLoginPage } from './Login';

const mainContainerStyle = {
  backgroundColor: getMainTheme().palette.secondary.light,
}

class App extends Component {

  render() {    
    return (
        <MuiThemeProvider theme={getMainTheme}>
          <AppBar id="header" position="static" color="primary">
            <Toolbar>
              <Typography className="headerText" color="textPrimary">
                Outfittr
              </Typography>
            </Toolbar>
          </AppBar>
          <Grid container justify="center" alignItems="center" style={mainContainerStyle} className="mainContainer mainContainerSmallScreen">
            {getLoginPage()}
          </Grid>
        </MuiThemeProvider>);
  }

}

export default App;
