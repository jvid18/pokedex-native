import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useState} from 'react';
import {LogBox, ViewStyle} from 'react-native';
import {usePokemonContext} from '../context/pokemon/pokemonContext';
import {useColors} from '../context/theme/ThemeContext';
import AboutPokemon from '../screens/topTabs/AboutPokemon';
import BaseStatsPokemon from '../screens/topTabs/BaseStatsPokemon';
import MovesPokemon from '../screens/topTabs/MovesPokemon';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export type RootTopTabParams = {
  AboutPokemon: {
    setHeight: (height: number) => void;
  };
  BaseStatsPokemon: {
    setHeight: (height: number) => void;
  };
  MovesPokemon: {
    setHeight: (height: number) => void;
  };
  EvolutionPokemon: {
    setHeight: (height: number) => void;
  };
};

interface Props {
  navigatorStyle?: ViewStyle;
}

const TopTab = createMaterialTopTabNavigator<RootTopTabParams>();

const TopTabPokemonDetailsNavigator = ({navigatorStyle}: Props) => {
  const {background} = useColors();
  const [childHeight, setChildHeight] = useState(0);
  const {
    simplePokemon: {color},
  } = usePokemonContext();

  return (
    <TopTab.Navigator
      style={{...navigatorStyle, height: childHeight}}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: background,
          elevation: 0,
          shadowColor: 'transparent',
          borderBottomWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 11,
        },
        tabBarIndicatorStyle: {
          backgroundColor: color,
          height: 2.5,
          borderRadius: 5,
        },
        tabBarPressColor: 'transparent',
      }}>
      <TopTab.Screen
        name="AboutPokemon"
        options={{title: 'About'}}
        component={AboutPokemon}
        initialParams={{
          setHeight: setChildHeight,
        }}
      />
      <TopTab.Screen
        name="BaseStatsPokemon"
        options={{title: 'Base Stats'}}
        component={BaseStatsPokemon}
        initialParams={{setHeight: setChildHeight}}
      />
      {/* <TopTab.Screen
        name="EvolutionPokemon"
        options={{title: 'Evolutions'}}
        component={EvolutionPokemon}
        initialParams={{setHeight: setChildHeight}}
      /> */}
      <TopTab.Screen
        name="MovesPokemon"
        options={{title: 'Moves'}}
        component={MovesPokemon}
        initialParams={{setHeight: setChildHeight}}
      />
    </TopTab.Navigator>
  );
};

export default TopTabPokemonDetailsNavigator;
