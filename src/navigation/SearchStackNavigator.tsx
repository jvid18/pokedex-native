import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import PokemonScreen from '../screens/PokemonScreen';
import SearchScreen from '../screens/SearchScreen';
import {RootStackParams} from './HomeStackNavigator';

const Stack = createStackNavigator<RootStackParams>();

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={SearchScreen} />
      <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
    </Stack.Navigator>
  );
};

export default SearchStackNavigator;
