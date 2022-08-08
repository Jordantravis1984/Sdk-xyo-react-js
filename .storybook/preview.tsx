import { InvertableThemeProvider } from '@xylabs/react-invertable-theme'
import { FlexCol } from '@xylabs/react-flexbox'
import { CssBaseline } from '@mui/material';
import { useDarkMode } from 'storybook-dark-mode';
import { partialDarkThemeOptions, themeOptions } from '@xyo-network/react-theme'
import { AppSettingsProvider } from '@xyo-network/react-app-settings'
import React from 'react';


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      method: 'alphabetical'
    }
  }
}

const withThemeProvider = (Story, context) => {
  // Clear the auth state with each story
  localStorage.setItem('AuthState', '')

  const darkMode = useDarkMode()

  return (
    <AppSettingsProvider value={{darkMode}}>
    <InvertableThemeProvider dark={darkMode} darkTheme={partialDarkThemeOptions} options={themeOptions}>
      <CssBaseline enableColorScheme />
      <FlexCol alignItems="unset">
        <Story {...context}/>
      </FlexCol>
    </InvertableThemeProvider>
    </AppSettingsProvider>
  );
};

export const decorators = [withThemeProvider];