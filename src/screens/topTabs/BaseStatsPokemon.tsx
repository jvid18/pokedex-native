import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../../components/ui/Text';
import {usePokemonContext} from '../../context/pokemon/pokemonContext';
import useFocusTopTab from '../../hooks/useFocusTopTab';
import {RootTopTabParams} from '../../navigation/TopTabPokemonDetailsNavigator';

interface Props
  extends MaterialTopTabScreenProps<RootTopTabParams, 'BaseStatsPokemon'> {}

const BaseStatsPokemon = ({route}: Props) => {
  const {stats} = usePokemonContext().pokemonFull;
  const {setHeight} = route.params;
  const {setLayoutHeight} = useFocusTopTab(setHeight);

  const handleWidth = (value: number) => (value * 100) / 100;
  const handleBgColor = (stat: number) => {
    const percentage = handleWidth(stat);
    if (percentage < 15) {
      return '#FF0000';
    }
    if (percentage < 40) {
      return '#FFA500';
    }
    if (percentage < 70) {
      return '#E5E10B';
    }
    return '#34D314';
  };

  return (
    <View
      onLayout={e => {
        const {height} = e.nativeEvent.layout;
        setLayoutHeight(height);
      }}
      style={styles.container}>
      {stats.map(({base_stat, stat}, i) => (
        <View key={stat.name + i} style={styles.statItem}>
          <Text style={styles.statTitle}>
            {stat.name[0].toUpperCase() + stat.name.slice(1)}
          </Text>
          <Text style={styles.statValue}>{base_stat}</Text>
          <View style={styles.statLineContainer}>
            <View
              style={{
                ...styles.statLine,
                width: handleWidth(base_stat),
                backgroundColor: handleBgColor(base_stat),
              }}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  statTitle: {
    color: '#828282',
    flex: 2,
  },
  statValue: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  statLineContainer: {
    flex: 3,
    height: 2,
    backgroundColor: '#eee',
    borderRadius: 2,
    overflow: 'hidden',
  },
  statLine: {
    height: 2,
  },
});

export default BaseStatsPokemon;
