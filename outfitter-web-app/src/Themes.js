import {createMuiTheme} from '@material-ui/core/styles'

/** The color palette for the default theme. */
const defaultPalette = {
    primary: {
        main: "#4285F4",
      },
      secondary: {
          main: "#FFF",
      },
      highlight: {
        main: "#4285F4",
        light: "gray",
      },
      text: {
        primary: "rgba(255, 255, 255, 255)",
      },
}

const darkPalette = {
    primary: {
        dark: "#000",
        main: "#212121",
        light: "#303030",
    },
    secondary: {
        main: "#424242",
    },
    highlight: {
        main: "#FFF",
        light: "#424242",
    },
    text: {
    primary: "rgba(255, 255, 255, 255)",
    },
}

function fillTemplate(palette) {
    return createMuiTheme({
        palette: palette,

        overrides: {
            MuiInputLabel: {
                root: {
                    color: palette.highlight.main,
                },

                shrink: {
                    '&$shrink': {
                        transform: "translate(14px, -10px) scale(0.75)!important",
                    }
                },
            },
            MuiInputBase: {
                root: {
                    borderColor: palette.highlight.main
                }
            },
        }
    });
}

export const Palettes = 
    {
        Default: fillTemplate(defaultPalette), 
        Dark: fillTemplate(darkPalette)
    }