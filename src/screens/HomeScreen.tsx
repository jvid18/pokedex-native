import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import PokemonCard from '../components/PokemonCard';
import SafeArea from '../components/ui/SafeArea';
import Text from '../components/ui/Text';
import ThemeSwitch from '../components/ui/ThemeSwitch';
import {useTheme} from '../context/theme/ThemeContext';
import usePokeballSource from '../hooks/usePokeballSource';
import usePokemonPagination from '../hooks/usePokemonPagination';

const HomeScreen = () => {
  const {theme} = useTheme();

  const {simplePokemonList, loadMore} = usePokemonPagination();
  const {colorScheme: source} = usePokeballSource();

  return (
    <SafeArea safeTop={10}>
      <Image source={source} style={styles.pokeballBg} />
      <View style={styles.wrapper}>
        <FlatList
          data={simplePokemonList}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({item}) => <PokemonCard pokemon={item} />}
          ListHeaderComponent={
            <View style={styles.switch}>
              <Text style={styles.title}>Pokedex</Text>
              <ThemeSwitch />
            </View>
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            <ActivityIndicator size="large" color={theme.colors.primary} />
          }
        />
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  pokeballBg: {
    position: 'absolute',
    width: 300,
    height: 300,
    top: -120,
    right: -120,
    opacity: 0.2,
  },
  switch: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginBottom: 20,
  },
  wrapper: {
    alignItems: 'center',
  },
});

export default HomeScreen;
