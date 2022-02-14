import React from "react";

import { addDecorator } from "@storybook/react";
import { CssBaseline, StylesProvider, ThemeProvider } from "@material-ui/core";

import { theme } from "../src/theme";
import { BreakpointsProvider } from "../src/hooks/useBreakpoints";

const MUIDecorator = (story) => (
  <ThemeProvider theme={theme}>
    <StylesProvider>
      <CssBaseline />
      <BreakpointsProvider>
        {story()}
      </BreakpointsProvider>
    </StylesProvider>
  </ThemeProvider>
);

addDecorator(MUIDecorator);

export const parameters = { layout: "fullscreen" };
