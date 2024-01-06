/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {
  ViroARScene,
  ViroText,
  ViroTrackingStateConstants,
  ViroARSceneNavigator,
  ViroARTrackingReasonConstants
} from '@viro-community/react-viro';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider, extendTheme } from 'native-base';
import LoginScreen from './src/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import SceneNames from './src/navigation/SceneNames';
import CoursesScreen from './src/screens/CoursesScreen';
import CaseFirstScreen from './src/screens/CaseFirstScreen';
import CaseFinishScreen from './src/screens/CaseFinishScreen';

// const HelloWorldSceneAR = () => {
//   const [text, setText] = useState('Initializing AR...');

//   function onInitialized(state: any, reason: any) {
//     console.log('guncelleme', state, reason);
//     if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
//       setText('Hello World!');
//     }
//     // else if (state === ViroConstants.TRACKING_NONE) {
//     //   // Handle loss of tracking
//     // }
//   }

//   return (
//     <ViroARScene onTrackingUpdated={onInitialized}>
//       <ViroText
//         text={text}
//         scale={[0.5, 0.5, 0.5]}
//         position={[0, 0, -1]}
//         style={styles.helloWorldTextStyle}
//       />
//     </ViroARScene>
//   );
// };

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
    // <ViroARSceneNavigator
    //   autofocus={true}
    //   initialScene={{
    //     scene: HelloWorldSceneAR,
    //   }}
    //   style={styles.f1}
    // />
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
