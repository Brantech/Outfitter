import {createMuiTheme} from '@material-ui/core/styles'

/** The color palette for the main theme. It is in a separate variable so the overrides can use it */
const palette = {
    primary: {
        main: "#4285F4",
      },
      secondary: {
          main: "#FFF",
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
                color: palette.primary.main,
            },

            shrink: {
                '&$shrink': {
                    transform: "translate(14px, -10px) scale(0.75)!important",
                }
            },
        },
        MuiInputBase: {
            root: {
                borderColor: palette.primary.main
            }
        }
    }
  });

export function getMainTheme() { 
    return mainTheme;
}