import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { lightBlue, grey } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: grey[400],
      main: grey[700],
      dark: grey[900],
    },
    secondary: {
      main: lightBlue[600],
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

export default function ThemeWrapper({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
