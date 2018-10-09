import {createMuiTheme} from '@material-ui/core/styles'
import {grey, lightGreen} from '@material-ui/core/colors'

const mainTheme = createMuiTheme({
    // The light and dark variants of the colors are generated automatically.
    // You can set them explicitely if you'd like though.
    palette: {
        primary: {
          main: grey[800],
        },
        secondary: {
            main: lightGreen[500],
        },
        text: {
          primary: "rgba(255, 255, 255, 255)",
        },
    },
  });

export function getMainTheme() { 
    return mainTheme;
}