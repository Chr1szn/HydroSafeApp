import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Alert, Switch } from 'react-native';
import { Card, Divider, TextInput, Button } from 'react-native-paper';

const SettingsScreen = () => {
  // Estado para umbrales químicos
    const [thresholds, setThresholds] = useState({
    pHMin: 7.2,
    pHMax: 7.6,
    ORPMin: 650,
    ORPMax: 750,
    tempMin: 25,
    tempMax: 30
  });

  // Estado para notificaciones
  const [notifications, setNotifications] = useState({
    criticalAlerts: true,
    maintenanceReminders: true,
    dailyReports: false,
    sounds: true,
    vibration: true
  });

  // Estado para dispositivos
  const [devices, setDevices] = useState({
    esp32Connected: false,
    bluetoothEnabled: true,
    realTimeSync: true
  });

  // Estado para interfaz
  const [interfaceSettings, setInterfaceSettings] = useState({
    textSize: 'medium',
    darkMode: false,
    defaultScreen: 'dashboard'
  });

  // Función para guardar configuración
  const handleSaveSettings = () => {
    console.log("Guardando configuración...", { thresholds, notifications, devices });
    Alert.alert('Éxito', 'Configuración guardada correctamente');
  };

  // Función para conectar ESP32
  const handleConnectESP32 = () => {
    Alert.alert(
      "Conectar ESP32",
      "¿Deseas buscar y conectar el dispositivo ESP32?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Conectar", 
          onPress: () => {
            setDevices(prev => ({ ...prev, esp32Connected: true }));
            Alert.alert("Conectado", "ESP32 conectado exitosamente");
          }
        }
      ]
    );
  };

  // Función para limpiar caché
  const handleClearCache = () => {
    Alert.alert(
      "Limpiar Caché",
      "¿Estás seguro de que quieres limpiar todos los datos en caché?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Limpiar", 
          onPress: () => {
            Alert.alert("Éxito", "Caché limpiado correctamente");
          }
        }
      ]
    );
  };

  // Función para toggle notificaciones
  const handleToggleNotification = (type: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }));
  };

  // Función para toggle dispositivos
  const handleToggleDevice = (type: keyof typeof devices) => {
    setDevices(prev => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>⚙️ Configuración</Text>

      {/* UMBRALES QUÍMICOS */}
      <Card style={styles.sectionCard}>
        <Card.Content>
          <Text style={styles.sectionTitle}>🔬 Umbrales Químicos</Text>
          
          <View style={styles.thresholdsContainer}>
            <View style={styles.thresholdRow}>
              <Text style={styles.thresholdLabel}>pH Mínimo:</Text>
              <TextInput
                style={styles.input}
                value={thresholds.pHMin.toString()}
                onChangeText={(text) => setThresholds(prev => ({ ...prev, pHMin: parseFloat(text) || 0 }))}
                keyboardType="numeric"
                mode="outlined"
                dense
              />
            </View>
            
            <View style={styles.thresholdRow}>
              <Text style={styles.thresholdLabel}>pH Máximo:</Text>
              <TextInput
                style={styles.input}
                value={thresholds.pHMax.toString()}
                onChangeText={(text) => setThresholds(prev => ({ ...prev, pHMax: parseFloat(text) || 0 }))}
                keyboardType="numeric"
                mode="outlined"
                dense
              />
            </View>
            
            <View style={styles.thresholdRow}>
              <Text style={styles.thresholdLabel}>ORP Mínimo (mV):</Text>
              <TextInput
                style={styles.input}
                value={thresholds.ORPMin.toString()}
                onChangeText={(text) => setThresholds(prev => ({ ...prev, ORPMin: parseInt(text) || 0 }))}
                keyboardType="numeric"
                mode="outlined"
                dense
              />
            </View>
            
            <View style={styles.thresholdRow}>
              <Text style={styles.thresholdLabel}>ORP Máximo (mV):</Text>
              <TextInput
                style={styles.input}
                value={thresholds.ORPMax.toString()}
                onChangeText={(text) => setThresholds(prev => ({ ...prev, ORPMax: parseInt(text) || 0 }))}
                keyboardType="numeric"
                mode="outlined"
                dense
              />
            </View>
            
            <View style={styles.thresholdRow}>
              <Text style={styles.thresholdLabel}>Temp Mínima (°C):</Text>
              <TextInput
                style={styles.input}
                value={thresholds.tempMin.toString()}
                onChangeText={(text) => setThresholds(prev => ({ ...prev, tempMin: parseInt(text) || 0 }))}
                keyboardType="numeric"
                mode="outlined"
                dense
              />
            </View>
            
            <View style={styles.thresholdRow}>
              <Text style={styles.thresholdLabel}>Temp Máxima (°C):</Text>
              <TextInput
                style={styles.input}
                value={thresholds.tempMax.toString()}
                onChangeText={(text) => setThresholds(prev => ({ ...prev, tempMax: parseInt(text) || 0 }))}
                keyboardType="numeric"
                mode="outlined"
                dense
              />
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* NOTIFICACIONES */}
      <Card style={styles.sectionCard}>
        <Card.Content>
          <Text style={styles.sectionTitle}>🔔 Notificaciones</Text>
          
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Alertas críticas</Text>
            <Switch
              value={notifications.criticalAlerts}
              onValueChange={() => handleToggleNotification('criticalAlerts')}
              trackColor={{ false: '#767577', true: '#205781' }}
              thumbColor={notifications.criticalAlerts ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Recordatorios de mantenimiento</Text>
            <Switch
              value={notifications.maintenanceReminders}
              onValueChange={() => handleToggleNotification('maintenanceReminders')}
              trackColor={{ false: '#767577', true: '#205781' }}
              thumbColor={notifications.maintenanceReminders ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Reportes automáticos diarios</Text>
            <Switch
              value={notifications.dailyReports}
              onValueChange={() => handleToggleNotification('dailyReports')}
              trackColor={{ false: '#767577', true: '#205781' }}
              thumbColor={notifications.dailyReports ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Sonidos</Text>
            <Switch
              value={notifications.sounds}
              onValueChange={() => handleToggleNotification('sounds')}
              trackColor={{ false: '#767577', true: '#205781' }}
              thumbColor={notifications.sounds ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Vibración</Text>
            <Switch
              value={notifications.vibration}
              onValueChange={() => handleToggleNotification('vibration')}
              trackColor={{ false: '#767577', true: '#205781' }}
              thumbColor={notifications.vibration ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
        </Card.Content>
      </Card>

      {/* DISPOSITIVOS */}
      <Card style={styles.sectionCard}>
        <Card.Content>
          <Text style={styles.sectionTitle}>📱 Dispositivos</Text>
          
          <View style={styles.deviceSection}>
            <View style={styles.deviceRow}>
              <Text style={styles.deviceLabel}>ESP32: {devices.esp32Connected ? 'Conectado' : 'Desconectado'}</Text>
              <TouchableOpacity 
                style={[styles.connectButton, devices.esp32Connected && styles.connectedButton]}
                onPress={handleConnectESP32}
              >
                <Text style={styles.connectButtonText}>
                  {devices.esp32Connected ? '✅ Conectado' : '🔗 Conectar'}
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Sincronización tiempo real</Text>
              <Switch
                value={devices.realTimeSync}
                onValueChange={() => handleToggleDevice('realTimeSync')}
                trackColor={{ false: '#767577', true: '#205781' }}
                thumbColor={devices.realTimeSync ? '#f4f3f4' : '#f4f3f4'}
              />
            </View>
            
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Bluetooth</Text>
              <Switch
                value={devices.bluetoothEnabled}
                onValueChange={() => handleToggleDevice('bluetoothEnabled')}
                trackColor={{ false: '#767577', true: '#205781' }}
                thumbColor={devices.bluetoothEnabled ? '#f4f3f4' : '#f4f3f4'}
              />
            </View>
            
            <TouchableOpacity style={styles.cacheButton} onPress={handleClearCache}>
              <Text style={styles.cacheButtonText}>🗑️ Limpiar caché de datos</Text>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>

      {/* BOTÓN GUARDAR */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveSettings}>
        <Text style={styles.saveButtonText}>💾 Guardar Configuración</Text>
      </TouchableOpacity>

      <View style={styles.footer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8D5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#205781',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionCard: {
    marginBottom: 16,
    backgroundColor: '#fff',
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#205781',
    marginBottom: 16,
  },
  thresholdsContainer: {
    gap: 12,
  },
  thresholdRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  thresholdLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    flex: 1,
  },
  input: {
    width: 80,
    height: 40,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  switchLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  deviceSection: {
    gap: 12,
  },
  deviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  deviceLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  connectButton: {
    backgroundColor: '#205781',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  connectedButton: {
    backgroundColor: '#4caf50',
  },
  connectButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  cacheButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  cacheButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#205781',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    elevation: 2,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    height: 20,
  },
});

export default SettingsScreen;