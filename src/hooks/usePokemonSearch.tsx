import {useCallback, useEffect, useRef, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {
  PaginationPokemon,
  PokemonPaginationResponse,
  SimplePokemon,
} from '../interfaces/pokemonInterfaces';

const usePokemonSearch = () => {
  const isMounted = useRef(true);

  const [isFetching, setIsFetching] = useState(true);
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );

  const mapPokemonList = useCallback((pokemonList: PaginationPokemon[]) => {
    const newPokemonList: SimplePokemon[] = pokemonList.map(({name, url}) => {
      const [, id] = url.match(/\/(\d+)/)!;
      const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return {id, name, imgUrl};
    });

    if (!isMounted.current) return;

    setSimplePokemonList(newPokemonList);
    setIsFetching(false);
  }, []);

  const loadMore = useCallback(async () => {
    const res = await pokemonApi.get<PokemonPaginationResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=2000',
    );

    if (!isMounted.current) return;

    mapPokemonList(res.data.results);
  }, [mapPokemonList]);

  useEffect(() => {
    loadMore();

    return () => {
      isMounted.current = false;
    };
  }, [loadMore]);

  return {
    isFetching,
    simplePokemonList,
  };
};

export default usePokemonSearch;
