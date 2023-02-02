import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import {Cat, CatList} from './src/screens/dsc';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="HomeScreen"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DscCatScreen"
          component={Cat}
          options={{
            headerTitle: '',
            headerStyle: {backgroundColor: 'mediumseagreen'},
          }}
        />
        <Stack.Screen name="DscCatListScreen" component={CatList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
