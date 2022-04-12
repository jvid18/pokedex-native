import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useColors} from '../context/theme/ThemeContext';
import useDebounceValue from '../hooks/useDebounceValue';

interface Props {
  onDebounce?: (value: string) => void;
  onChange?: (value: string) => void;
  style?: ViewStyle;
}

const SearchInput = ({style, onChange, onDebounce}: Props) => {
  const {card, textMuted} = useColors();
  const [textValue, setTextValue] = useState('');
  const debounceValue = useDebounceValue({input: textValue});

  useEffect(() => {
    onDebounce && onDebounce(debounceValue);
  }, [debounceValue]);

  return (
    <View style={{...styles.container, ...style}}>
      <View style={{...styles.textBackground, backgroundColor: card}}>
        <TextInput
          style={{...styles.textInput, color: textMuted}}
          placeholder="Search pokemon"
          placeholderTextColor={textMuted}
          autoCapitalize="none"
          autoCorrect={false}
          value={textValue}
          onChangeText={value => {
            setTextValue(value);
            onChange && onChange(value);
          }}
        />

        <Icon name="search-outline" size={20} color={textMuted} />
      </View>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {},
  textBackground: {
    paddingHorizontal: 13,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    height: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    top: 2,
  },
});
