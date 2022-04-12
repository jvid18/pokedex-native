import React, {useEffect} from 'react';
import {Platform, Switch} from 'react-native';
import {useTheme} from '../../context/theme/ThemeContext';

const ThemeSwitch = () => {
  const {theme, setTheme} = useTheme();
  const [isEnabled, setIsEnabled] = React.useState(theme.dark);

  const toggleSwitch = () => {
    if (isEnabled === theme.dark) {
      setTheme(isEnabled ? 'light' : 'dark');
    }

    setIsEnabled(!isEnabled);
  };

  useEffect(() => {
    setIsEnabled(theme.dark);
  }, [theme.dark]);

  const thumbColor = isEnabled ? '#FFF' : '#F0D278';
  return (
    <Switch
      trackColor={{false: '#76CAF5', true: '#4A42B4'}}
      thumbColor={Platform.OS === 'android' ? thumbColor : ''}
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  );
};

export default ThemeSwitch;
