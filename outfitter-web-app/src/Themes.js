import {createMuiTheme} from '@material-ui/core/styles'
import {grey, lightGreen} from '@material-ui/core/colors'

/** The color palette for the main theme. It is in a separate variable so the overrides can use it */
const palette = {
    primary: {
        light: grey[600],
        main: grey[800],
        dark: grey[900],
      },
      secondary: {
          main: lightGreen[500],
      },
      text: {
        primary: "rgba(255, 255, 255, 255)",
      },
}

/** Main theme for the web application  */
const mainTheme = createMuiTheme({
    palette: palette,

    overrides: {
        MuiInputLabel: {
            root: {
                color: palette.primary.light,
            },

            shrink: {
                '&$shrink': {
                    transform: "translate(14px, -10px) scale(0.75)!important",
                }
            },
        },
    }
  });

export function getMainTheme() { 
    return mainTheme;
}