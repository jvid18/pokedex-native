import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import PokemonCard from '../components/PokemonCard';
import SearchInput from '../components/SearchInput';
import Loading from '../components/ui/Loading';
import Text from '../components/ui/Text';
import usePokemonSearch from '../hooks/usePokemonSearch';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';

const {width} = Dimensions.get('window');

const SearchScreen = () => {
  const {top} = useSafeAreaInsets();
  const {isFetching, simplePokemonList} = usePokemonSearch();

  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);
  const [term, setTerm] = useState('');

  useEffect(() => {
    if (!term) {
      return setPokemonFiltered([]);
    }

    setPokemonFiltered(
      simplePokemonList.filter(({id, name}) => {
        const loweredName = name.toLowerCase();
        return loweredName.includes(term.toLowerCase()) || id === term;
      }),
    );
  }, [term]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <SearchInput
        onDebounce={setTerm}
        style={{...styles.search, top: top + 10}}
      />

      <View style={{marginHorizontal: width * 0.04 - 5}}>
        <FlatList
          data={pokemonFiltered}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({item}) => <PokemonCard pokemon={item} />}
          ListHeaderComponent={
            <Text style={{...styles.title, marginTop: top + 60}}>
              {term && !pokemonFiltered.length
                ? 'Not found'
                : term
                ? `${pokemonFiltered.length} results for "${term}"`
                : ''}
            </Text>
          }
        />
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  title: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  search: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 15,
    zIndex: 1,
  },
});
