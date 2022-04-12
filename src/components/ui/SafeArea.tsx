import React from 'react';
import {View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  safeTop?: number;
  safeBottom?: number;
  safeLeft?: number;
  safeRight?: number;
  style?: ViewStyle;
}

const SafeArea: React.FC<Props> = ({
  children,
  safeTop,
  safeLeft,
  safeBottom,
  safeRight,
  style,
}) => {
  const {top, left, bottom, right} = useSafeAreaInsets();
  const newStyles: ViewStyle = {
    flex: 1,
    ...style,
    marginTop: safeTop && top + safeTop,
    marginLeft: safeLeft && left + safeLeft,
    marginRight: safeBottom && bottom + safeBottom,
    marginBottom: safeRight && right + safeRight,
  };

  return <View style={newStyles}>{children}</View>;
};

export default SafeArea;
