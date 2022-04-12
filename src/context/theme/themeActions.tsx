import {Dispatch} from 'react';
import {darkTheme, lightTheme} from '../../theme/appTheme';
import {ThemeState} from './themeReducer';

export type ThemeActions =
  | {type: '@theme/dark'; payload: ThemeState}
  | {type: '@theme/light'; payload: ThemeState};

export const setTheme =
  (dispatch: Dispatch<ThemeActions>) => (theme: 'dark' | 'light') => {
    const newTheme = theme === 'dark' ? darkTheme : lightTheme;

    dispatch({type: `@theme/${theme}`, payload: newTheme});
  };
