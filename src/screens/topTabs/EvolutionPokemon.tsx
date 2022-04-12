import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import React from 'react';
import {Text, View} from 'react-native';
import useFocusTopTab from '../../hooks/useFocusTopTab';
import {RootTopTabParams} from '../../navigation/TopTabPokemonDetailsNavigator';

interface Props
  extends MaterialTopTabScreenProps<RootTopTabParams, 'BaseStatsPokemon'> {}

const EvolutionPokemon = ({route}: Props) => {
  const {setHeight} = route.params;
  const {setLayoutHeight} = useFocusTopTab(setHeight);

  return (
    <View
      onLayout={e => {
        const {height} = e.nativeEvent.layout;
        setLayoutHeight(height);
      }}>
      <Text>Evolutions</Text>
    </View>
  );
};

export default EvolutionPokemon;
