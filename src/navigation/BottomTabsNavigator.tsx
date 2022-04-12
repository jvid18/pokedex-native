import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useColors} from '../context/theme/ThemeContext';
import HomeStackNavigator from './HomeStackNavigator';
import SearchStackNavigator from './SearchStackNavigator';

const Tab = createBottomTabNavigator();

const BottomTabsNavigator = () => {
  const {primary} = useColors();

  const handleIconOutline = (name: string, focused: boolean) => {
    const icon = `${name}${!focused ? '-outline' : ''}`;
    return <Icon name={icon} color={primary} size={25} />;
  };

  return (
    <Tab.Navigator
      sceneContainerStyle={styles.scene}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarActiveTintColor: primary,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}>
      <Tab.Screen
        name="HomeStackNavigator"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => handleIconOutline('list', focused),
        }}
        component={HomeStackNavigator}
      />
      <Tab.Screen
        name="SearchStackNavigator"
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({focused}) => handleIconOutline('search', focused),
        }}
        component={SearchStackNavigator}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  scene: {},
  tabBar: {
    elevation: 0,
    borderWidth: 0,
    borderColor: 'transparent',
    shadowColor: 'transparent',
    height: 60,
    paddingTop: 5,
    paddingBottom: 10,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  tabBarLabel: {
    // marginBottom: 15,
  },
});

export default BottomTabsNavigator;
