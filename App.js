import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, useColorScheme, Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './screens/MapScreen';
import ListScreen from './screens/ListScreen';
import DetailsScreen from './screens/DetailsScreen';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

function Details() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={() => ({headerShown: false})}>
      <Stack.Screen name="ListScreen" component={ListScreen}/>
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator> 
  )
}

export default function App() {

  const Tab = createBottomTabNavigator();

  /* const colourScheme = useColorScheme();
  const isDarkMode = colourScheme === "dark"; */

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='MapScreen'
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: [
            {
              bottom: 30,
              left: 10,
              right: 10,
              backgroundColor: "white",
              borderTopColor: "white",
              position: "absolute",
              borderRadius: 15,
              height: 70,
              tabBarShowLabel: "true",
              paddingBottom: 0,
              ...styles.shadow,},
            null,
          ],
          tabBarIcon: ({ focused }) => {
            let iconName;

            if (route.name === "MapScreenTab") {
              iconName = focused ? "map" : "map-outline"
            } else if (route.name === "ListScreenTab") {
              iconName = focused ? "list" : "list-outline"
            }   
            return (
              <Ionicons
                name={iconName}
                size={30}
                color={"#659136"}
                style={styles.icon}
              />
            );
          }
        })}
      >
        <Tab.Screen name="MapScreenTab" component={MapScreen} />
        <Tab.Screen name="ListScreenTab" component={Details} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5
  }
});