import {useTheme} from '../context/theme/ThemeContext';

const usePokeballSource = () => {
  const {theme} = useTheme();
  const sources = {
    light: require('../assets/images/pokeball-light.png'),
    dark: require('../assets/images/pokeball-dark.png'),
  };
  return {...sources, colorScheme: sources[theme.currentTheme]};
};

export default usePokeballSource;
