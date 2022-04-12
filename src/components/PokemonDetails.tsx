import React, {useEffect, useRef} from 'react';
import {ActivityIndicator, Animated, Easing, StyleSheet} from 'react-native';
import {usePokemonContext} from '../context/pokemon/pokemonContext';
import {useColors} from '../context/theme/ThemeContext';
import useAnimation from '../hooks/useAnimation';
import TopTabPokemonDetailsNavigator from '../navigation/TopTabPokemonDetailsNavigator';

interface Props {
  minHeight?: number;
}

const PokemonDetails = ({minHeight}: Props) => {
  const isMounted = useRef(true);
  const {isLoading, simplePokemon} = usePokemonContext();
  const {color} = simplePokemon;

  const {background} = useColors();
  const {opacity, position, fadeIn, startTransition} = useAnimation({
    initialPosition: 200,
  });

  useEffect(() => {
    if (!isMounted.current) return;

    fadeIn({duration: 300});
    startTransition({toValue: 0, duration: 300, easing: Easing.linear});

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <Animated.View
      style={{
        ...styles.container,
        minHeight,
        backgroundColor: background,
        opacity,
        transform: [{translateY: position}],
      }}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={color}
          style={styles.loadingContainer}
        />
      ) : (
        <TopTabPokemonDetailsNavigator
          navigatorStyle={{...styles.navigator, backgroundColor: background}}
        />
      )}
    </Animated.View>
  );
};

export default PokemonDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navigator: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 10,
    elevation: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    marginHorizontal: 20,
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  regularText: {
    fontSize: 18,
  },
  horizontalList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontalWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeContainer: {
    marginRight: 10,
  },
  typeName: {
    fontSize: 18,
  },
  spriteContainer: {
    left: -10,
  },
  sprite: {
    width: 100,
    height: 35,
  },
  statsContainer: {
    flexDirection: 'row',
  },
  statName: {
    width: 150,
  },
  statBase: {
    fontWeight: 'bold',
  },
});
