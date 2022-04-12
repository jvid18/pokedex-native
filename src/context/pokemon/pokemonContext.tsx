import React, {createContext} from 'react';
import usePokemon from '../../hooks/usePokemon';
import {PokemonFull, SimplePokemon} from '../../interfaces/pokemonInterfaces';

interface PokemonState {
  isLoading: boolean;
  pokemonFull: PokemonFull;
  simplePokemon: SimplePokemon;
}

interface ProviderProps {
  simplePokemon: SimplePokemon;
}

export const PokemonContext = createContext({} as PokemonState);

export const usePokemonContext = () => React.useContext(PokemonContext);

export const PokemonProvider: React.FC<ProviderProps> = ({
  simplePokemon,
  children,
}) => {
  const {isLoading, pokemon} = usePokemon(simplePokemon.id);

  return (
    <PokemonContext.Provider
      value={{
        isLoading,
        simplePokemon: simplePokemon,
        pokemonFull: pokemon,
      }}>
      {children}
    </PokemonContext.Provider>
  );
};
