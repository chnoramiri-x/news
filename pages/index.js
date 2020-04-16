import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

//////// just for test/////// ///
const theme = createMuiTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Lalezar, cursive"
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    // everything in this parent
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

const Index = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Box className={classes.root} display="flex" justifyContent="center">
          <Link href="/submitNews">
            <Button variant="contained" color="primary">
              ثبت خبر
            </Button>
          </Link>
          <Link href="/searchNews">
            <Button variant="contained" color="primary">
              جستجوی خبر
            </Button>
          </Link>
        </Box>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default Index;
