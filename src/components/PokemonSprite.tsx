import React from 'react';
import {StyleSheet, View} from 'react-native';
import FadeInImage from './ui/FadeInImage';

interface Props {
  picture: string;
}

const PokemonSprite = ({picture}: Props) => {
  return (
    <View style={styles.spriteContainer}>
      <FadeInImage uri={picture} style={styles.sprite} />
    </View>
  );
};

export default PokemonSprite;

const styles = StyleSheet.create({
  spriteContainer: {},
  sprite: {
    width: 100,
    height: 100,
  },
});
