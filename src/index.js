import "mobx-react/batchingForReactDom";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StylesProvider } from "@material-ui/core/styles";
import { ThemeProvider } from "styled-components";
import theme from "./Styles/Theme";
import GlobalStyle from "./Styles/Global";
import { Provider as MobxProvider } from "mobx-react";
import appStore from "./Stores/AppStore";

ReactDOM.render(
  <MobxProvider appStore={appStore}>
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </StylesProvider>
  </MobxProvider>,
  document.getElementById("root")
);