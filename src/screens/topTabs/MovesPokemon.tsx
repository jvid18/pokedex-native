import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import MoveCard from '../../components/MoveCard';
import Text from '../../components/ui/Text';
import {usePokemonContext} from '../../context/pokemon/pokemonContext';
import useFocusTopTab from '../../hooks/useFocusTopTab';
import useMoves from '../../hooks/useMoves';
import {RootTopTabParams} from '../../navigation/TopTabPokemonDetailsNavigator';

interface Props
  extends MaterialTopTabScreenProps<RootTopTabParams, 'BaseStatsPokemon'> {}

const MovesPokemon = ({route}: Props) => {
  const {
    pokemonFull: {moves},
    simplePokemon: {color},
  } = usePokemonContext();

  const {isLoading, moveTypes} = useMoves(moves);

  const {setHeight} = route.params;
  const {setLayoutHeight} = useFocusTopTab(setHeight);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={color} />
      </View>
    );
  }

  return (
    <View
      onLayout={e => {
        const {height} = e.nativeEvent.layout;
        setLayoutHeight(height);
      }}
      style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Special</Text>
        {moveTypes.special.map((move, i) => (
          <MoveCard key={move.name + i} move={move} />
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Physical</Text>
        {moveTypes.physical.map((move, i) => (
          <MoveCard key={move.name + i} move={move} />
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Status</Text>
        {moveTypes.status.map((move, i) => (
          <MoveCard key={move.name + i} move={move} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 50,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MovesPokemon;
