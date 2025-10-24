import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HistoryScreen() {
return (
    <View style={styles.container}>
        <Text style={styles.title}>📊 Historial</Text>
        <Text style={styles.subtitle}>Práctica 8 - Diseño de interfaz y código</Text>
        <View style={styles.card}>
        <Text>Aquí irá el historial de lecturas</Text>
        </View>
    </View>
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
});