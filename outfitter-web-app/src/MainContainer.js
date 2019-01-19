import React, { Component } from 'react';
import './MainContainer.css';
import {MuiThemeProvider} from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Grid } from '@material-ui/core';
import { getMainTheme } from './Themes';
import { getLoginPage } from './Login';
import { getRegisterPage } from './Register';
import { getHomePage } from './Home';

/** Enums of the different screens */
export const ScreenEnum = {Login: 0, Register: 1, Home: 2}

/** Instance of MainContainer used for navigation */
export var widgetWrap;

/** Main theme for the web application */
const mainTheme = getMainTheme();

// TextField focused border color
document.body.style.setProperty('--input-focus-border', mainTheme.palette.secondary.main);

/** Style for the sub panel container */
const subPanelContainerStyle = {
  backgroundColor: getMainTheme().palette.secondary.light,
};

/** In charge of navigation and displaying sub panels for the web application */
class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: ScreenEnum.Login
    };

    widgetWrap = this;
  }

  /** Changes the state to display the screen */
  displayScreen(screen) {
    this.setState({screen: screen});
  }

  render() {
    const screen = this.state.screen;
    var widget;

    switch(screen){
      case ScreenEnum.Login:
        widget = getLoginPage();
        break;
      case ScreenEnum.Register:
        widget = getRegisterPage();
        break;
      case ScreenEnum.Home:
        widget = getHomePage();
        break;
      default:
        // TODO: Handle bad state
    }

    return (
      <MuiThemeProvider theme={getMainTheme}>
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <Typography className="headerText" color="textPrimary">
              Outfittr
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container justify="center" alignItems="center" style={subPanelContainerStyle} className="subPanelContainer subPanelContainerSmall">
          {widget}
        </Grid>
      </MuiThemeProvider>
    );
  }

}

export default MainContainer;
