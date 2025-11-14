// App.tsx
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, ActivityIndicator } from 'react-native';

// Pantallas
import DashboardScreen from './src/screens/DashboardScreen';
import AlertsScreen from './src/screens/AlertsScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import SearchScreen from './src/screens/SearchScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import AnalysisScreen from './src/screens/AnalysisScreen';

const Tab = createBottomTabNavigator();

// Componente de carga
const AppLoading = () => (
  <View style={{ 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#F6F8D5'
  }}>
    <Text style={{ color: '#205781', fontSize: 18 }}>Inicializando HydroSafe...</Text>
    <ActivityIndicator size="large" color="#205781" style={{ marginTop: 20 }} />
  </View>
);

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsAppReady(true);
    }, 2000);
  }, []);

  if (!isAppReady) {
    return (
      <PaperProvider>
        <AppLoading />
      </PaperProvider>
    );
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: any = 'help';

              if (route.name === 'Dashboard') {
                iconName = focused ? 'speedometer' : 'speedometer-outline';
              } else if (route.name === 'Alertas') {
                iconName = focused ? 'warning' : 'warning-outline';
              } else if (route.name === 'Historial') {
                iconName = focused ? 'time' : 'time-outline';
              } else if (route.name === 'Búsqueda') {
                iconName = focused ? 'search' : 'search-outline';
              } else if (route.name === 'Análisis') {
                iconName = focused ? 'analytics' : 'analytics-outline';
              } else if (route.name === 'Configuración') { 
                iconName = focused ? 'settings' : 'settings-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#ffffffff',
            tabBarInactiveTintColor: '#ffffffff',
            tabBarStyle: {
              backgroundColor: '#000000ff',
            },
            headerStyle: {
              backgroundColor: '#000000ff',
            },
            headerTintColor: '#ffffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        >
          <Tab.Screen 
            name="Dashboard" 
            component={DashboardScreen}
            options={{ title: 'Estado Actual' }}
          />
          <Tab.Screen 
            name="Alertas" 
            component={AlertsScreen}
            options={{ title: 'Alertas' }}
          />
          <Tab.Screen 
            name="Historial" 
            component={HistoryScreen}
            options={{ title: 'Historial' }}
          />
          <Tab.Screen 
            name="Búsqueda" 
            component={SearchScreen}
            options={{ title: 'Búsqueda' }}
          />
          <Tab.Screen 
            name="Análisis" 
            component={AnalysisScreen}
            options={{ title: 'Análisis' }}
          />
          <Tab.Screen 
            name="Configuración" 
            component={SettingsScreen}
            options={{ title: 'Configuración' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}