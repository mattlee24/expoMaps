import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, useColorScheme, Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from './screens/MapScreen';
import ListScreen from './screens/ListScreen';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';


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

            if (route.name === "MapScreen") {
              iconName = focused ? "map" : "map-outline"
            } else if (route.name === "ListScreen") {
              iconName = focused ? "list" : "list-outline"
            }   
            return (
              <Ionicons
                name={iconName}
                size={25}
                color={"blue"}
                style={styles.icon}
              />
            );
          }
        })}
      >
        <Tab.Screen name="MapScreen" component={MapScreen} />
        <Tab.Screen name="ListScreen" component={ListScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    
  },
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