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
      text: {
        primary: "rgba(255, 255, 255, 255)",
      },
  },
});

const pageTemplate = 
    <MuiThemeProvider theme={mainTheme}>
      <AppBar id="header" position="static" color="primary">
        <Toolbar>
          <Typography className="headerText" color="textPrimary">
            Outfittr
          </Typography>
        </Toolbar>
        </AppBar>
          <div ref={(container) => {this.mainContainer = container}} className="mainContainer mainContainerSmallScreen">
          </div>
    </MuiThemeProvider>

class App extends Component {

  render() {
    console.log(pageTemplate);
    
    return pageTemplate;
  }
}

export default App;
