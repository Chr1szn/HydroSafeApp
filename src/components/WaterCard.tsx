import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

interface WaterCardProps {
    parameter: string;
    value: number;
    status: 'optimal' | 'warning' | 'danger';
    unit: string;
}

export default function WaterCard({ parameter, value, status, unit }: WaterCardProps) {
const getStatusColor = () => {
    switch (status) {
        case 'optimal': return '#4CAF50';
        case 'warning': return '#FF9800';
        case 'danger': return '#F44336';
        default: return '#9E9E9E';
    }
};

const getStatusEmoji = () => {
    switch (status) {
        case 'optimal': return '✅';
        case 'warning': return '⚠️';
        case 'danger': return '❌';
        default: return '🔵';
    }
    };

return (
    <Card style={[styles.card, { borderLeftColor: getStatusColor() }]}>
        <Card.Content>
        <View style={styles.header}>
            <Text style={styles.parameter}>{parameter}</Text>
            <Text style={[styles.status, { color: getStatusColor() }]}>
            {getStatusEmoji()} {status.toUpperCase()}
            </Text>
        </View>
        <Text style={styles.value}>
            {value} {unit}
        </Text>
        </Card.Content>
    </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 8,
        marginHorizontal: 16,
        borderLeftWidth: 6,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    parameter: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#205781',
    },
    status: {
        fontSize: 12,
        fontWeight: '600',
    },
    value: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4F959D',
        textAlign: 'center',
    },
});