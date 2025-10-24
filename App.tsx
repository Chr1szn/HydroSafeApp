import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, ActivityIndicator } from 'react-native';

// Pantallas
import DashboardScreen from './src/screens/DashboardScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

// Componente de carga SEGURO
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
    // Simular inicialización
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
        <StatusBar style="light" /> {/* SE PONE LA BARRA DE NOTIFICACIONES DE COLOR TRANSPARENTE */}
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: any = 'help';

              if (route.name === 'Dashboard') {
                iconName = focused ? 'speedometer' : 'speedometer-outline';
              } else if (route.name === 'Historial') {
                iconName = focused ? 'time' : 'time-outline';
              } else if (route.name === 'Configuración') { 
                iconName = focused ? 'settings' : 'settings-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#ffffffff', // 205781
            tabBarInactiveTintColor: '#ffffffff', //4F959D
            tabBarStyle: {
                backgroundColor: '#000000ff', //F6F8D5
            },
            // CAMBIAR COLOR DELHEADER:
            headerStyle: {
              backgroundColor: '#000000ff', // Mismo color que tu tab bar
            },
            headerTintColor: '#ffffffff', // Color del texto blanco
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
            name="Historial" 
            component={HistoryScreen}
            options={{ title: 'Historial' }}
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