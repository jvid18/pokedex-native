import React from 'react';
import {ThemeProvider} from './src/context/theme/ThemeContext';
import BottomTabsNavigator from './src/navigation/BottomTabsNavigator';
import Navigator from './src/navigation/Navigator';

const App = () => {
  return (
    <ThemeProvider>
      <Navigator>
        <BottomTabsNavigator />
      </Navigator>
    </ThemeProvider>
  );
};

export default App;
