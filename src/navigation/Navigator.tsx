import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {useTheme} from '../context/theme/ThemeContext';

const Navigator: React.FC = ({children}) => {
  const {theme} = useTheme();
  const {background} = theme.colors;

  return (
    <NavigationContainer theme={theme}>
      <StatusBar
        backgroundColor={background}
        barStyle={theme.statusBar}
        translucent
      />
      {children}
    </NavigationContainer>
  );
};

export default Navigator;
