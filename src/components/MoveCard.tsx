import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useColors} from '../context/theme/ThemeContext';
import {SimpleMove} from '../interfaces/moveInterfaces';
import Text from './ui/Text';

enum MoveTypeColor {
  water = '#00B4FF',
  grass = '#7CB342',
  fire = '#FF5722',
  electric = '#FFD600',
  ground = '#BDBDBD',
  rock = '#795548',
  poison = '#9C27B0',
  bug = '#8BC34A',
  dragon = '#2196F3',
  ghost = '#607D8B',
  dark = '#212121',
  steel = '#B0BEC5',
  fairy = '#FFCDD2',
  normal = '#9E9E9E',
  fighting = '#F44336',
  psychic = '#E91E63',
  flying = '#3F51B5',
  ice = '#00BCD4',
}

interface Props {
  move: SimpleMove;
}

const MoveCard = ({move}: Props) => {
  const {name, type, accuracy, power} = move;
  const {card, shadow} = useColors();

  return (
    <View
      style={{...styles.card, backgroundColor: card, shadowColor: shadow}}
      key={name}>
      <View style={styles.row}>
        <View style={styles.row}>
          <View
            style={{
              ...styles.cardBullet,
              backgroundColor: MoveTypeColor[type] ?? '#000',
            }}
          />
          <Text>{type[0].toUpperCase() + type.slice(1)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cardLabel}>Accuracy:</Text>
          <Text style={styles.cardValue}>{accuracy}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.cardTitle}>
          {name[0].toUpperCase() + name.slice(1).replace('-', ' ')}
        </Text>
        <View style={styles.row}>
          <Text style={styles.cardLabel}>Power:</Text>
          <Text style={styles.cardValue}>{power}</Text>
        </View>
      </View>
    </View>
  );
};

export default MoveCard;

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  cardLabel: {
    fontSize: 14,
    color: '#828282',
  },
  cardValue: {
    width: 35,
    fontWeight: '500',
    textAlign: 'right',
  },
  cardBullet: {
    width: 10,
    height: 10,
    borderRadius: 100,
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
