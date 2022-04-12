import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from '../context/theme/ThemeContext';
import {getImageColors} from '../helpers/getImageColors';
import usePokeballSource from '../hooks/usePokeballSource';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {RootStackParams} from '../navigation/HomeStackNavigator';
import FadeInImage from './ui/FadeInImage';
import Text from './ui/Text';

interface Props {
  pokemon: SimplePokemon;
}

type PokemonCardNavigationProps = StackNavigationProp<
  RootStackParams,
  'HomeScreen'
>;

const {width} = Dimensions.get('window');

const PokemonCard = ({pokemon}: Props) => {
  const isMounted = useRef(true);
  const {theme} = useTheme();
  const {shadow: shadowColor, card} = theme.colors;

  const navigation = useNavigation<PokemonCardNavigationProps>();

  const [backgroundColor, setBackgroundColor] = useState(card);
  const {colorScheme: source} = usePokeballSource();
  const {id, name, imgUrl} = pokemon;

  useEffect(() => {
    getImageColors(imgUrl, {defaultPrimaryColor: card}).then(colors => {
      if (!isMounted.current) return;

      setBackgroundColor(colors[0]);
      pokemon.color = colors[0];
    });

    return () => {
      isMounted.current = false;
    };
  }, [card, imgUrl, pokemon]);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate('PokemonScreen', {
          simplePokemon: pokemon,
        })
      }>
      <View style={{...styles.cardContainer, backgroundColor, shadowColor}}>
        <View>
          <Text style={styles.name}>
            {name[0].toUpperCase() + name.slice(1)}
          </Text>
          <Text style={styles.number}>Nro. {id.padStart(3, '0')}</Text>
        </View>
        <View style={styles.pokeballContainer}>
          <Image source={source} style={styles.pokeball} />
        </View>
        <FadeInImage uri={imgUrl} style={styles.pokemonImage} />
      </View>
    </TouchableOpacity>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
    height: width * 0.3,
    width: width * 0.42,
    paddingVertical: 5,
    paddingHorizontal: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  number: {
    color: '#fff',
  },
  pokeballContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: 'hidden',
  },
  pokeball: {
    position: 'absolute',
    width: 100,
    height: 100,
    bottom: -25,
    right: -20,
    opacity: 0.5,
  },
  pokemonImage: {
    position: 'absolute',
    width: 100,
    height: 100,
    right: -10,
    bottom: -10,
  },
});
