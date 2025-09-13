import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Details from '../screens/Details';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useColorScheme } from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: isDark ? '#fff' : '#000',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Details"
        component={Details}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="info" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;