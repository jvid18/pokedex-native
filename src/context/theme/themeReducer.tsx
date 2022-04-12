import {Theme} from '@react-navigation/native';
import {StatusBarStyle} from 'react-native';
import {ThemeColors} from '../../theme/appTheme';
import {ThemeActions} from './themeActions';

export interface ThemeState extends Theme {
  currentTheme: 'dark' | 'light';
  statusBar: StatusBarStyle;
  colors: ThemeColors;
}

const themeReducer = (state: ThemeState, action: ThemeActions): ThemeState => {
  // console.log(JSON.stringify(state, null, 2));

  switch (action.type) {
    case '@theme/dark':
      return {
        ...state,
        currentTheme: 'dark',
        statusBar: 'light-content',
        dark: true,
        colors: {
          ...state.colors,
          ...action.payload.colors,
        },
      };
    case '@theme/light':
      return {
        ...state,
        currentTheme: 'light',
        statusBar: 'dark-content',
        dark: false,
        colors: {
          ...state.colors,
          ...action.payload.colors,
        },
      };
    default:
      return state;
  }
};

export default themeReducer;
