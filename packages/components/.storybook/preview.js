import React from 'react';
import { ThemeProvider } from 'styled-components';

import { lightTheme, darkTheme } from './themes';

const withThemeProvider = (Story, context) => {
  const theme = context.globals.theme;
  const selectedTheme = theme === 'light' ? lightTheme : darkTheme;
  return (
    <ThemeProvider theme={selectedTheme}>
      <Story {...context} />
    </ThemeProvider>
  );
};
export const decorators = [withThemeProvider];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circle',
      items: ['light', 'dark']
    }
  }
};
