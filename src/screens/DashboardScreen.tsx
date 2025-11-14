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

    // 🔽 NUEVOS ESTADOS PARA EL SENSOR
    const [realTemperature, setRealTemperature] = useState<number | null>(null);
    const [isBTConnected, setIsBTConnected] = useState(false);

    // 🔽 FUNCIÓN PARA INICIALIZAR BLUETOOTH/SENSOR - ES LA QUE SE VA A CAMBIAR CUANDO SE REEMPLACE POR EL CODIGO************************
    const initializeBluetooth = () => {
        // Por ahora simula conexión - luego se reemplaza con Bluetooth real
        console.log("Inicializando módulo Bluetooth...");
        setIsBTConnected(true);
        
        // Simular recepción de datos del DS18B20
        const simulateSensorData = () => {
        const simulatedTemp = 26 + Math.random() * 4; // 26-30°C (rango realista)
        setRealTemperature(Number(simulatedTemp.toFixed(1)));
        console.log(`📡 Datos sensor simulado: ${simulatedTemp.toFixed(1)}°C`);
        };
        
        // Primera lectura inmediata
        simulateSensorData();
        
        // Actualizar cada 5 segundos (igual que tu simulación actual)
        const interval = setInterval(simulateSensorData, 5000);
        
        return () => clearInterval(interval);
    };

    //********************************************************************************* HASTA AQUI SE SUSTITUYE - TODO EL CONST initializeBluetooth*/
    // ESTE LO VAS A PONER POR EL QUE ESTÁ ARRIBA

    /*
    // FUTURO (con sensor físico):
    const initializeBluetooth = () => {
    console.log("Buscando sensor HydroSafe_ESP32...");
    
    // Tu equipo implementará esta parte
    const connectRealBluetooth = async () => {
        try {
        // 1. Buscar dispositivo Bluetooth "HydroSafe_ESP32"
        // 2. Conectar y configurar comunicación serial
        // 3. Escuchar datos en tiempo real
        // 4. Procesar: "TEMP:27.5" → setRealTemperature(27.5)
        
        setIsBTConnected(true);
        console.log("✅ Sensor DS18B20 conectado via Bluetooth");
        
        } catch (error) {
        console.error("❌ Error conectando Bluetooth:", error);
        setIsBTConnected(false);
        }
    };

    connectRealBluetooth();
    
    // Limpiar conexión al desmontar
    return () => {
        console.log("Limpiando conexión Bluetooth...");
        // Tu equipo agregará: desconectar Bluetooth aquí
    };
    };
    */


    //************************************************************************************************** */
    const sendWhatsAppReport = () => {
        const message = `🏊 *HydroSafe Reporte*\n
    📅 ${new Date().toLocaleDateString()}\n
    🌊 *pH:* ${currentData.pH}
    🧪 *ORP:* ${currentData.ORP} mV
    🌡️ *Temperatura:* ${currentData.temperature}°C\n
    ✅ *Estado:* ${currentData.status === 'optimal' ? 'DENTRO DEL RANGO' : 'FUERA DE RANGO'}\n
    ${isBTConnected ? '🔗 _Datos de sensor real_' : '🔄 _Datos simulados_'}\n
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

    // 🔽 useEffect MODIFICADO - INTEGRA SENSOR + SIMULACIÓN
    useEffect(() => {
        // Inicializar Bluetooth (modo simulación por ahora)
        const cleanupBluetooth = initializeBluetooth();
        
        // Tu código de simulación existente MEJORADO
        const interval = setInterval(() => {
        setCurrentData(prev => ({
            ...prev,
            pH: Number((7.2 + Math.random() * 0.6).toFixed(1)),
            ORP: Math.floor(640 + Math.random() * 120),
            // ⚡ USA TEMPERATURA REAL si está disponible, si no la simulada
            temperature: realTemperature !== null ? realTemperature : Math.floor(26 + Math.random() * 6),
            timestamp: new Date().toISOString()
        }));
        }, 5000);

        return () => {
        clearInterval(interval);
        cleanupBluetooth(); // Limpiar Bluetooth también
        };
    }, [realTemperature]); // ← Se actualiza cuando cambia la temperatura real

    // Actualizar status cuando cambien los datos
    useEffect(() => {
        const status = getStatus(currentData.pH, currentData.ORP, currentData.temperature);
        setCurrentData(prev => ({ ...prev, status }));
    }, [currentData.pH, currentData.ORP, currentData.temperature]);

    return (
        <ScrollView style={styles.container}>
        <Text style={styles.title}>🏊 HydroSafe</Text>
        <Text style={styles.subtitle}>Dashboard Principal</Text>
        
        {/* 🔽 NUEVA TARJETA DE ESTADO DEL SENSOR */}
        <Card style={[
            styles.sensorStatusCard, 
            { backgroundColor: isBTConnected ? '#E8F5E8' : '#FFF9E6' }
        ]}>
            <Card.Content>
            <View style={styles.sensorStatusHeader}>
                <Text style={styles.sensorStatusTitle}>
                {isBTConnected ? '🔗 Sensor Conectado' : '🔌 Conectando Sensor...'}
                </Text>
                <View style={[
                styles.statusIndicator, 
                { backgroundColor: isBTConnected ? '#4CAF50' : '#FF9800' }
                ]} />
            </View>
            <Text style={styles.sensorStatusText}>
                {isBTConnected 
                ? `Temperatura real: ${realTemperature !== null ? realTemperature + '°C' : 'Leyendo...'}` 
                : 'Buscando sensor DS18B20...'
                }
            </Text>
            <Text style={styles.sensorHelpText}>
                {isBTConnected 
                ? '✅ Datos en tiempo real desde sensor físico'
                : '⚠️ Modo simulación - Conecta el sensor para datos reales'
                }
            </Text>
            </Card.Content>
        </Card>
        
        <Card style={styles.summaryCard}>
            <Card.Content>
            <Text style={styles.summaryTitle}>Resumen del Sistema</Text>
            <Text style={styles.timestamp}>Última actualización: {new Date(currentData.timestamp).toLocaleTimeString()}</Text>
            <Text style={styles.dataSource}>
                Fuente: {isBTConnected ? 'Sensor físico DS18B20' : 'Datos simulados'}
            </Text>
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
            <Text style={styles.sensorLegend}>
            {isBTConnected ? '🔗 Sensor conectado' : '🔌 Sensor desconectado'}
            </Text>
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
    // 🔽 NUEVOS ESTILOS PARA EL SENSOR
    sensorStatusCard: {
        margin: 16,
        elevation: 3,
        borderLeftWidth: 4,
        borderLeftColor: '#205781',
    },
    sensorStatusHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    sensorStatusTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#205781',
    },
    statusIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    sensorStatusText: {
        fontSize: 14,
        color: '#333',
        marginBottom: 4,
    },
    sensorHelpText: {
        fontSize: 12,
        color: '#666',
        fontStyle: 'italic',
    },
    // 🔽 ESTILOS EXISTENTES MODIFICADOS
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
    dataSource: {
        fontSize: 11,
        color: '#4F959D',
        marginTop: 2,
        fontStyle: 'italic',
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
    sensorLegend: {
        fontSize: 12,
        color: '#4F959D',
        marginTop: 4,
        fontStyle: 'italic',
    },
    });