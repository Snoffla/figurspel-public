import 'react-native-gesture-handler';

import React, { useState} from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';

import { createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import { SafeAreaProvider} from 'react-native-safe-area-context';

import {ThemeProvider} from 'react-native-elements';
import {NavigationTheme, MainTheme} from './theme/light';


import GameScreen from './GameScreen';
import StartScreen from './StartScreen';
import ResultScreen from './ResultScreen';
import RegisterResultScreen from './RegisterResultScreen';

const Stack = createStackNavigator();

export default function App() {
  const [theme, setTheme] = useState(NavigationTheme);
  
  return (
  <SafeAreaProvider style={[styles.safeAreaContainer, {backgroundColor: theme.background}]}>
    
    <NavigationContainer theme={theme}>
      <ThemeProvider theme={MainTheme}>
        <Stack.Navigator
          screenOptions={({ route, navigation }) => ({
            gestureEnabled: true,
            cardOverlayEnabled: false,
            ...TransitionPresets.SlideFromRightIOS
          })}

          mode = 'modal'
        >
          <Stack.Screen 
            name="Start" 
            component={StartScreen} 
            options={{ 
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="Figurspel" 
            component={GameScreen} 
            options={{ 
              title: '',
              headerBackTitle: 'Avsluta',
            }}
          />          
          <Stack.Screen 
            name="Resultat" 
            component={ResultScreen} 
            options={{ 
              title: '',
              headerBackTitle: 'Tillbaka'
          }}
          />
          <Stack.Screen 
            name="register-result" 
            component={RegisterResultScreen} 
            options={{ 
              title: '',
              headerBackTitle: 'Avbryt'
          }}
          />
        </Stack.Navigator>
        
      </ThemeProvider>
    </NavigationContainer>
    
    <StatusBar barStyle='dark-content' />
  </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer:{
    flex: 1
  }
});