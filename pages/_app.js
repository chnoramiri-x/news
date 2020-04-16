/*



                      ****** Don't delete anything from this page ******



*/

import React from "react";
import App from "next/app";
import Head from "next/head";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/styles";
import NewsProvider, { NewsConsumer } from "../components/NewsProvider";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

export default class MyApp extends App {
  state = {
    user: null
  };

  componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>News</title>
          <style global jsx>{`
            body {
              font-family: "Lalezar", cursive !important;
            }
          `}</style>
        </Head>
        <StylesProvider jss={jss}>
          <NewsProvider>
            <NewsConsumer>
              {props => {
                return <Component {...pageProps} news={props} />;
              }}
            </NewsConsumer>
          </NewsProvider>
        </StylesProvider>
      </React.Fragment>
    );
  }
}
