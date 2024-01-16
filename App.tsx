/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  StyleSheet,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider, extendTheme } from 'native-base';
import LoginScreen from './src/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import SceneNames from './src/navigation/SceneNames';
import CoursesScreen from './src/screens/CoursesScreen';
import CaseFirstScreen from './src/screens/CaseFirstScreen';
import CaseFinishScreen from './src/screens/CaseFinishScreen';
import PasScreen from './src/screens/PasScreen';
import WoundsScreen from './src/screens/WoundsScreen';
import ViroScreen from './src/screens/ViroScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from 'reactotron-react-native';

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();

  const authScreens = () => (
    <>

      <Stack.Screen
        name={SceneNames.LoginScreen}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SceneNames.CoursesScreen}
        component={CoursesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SceneNames.CaseFirstScreen}
        component={CaseFirstScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SceneNames.CaseFinishScreen}
        component={CaseFinishScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SceneNames.WoundsScreen}
        component={WoundsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SceneNames.PasScreen}
        component={PasScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SceneNames.ViroScreen}
        component={ViroScreen}
        options={{ headerShown: false }}
      />
    </>
  );
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {authScreens()}
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>

  );
}

const styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default App;
