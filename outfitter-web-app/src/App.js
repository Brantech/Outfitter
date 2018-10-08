import React, { Component } from 'react';
import './App.css';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import indigo from '@material-ui/core/colors/indigo'
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const mainTheme = createMuiTheme({
  palette: {
      primary: {
        main: indigo[800],
      },
      secondary: {
          main: indigo[500],
      },
  },
});

class App extends Component {
  render() {
    return (
      // ELEMENTS GO IN HERE
      <MuiThemeProvider theme={mainTheme}>
        <AppBar id="header" position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="white" className="headerText">
              Outfittr
            </Typography>
          </Toolbar>
        </AppBar>
        <div id="mainContainer" className="mainContainer mainContainerSmallScreen">
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
