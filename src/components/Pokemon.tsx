import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import PokemonDetails from '../components/PokemonDetails';
import FadeInImage from '../components/ui/FadeInImage';
import Text from '../components/ui/Text';
import {usePokemonContext} from '../context/pokemon/pokemonContext';
import usePokeballSource from '../hooks/usePokeballSource';

const {height, width} = Dimensions.get('window');

const Pokemon = () => {
  const isMounted = useRef(true);
  const navigation = useNavigation();
  const {simplePokemon} = usePokemonContext();
  const {name, id, imgUrl, color} = simplePokemon;

  const {dark: source} = usePokeballSource();
  const {top} = useSafeAreaInsets();

  useEffect(
    () => () => {
      isMounted.current = false;
    },
    [],
  );

  return (
    <ScrollView
      style={{...styles.container, backgroundColor: color}}
      showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={{...styles.navbar, marginTop: top + 5}}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => isMounted.current && navigation.goBack()}
            style={{...styles.backButton}}>
            <Icon name="arrow-back-outline" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.hero}>
          <View>
            <Text style={styles.title}>
              {name[0].toUpperCase() + name.slice(1)}
            </Text>
          </View>
          <Text style={styles.number}>#{id.padStart(3, '0')}</Text>
        </View>

        <FadeInImage uri={imgUrl} style={styles.pokemonImage} />
      </View>
      <Image source={source} style={styles.pokeball} />
      <PokemonDetails minHeight={height * 0.57} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 30,
    alignItems: 'center',
    height: height * 0.4,
    zIndex: 1,
  },
  headerContainer: {},
  navbar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  hero: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {},
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  number: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  pokemonName: {
    fontSize: 40,
  },
  pokeball: {
    position: 'absolute',
    width: 250,
    height: 250,
    opacity: 0.4,
    left: width * 0.4,
    top: height * 0.15,
  },
  pokemonImage: {
    position: 'absolute',
    width: 230,
    height: 210,
    bottom: -25,
    zIndex: 1,
  },
});

export default Pokemon;
