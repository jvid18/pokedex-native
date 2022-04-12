import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../../components/ui/Text';
import {usePokemonContext} from '../../context/pokemon/pokemonContext';
import useFocusTopTab from '../../hooks/useFocusTopTab';
import {RootTopTabParams} from '../../navigation/TopTabPokemonDetailsNavigator';

interface Props
  extends MaterialTopTabScreenProps<RootTopTabParams, 'AboutPokemon'> {}

const AboutPokemon = ({route}: Props) => {
  const {setHeight} = route.params;
  const {height, species, weight, abilities} = usePokemonContext().pokemonFull;
  const {setLayoutHeight} = useFocusTopTab(setHeight);

  return (
    <View
      onLayout={e => {
        const {height: layoutHeight} = e.nativeEvent.layout;
        setLayoutHeight(layoutHeight);
      }}
      style={styles.container}>
      <View style={styles.generalInfoContainer}>
        <View style={styles.generalInfoItem}>
          <Text style={styles.generalIntoTitle}>Species</Text>
          <Text style={styles.generalInfoValue}>{species.name}</Text>
        </View>
        <View style={styles.generalInfoItem}>
          <Text style={styles.generalIntoTitle}>Height</Text>
          <Text style={styles.generalInfoValue}>{height * 10} cm</Text>
        </View>
        <View style={styles.generalInfoItem}>
          <Text style={styles.generalIntoTitle}>Weight</Text>
          <Text style={styles.generalInfoValue}>{weight / 10} Kg</Text>
        </View>
        <View style={styles.generalInfoItem}>
          <Text style={styles.generalIntoTitle}>Abilities</Text>
          <Text style={styles.generalInfoValue}>
            {abilities.map(({ability}) => ability.name).join(', ')}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  generalInfoContainer: {
    marginTop: 20,
  },
  generalInfoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  generalIntoTitle: {
    color: '#828282',
    flex: 1,
  },
  generalInfoValue: {
    fontWeight: 'bold',
    flex: 2,
  },
});

export default AboutPokemon;
