import React from 'react';
import {StyleSheet, Text as TextRN, TextStyle} from 'react-native';
import {useTheme} from '../../context/theme/ThemeContext';

interface Props {
  style?: TextStyle;
}

const Text: React.FC<Props> = ({children, style, ...rest}) => {
  const {theme} = useTheme();
  const {text: color} = theme.colors;

  return (
    <TextRN style={{...styles.text, color, ...style}} {...rest}>
      {children}
    </TextRN>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});

export default Text;
