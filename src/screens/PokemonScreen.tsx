import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import Pokemon from '../components/Pokemon';
import {PokemonProvider} from '../context/pokemon/pokemonContext';
import {RootStackParams} from '../navigation/HomeStackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

const PokemonScreen = ({route}: Props) => {
  const {simplePokemon} = route.params;

  return (
    <PokemonProvider simplePokemon={simplePokemon}>
      <Pokemon />
    </PokemonProvider>
  );
};

export default PokemonScreen;
