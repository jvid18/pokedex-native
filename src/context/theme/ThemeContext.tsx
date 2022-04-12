import React, {createContext, useEffect, useReducer} from 'react';
import {useColorScheme, View} from 'react-native';
import {darkTheme, lightTheme} from '../../theme/appTheme';
import {setTheme} from './themeActions';
import themeReducer, {ThemeState} from './themeReducer';

export interface ThemeContext {
  theme: ThemeState;
  setTheme: (theme: 'dark' | 'light') => void;
}

export const ThemeContext = createContext({} as ThemeContext);

export const useTheme = () => React.useContext(ThemeContext);
export const useColors = () => useTheme().theme.colors;

export const ThemeProvider: React.FC = ({children}) => {
  const colorScheme = useColorScheme();
  const initialState: ThemeState =
    colorScheme === 'dark' ? darkTheme : lightTheme;

  const [theme, dispatch] = useReducer(themeReducer, initialState);

  const setThemeAction = setTheme(dispatch);

  useEffect(() => {
    if (colorScheme === theme.currentTheme) return;

    colorScheme === 'dark' ? setThemeAction('dark') : setThemeAction('light');
  }, [colorScheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: setThemeAction,
      }}>
      <View style={{flex: 1, backgroundColor: theme.colors.background}}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
};
