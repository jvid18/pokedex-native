import {ThemeState} from '../context/theme/themeReducer';
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  textMuted: string;
  border: string;
  card: string;
  notification: string;
  shadow: string;
}

export const darkColors: ThemeColors = {
  primary: '#2196f3',
  secondary: '#1976d2',
  background: '#212121',
  text: '#fff',
  textMuted: '#A4A4A4',
  border: '#424242',
  card: '#3A3A3A',
  notification: '#ff9800',
  shadow: '#424242',
};

export const lightColors: ThemeColors = {
  primary: '#2196f3',
  secondary: '#1976d2',
  background: '#fff',
  text: '#212121',
  textMuted: '#989898',
  border: '#e0e0e0',
  card: '#fff',
  notification: '#ff9800',
  shadow: '#212121',
};

export const darkTheme: ThemeState = {
  dark: true,
  statusBar: 'light-content',
  currentTheme: 'dark',
  colors: darkColors,
};

export const lightTheme: ThemeState = {
  dark: false,
  statusBar: 'dark-content',
  currentTheme: 'light',
  colors: lightColors,
};
