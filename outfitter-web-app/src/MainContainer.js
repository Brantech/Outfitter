import React, { Component } from 'react';
import './MainContainer.css';
import {MuiThemeProvider} from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Grid, Button } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Palettes } from './Themes';
import { LoginPage } from './Login';
import { RegisterPage } from './Register';
import { HomePage } from './Home';
import { ClosetPage } from './Closet';

/** Enums of the different screens */
export const ScreenEnum = {Login: 0, Register: 1, Home: 2, Closet: 3}

/** Instance of MainContainer used for navigation */
export var widgetWrap;

/** Main theme for the web application */
var mainTheme = Palettes.Default;

/** Widget being displayed in the main container */
var widget;

/** In charge of navigation and displaying sub panels for the web application */
export class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: ScreenEnum.Login,
      anchorEl: null,
      themeName: "Default"
    };

    widgetWrap = this;
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  selectTheme(theme, name) {
    this.setState({anchorEl: null, selectedTheme: theme, themeName: name});
    mainTheme = theme;
  }
  
  /** Changes the state to display the screen */
  displayScreen(screen) {
    this.setState({screen: screen});
  }

  getSelectedTheme = () => {
    return mainTheme;
  }

  render() {
    document.body.style.setProperty('--input-focus-border', mainTheme.palette.secondary.main);

    const subPanelContainerStyle = {
      backgroundColor: mainTheme.palette.secondary.main,
    };

    const screen = this.state.screen;

    switch(screen){
      case ScreenEnum.Login:
        widget = <LoginPage theme={mainTheme}/>;
        break;
      case ScreenEnum.Register:
        widget = <RegisterPage theme={mainTheme}/>;
        break;
      case ScreenEnum.Home:
        widget = <HomePage theme={mainTheme}/>;
        break;
      case ScreenEnum.Closet:
        widget = <ClosetPage theme={mainTheme}/>;
        break;
      default:
        // TODO: Handle bad state
    }

    return (
      <MuiThemeProvider theme={mainTheme}>
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <Typography className="headerText" color="textPrimary" variant="body2">
              Outfittr
            </Typography>
            <div style={{marginLeft: "auto", display: "flex"}}>
              <p style={{fontSize: "12px"}}>Theme:</p>
              <Button 
                aria-owns={Boolean(this.state.anchorEl) ? "themeChooser" : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                style={{paddingLeft: "8px"}}
              >
                {this.state.themeName}
              </Button>
              <Menu id="themeChooser" 
                  anchorEl={this.state.anchorEl} 
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClose}
                >
                <MenuItem style={{color: "black"}} onClick={() => this.selectTheme(Palettes.Default, "Default")}>Default</MenuItem>
                <MenuItem style={{color: "black"}} onClick={() => this.selectTheme(Palettes.Dark, "Dark")}>Dark</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Grid container justify="center" alignItems="center" style={subPanelContainerStyle} className="subPanelContainer subPanelContainerSmall">
          {widget}
        </Grid>
      </MuiThemeProvider>
    );
  }

}

export function getCurTheme() {
  return mainTheme;
}

export default MainContainer;
