import {useCallback, useEffect, useRef, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {MoveResponse, SimpleMove} from '../interfaces/moveInterfaces';
import {Move} from '../interfaces/pokemonInterfaces';

interface MovesTypes {
  special: SimpleMove[];
  physical: SimpleMove[];
  status: SimpleMove[];
}

const useMoves = (moves: Move[]) => {
  const isMounted = useRef(true);
  const [isLoading, setIsLoading] = useState(true);
  const [moveTypes, setMoveTypes] = useState<MovesTypes>({} as MovesTypes);

  const mapMoveFull = useCallback((moveFull: MoveResponse) => {
    const {name, accuracy, power, damage_class, type} = moveFull;
    const simpleMove: SimpleMove = {
      name,
      accuracy,
      power,
      type: type.name,
    };

    return {simpleMove, type: damage_class.name};
  }, []);

  const loadMoves = useCallback(async () => {
    const movesFull = await Promise.all(
      moves.map(({move}) => {
        return pokemonApi.get<MoveResponse>(move.url);
      }),
    );

    if (!isMounted.current) return;

    const newSpecial: SimpleMove[] = [];
    const newPhysical: SimpleMove[] = [];
    const newStatus: SimpleMove[] = [];

    movesFull.forEach(({data}) => {
      if (!isMounted.current) return;

      const {simpleMove, type} = mapMoveFull(data);

      if (type === 'special') {
        newSpecial.push(simpleMove);
      }

      if (type === 'physical') {
        newPhysical.push(simpleMove);
      }

      if (type === 'status') {
        newStatus.push(simpleMove);
      }
    });

    if (!isMounted.current) return;

    setMoveTypes({
      special: newSpecial,
      physical: newPhysical,
      status: newStatus,
    });
    setIsLoading(false);
  }, [mapMoveFull, moves]);

  useEffect(() => {
    loadMoves();

    return () => {
      isMounted.current = false;
    };
  }, [loadMoves]);

  return {
    isLoading,
    moveTypes,
  };
};

export default useMoves;
