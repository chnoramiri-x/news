import React from "react";
import { NewsConsumer } from "../components/NewsProvider";
import Router from "next/router";
import { theme } from "../static/Style";
import {
  Button,
  InputBase,
  TextareaAutosize,
  Paper,
  IconButton,
  Box,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const useStyles = makeStyles({
  textareaPaper: {
    width: "70%",
    padding: "15px"
  },
  textarea: {
    width: "100%"
  },
  root: {
    textInput: {
      width: "20%",
      direction: "rtl"
    },
    marginTop: "30px",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  pPaper: {
    padding: "5px"
  },
  iconButton: {
    padding: 10
  }
});

const SubmitNews = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({ date: jMoment(), dir: "rtl" });
  const handleState = (stateName, stateValue) => {
    setState(prevState => ({ ...prevState, [stateName]: stateValue }));
  };
  const handleSubmit = props => {
    props.addNews({
      authorName: state.authorName,
      body: state.body,
      date: state.date.format("jYYYY/jM/jD")
    });
    handleState("authorName", "");
    handleState("body", "");
    handleState("date", jMoment());
  };
  const handleBodyChange = e => {
    handleState("body", e.target.value);
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Box>
          <Button
            className={classes.main}
            className={classes.btn}
            variant="contained"
            onClick={() => Router.back()}
          >
            بازگشت
          </Button>
        </Box>

        <Box className={classes.root} display="flex" justifyContent="center">
          <Paper className={classes.textareaPaper}>
            <TextareaAutosize
              className={classes.textarea}
              onChange={e => handleBodyChange(e)}
              value={state.body || ""}
              rowsMin={5}
              placeholder="متن خبر"
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                handleState("body", "");
              }}
            >
              <ClearIcon fontSize="small" />
            </Button>
          </Paper>
        </Box>
        <Box className={classes.root} display="flex" justifyContent="center">
          <Paper className={classes.pPaper}>
            <InputBase
              required
              onChange={e => handleState("authorName", e.target.value)}
              value={state.authorName || ""}
              placeholder="نام نویسنده"
            />
            <IconButton
              onClick={() => {
                handleState("authorName", "");
              }}
              className={classes.iconButton}
              aria-label="search"
            >
              <ClearIcon />
            </IconButton>
          </Paper>
          <Paper className={classes.pPaper}>
            <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
              <DatePicker
                clearable
                disablePast={true}
                okLabel="تأیید"
                cancelLabel="لغو"
                clearLabel="پاک کردن"
                labelFunc={date => (date ? date.format("jYYYY/jMM/jDD") : "")}
                value={state.date}
                onChange={e => handleState("date", e)}
              />
            </MuiPickersUtilsProvider>
          </Paper>
          <NewsConsumer>
            {props => (
              <Button
                onClick={() => handleSubmit(props)}
                variant="contained"
                color="primary"
              >
                ثبت خبر
              </Button>
            )}
          </NewsConsumer>
        </Box>
      </ThemeProvider>
    </React.Fragment>
  );
};
export default SubmitNews;
