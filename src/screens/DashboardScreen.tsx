import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function DashboardScreen() {
return (
    <ScrollView style={styles.container}>
        <Text style={styles.title}>🏊 HydroSafe</Text>
        <Text style={styles.subtitle}>Dashboard Principal</Text>
    
        <View style={styles.card}>
        <Text style={styles.cardTitle}>Estado Actual</Text>
        <Text>pH: 7.4 ✅</Text>
        <Text>ORP: 680 mV ✅</Text>
        <Text>Temperatura: 28°C 🔵</Text>
        </View>
    </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F6F8D5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#205781',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#4F959D',
        textAlign: 'center',
        marginBottom: 20,
    },
    card: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        borderColor: '#98D2C0',
        borderWidth: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#205781',
        marginBottom: 8,
    },
});