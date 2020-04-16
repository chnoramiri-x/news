import React, { useState, useEffect } from "react";
import Router from "next/router";
import Button from "@material-ui/core/Button";
import Select from "react-select";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";
import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { theme } from "../static/Style";

const searchNews = props => {
  // const theme = createMuiTheme({
  //   direction: "rtl",
  //   typography: {
  //     fontFamily: "Lalezar, cursive"
  //   }
  // });
  const useStyles = makeStyles(theme => ({
    root: {
      "& > *": {
        margin: theme.spacing(1)
      }
    },
    select: {
      width: "150px"
    },
    container: {
      "& > *": {
        margin: theme.spacing(1)
      },
      display: "flex",
      justifyContent: "center"
    },
    table: {
      marginTop: "30px",
      width: "74%",
      boxShadow: "none",
      border: "1px solid #dfe1e5",
      borderRadius: "10px",
      backgroundColor: "#fff"
    },
    selecInput: {
      width: "200px"
    }
  }));
  const [state, setState] = useState({
    newsState: [],
    selectedDate: jMoment(),
    list: []
  });

  const handleState = (stateName, stateValue) => {
    setState(prevState => ({ ...prevState, [stateName]: stateValue }));
  };

  const classes = useStyles();
  useEffect(() => {
    handleState("list", props.news.news);
    const uniqArray = [
      ...new Set(props.news.news.map(record => record.authorName))
    ].map(record => {
      return {
        value: record,
        label: record
      };
    });
    handleState("options", uniqArray);
  }, []);

  const handleChange = selectedOption => {
    handleState("selectedOption", selectedOption);
  };
  jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

  const handleSearch = () => {
    const searchData = {
      authorName: state.selectedOption,
      date: state.selectedDate.format("jYYYY/jM/jD")
    };
    let filterBox = state.list.filter(
      x =>
        x.date == searchData.date && x.authorName == searchData.authorName.value
    );
    handleState("newsState", filterBox);
  };

  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" onClick={() => Router.back()}>
        بازگشت
      </Button>
      <Box className={classes.container}>
        <Select
          className={classes.selecInput}
          placeholder="نام نویسنده"
          value={state.selectedOption}
          onChange={handleChange}
          options={state.options}
        />
        <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
          <DatePicker
            clearable
            okLabel="تأیید"
            cancelLabel="لغو"
            clearLabel="پاک کردن"
            labelFunc={date => (date ? date.format("jYYYY/jMM/jDD") : "")}
            value={state.selectedDate}
            onChange={e => handleState("selectedDate", e)}
          />
        </MuiPickersUtilsProvider>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleSearch();
          }}
        >
          جستجو
        </Button>
      </Box>
      <Box className={classes.container}>
        <TableContainer className={classes.table}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">ردیف</TableCell>
                <TableCell align="right">نام نویسنده</TableCell>
                <TableCell align="right">تاریخ</TableCell>
                <TableCell align="right">متن خبر</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.newsState.length > 0 &&
                state.newsState.map((row, index) => (
                  <TableRow hover key={index}>
                    <TableCell align="right">{index + 1}</TableCell>
                    <TableCell align="right">{row.authorName}</TableCell>
                    <TableCell align="right">{row.date}</TableCell>
                    <TableCell align="right">{row.body}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ThemeProvider>
  );
};

export default searchNews;
