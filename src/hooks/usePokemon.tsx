import {useCallback, useEffect, useRef, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {PokemonFull} from '../interfaces/pokemonInterfaces';

const usePokemon = (id: string) => {
  const isMounted = useRef(true);
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<PokemonFull>({} as PokemonFull);

  const loadPokemon = useCallback(async (pokemonId: string) => {
    const res = await pokemonApi.get<PokemonFull>(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
    );

    if (!isMounted.current) return;

    setPokemon(res.data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadPokemon(id);

    return () => {
      isMounted.current = false;
    };
  }, [id, loadPokemon]);

  return {isLoading, pokemon};
};

export default usePokemon;
