import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { Linking } from 'react-native';
import WaterCard from '../components/WaterCard';
import { WaterQualityData } from '../types';

export default function DashboardScreen() {
const [currentData, setCurrentData] = useState<WaterQualityData>({
    pH: 7.4,
    ORP: 680,
    temperature: 28,
    status: 'optimal',
    timestamp: new Date().toISOString()
});

const sendWhatsAppReport = () => {
    const message = `🏊 *HydroSafe Reporte*\n
📅 ${new Date().toLocaleDateString()}\n
🌊 *pH:* ${currentData.pH}
🧪 *ORP:* ${currentData.ORP} mV
🌡️ *Temperatura:* ${currentData.temperature}°C\n
✅ *Estado:* ${currentData.status === 'optimal' ? 'DENTRO DEL RANGO' : 'FUERA DE RANGO'}\n
_Enviado desde HydroSafe App_`;

    const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
    
    Linking.canOpenURL(url).then(supported => {
    if (supported) {
        Linking.openURL(url);
    } else {
        Alert.alert('Error', 'WhatsApp no está instalado');
    }
    });
};

const getStatus = (ph: number, orp: number, temp: number): 'optimal' | 'warning' | 'danger' => {
    if (ph >= 7.2 && ph <= 7.6 && orp >= 650 && orp <= 750 && temp >= 25 && temp <= 30) {
        return 'optimal';
    } else if (ph < 6.8 || ph > 7.8 || orp < 600 || orp > 800 || temp < 20 || temp > 35) {
        return 'danger';
    } else {
        return 'warning';
    }
};

  // Simular cambios en los datos (para demo)
useEffect(() => {
    const interval = setInterval(() => {
    setCurrentData(prev => ({
        ...prev,
        pH: Number((7.2 + Math.random() * 0.6).toFixed(1)),
        ORP: Math.floor(640 + Math.random() * 120),
        temperature: Math.floor(26 + Math.random() * 6),
        timestamp: new Date().toISOString()
    }));
    }, 5000);

    return () => clearInterval(interval);
}, []);

  // Actualizar status cuando cambien los datos
useEffect(() => {
    const status = getStatus(currentData.pH, currentData.ORP, currentData.temperature);
    setCurrentData(prev => ({ ...prev, status }));
}, [currentData.pH, currentData.ORP, currentData.temperature]);

return (
    <ScrollView style={styles.container}>
        <Text style={styles.title}>🏊 HydroSafe</Text>
        <Text style={styles.subtitle}>Dashboard Principal</Text>
    
    <Card style={styles.summaryCard}>
        <Card.Content>
            <Text style={styles.summaryTitle}>Resumen del Sistema</Text>
            <Text style={styles.timestamp}>Última actualización: {new Date(currentData.timestamp).toLocaleTimeString()}</Text>
        </Card.Content>
    </Card>

    <WaterCard 
        parameter="pH"
        value={currentData.pH}
        status={currentData.status}
        unit=""
    />
    
    <WaterCard 
        parameter="ORP (Cloro)"
        value={currentData.ORP}
        status={currentData.status}
        unit="mV"
    />
    
    <WaterCard 
        parameter="Temperatura"
        value={currentData.temperature}
        status={currentData.status}
        unit="°C"
    />

    <TouchableOpacity 
        style={styles.whatsappButton}
        onPress={sendWhatsAppReport}
    >
        <Text style={styles.whatsappButtonText}>
            📤 Enviar Reporte por WhatsApp
        </Text>
    </TouchableOpacity>

        <View style={styles.legend}>
            <Text style={styles.legendTitle}>Leyenda:</Text>
            <Text>✅ Óptimo | ⚠️ Advertencia | ❌ Peligro</Text>
        </View>
    </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#F6F8D5',
    },
    title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#205781',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
    },
    subtitle: {
    fontSize: 16,
    color: '#4F959D',
    textAlign: 'center',
    marginBottom: 20,
    },
    summaryCard: {
    margin: 16,
    backgroundColor: '#ffffff',
    elevation: 3,
    },
    summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#205781',
    },
    timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    },
    whatsappButton: {
    margin: 16,
    backgroundColor: '#25D366',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    },
    whatsappButtonText: {
    color: 'white', 
    fontWeight: 'bold',
    fontSize: 16,
    },
    legend: {
    margin: 16,
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    alignItems: 'center',
    },
    legendTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#205781',
    },
});