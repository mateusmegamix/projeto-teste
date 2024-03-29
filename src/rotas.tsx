import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createNativeStackNavigator();

import AuthScreen from './modules/AuthScreen';
import Register from './modules/ Register';
import RenderScreen from './modules/RenderScreen';
import SettingsScreen from './modules/SettingsScreen';

export default function Rotas() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="AuthScreen" component={AuthScreen} options={{ headerShown: false }}/>
        <Tab.Screen name="Register" component={Register} />
        <Tab.Screen name="RenderScreen" component={RenderScreen} options={{ headerShown: false }}/>
        <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}