import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import {Cat, CatList} from './src/screens/dsc';
import {COL_DARK_PR, COL_DARK_SC} from '@env';
import Detail from './src/screens/dsc/Detail';

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
            headerTitle: 'Semua Kategori Lokasi',
            headerStyle: {backgroundColor: COL_DARK_SC},
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="DscCatListScreen"
          component={CatList}
          options={({route}) => ({
            title: route.params.name,
            headerStyle: {backgroundColor: COL_DARK_SC},
            headerTitleAlign: 'left',
            headerTintColor: 'white',
          })}
        />
        <Stack.Screen
          name="DscDetailScreen"
          component={Detail}
          options={({route}) => ({
            title: route.params.name,
            headerStyle: {backgroundColor: COL_DARK_SC},
            headerTitleAlign: 'left',
            headerTintColor: 'white',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
