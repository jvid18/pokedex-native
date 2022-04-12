import {useCallback, useEffect, useRef, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {
  PaginationPokemon,
  PokemonPaginationResponse,
  SimplePokemon,
} from '../interfaces/pokemonInterfaces';

export interface PokemonPagination {
  initialOffset?: number;
  initialLimit?: number;
}

const usePokemonPagination = ({
  initialOffset = 0,
  initialLimit = 30,
}: PokemonPagination = {}) => {
  const isMounted = useRef(true);

  const [isLoading, setIsLoading] = useState(true);
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );
  const nextPageUrl = useRef(
    `https://pokeapi.co/api/v2/pokemon?offset=${initialOffset}&limit=${initialLimit}`,
  );

  const mapPokemonList = useCallback((pokemonList: PaginationPokemon[]) => {
    const newPokemonList: SimplePokemon[] = pokemonList.map(({name, url}) => {
      const [, id] = url.match(/\/(\d+)/)!;
      const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return {id, name, imgUrl};
    });

    if (!isMounted.current) return;

    setSimplePokemonList(prevList => [...prevList, ...newPokemonList]);
    setIsLoading(false);
  }, []);

  const loadMore = useCallback(async () => {
    const res = await pokemonApi.get<PokemonPaginationResponse>(
      nextPageUrl.current,
    );
    const {next} = res.data;
    nextPageUrl.current = next;

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
    isLoading,
    loadMore,
    simplePokemonList,
  };
};

export default usePokemonPagination;
