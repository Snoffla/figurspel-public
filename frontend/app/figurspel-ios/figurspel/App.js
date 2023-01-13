import 'react-native-gesture-handler';

import React, { useState, useEffect, useContext} from 'react';
import { Text, View, StyleSheet, Dimensions, Button, Appearance, StatusBar, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { NavigationContainer, useTheme} from '@react-navigation/native';

import { createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import {ThemeProvider} from 'react-native-elements';
import {NavigationTheme, MainTheme} from './theme/light';


import GameScreen from './GameScreen';
import StartScreen from './StartScreen';
import ResultScreen from './ResultScreen';
import RegisterResultScreen from './RegisterResultScreen';

const Stack = createStackNavigator();

export default function App() {
  const [theme, setTheme] = useState(NavigationTheme);
  
  // Appearance.addChangeListener((appearance) =>{
  //   setColorScheme(appearance.colorScheme);
  //   setTheme(appearance.colorScheme == "dark" ? DarkTheme : LightTheme);
  // })

  // if (!theme.dark && colorScheme === 'dark'){
  //   setTheme(DarkTheme);
  // } else if(theme.dark && colorScheme === 'light'){
  //   setTheme(LightTheme);
  // }

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