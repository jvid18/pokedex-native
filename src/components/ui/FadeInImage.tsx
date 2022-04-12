import React, {useState} from 'react';
import {ActivityIndicator, Animated, ImageStyle} from 'react-native';
import {useTheme} from '../../context/theme/ThemeContext';
import useAnimation from '../../hooks/useAnimation';

interface Props {
  uri: string;
  style?: ImageStyle;
}

const FadeInImage = ({uri, style}: Props) => {
  const {
    theme: {colors},
  } = useTheme();

  const {opacity, fadeIn} = useAnimation();
  const [isLoading, setIsLoading] = useState(true);

  const handleFinishLoading = () => {
    setIsLoading(false);
    fadeIn({duration: 500});
  };

  return (
    <>
      {isLoading && (
        <ActivityIndicator size={30} color={colors.primary} style={style} />
      )}
      <Animated.Image
        source={{uri}}
        onLoadEnd={handleFinishLoading}
        style={{opacity, ...style}}
      />
    </>
  );
};

export default FadeInImage;
