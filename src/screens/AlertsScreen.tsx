import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { Card, Chip, Searchbar, Divider } from 'react-native-paper';

// Tipo para las alertas
type Alert = {
    id: string;
    type: 'critical' | 'warning' | 'info' | 'resolved';
    title: string;
    message: string;
    parameter: 'pH' | 'ORP' | 'Temperatura';
    value: number;
    timestamp: string;
    isActive: boolean;
};

// Datos de ejemplo
const mockAlerts: Alert[] = [
        {
    id: '1',
    type: 'critical',
    title: 'pH CRÍTICO',
    message: 'El nivel de pH está fuera del rango seguro',
    parameter: 'pH',
    value: 6.8,
    timestamp: '2025-10-31 10:30:00',
    isActive: true
},
        {
    id: '2',
    type: 'warning',
    title: 'ORP BAJO',
    message: 'Nivel de cloro residual bajo',
    parameter: 'ORP',
    value: 620,
    timestamp: '2025-10-31 09:15:00',
    isActive: true
},
        {
    id: '3',
    type: 'info',
    title: 'MANTENIMIENTO',
    message: 'Recordatorio: calibrar sensores',
    parameter: 'pH',
    value: 0,
    timestamp: '2025-10-30 14:20:00',
    isActive: true
},
        {
    id: '4',
    type: 'resolved',
    title: 'TEMPERATURA NORMALIZADA',
    message: 'La temperatura volvió al rango óptimo',
    parameter: 'Temperatura',
    value: 28,
    timestamp: '2025-10-29 16:45:00',
    isActive: false
    }
];

const AlertsScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>(mockAlerts);
    const [activeFilter, setActiveFilter] = useState<'all' | 'critical' | 'warning' | 'info' | 'resolved'>('all');

  // Filtrar alertas según búsqueda y filtro activo
    useEffect(() => {
    let results = mockAlerts;
    
    // Aplicar filtro por tipo
    if (activeFilter !== 'all') {
        results = results.filter(alert => alert.type === activeFilter);
    }
    
    // Aplicar búsqueda
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        results = results.filter(alert => 
        alert.title.toLowerCase().includes(query) ||
        alert.message.toLowerCase().includes(query) ||
        alert.parameter.toLowerCase().includes(query)
        );
    }
    
    setFilteredAlerts(results);
    }, [searchQuery, activeFilter]);

  // Función para obtener el color según el tipo de alerta
    const getAlertColor = (type: Alert['type']) => {
        switch (type) {
        case 'critical': return '#ff4444';
        case 'warning': return '#ffaa00';
        case 'info': return '#2196f3';
        case 'resolved': return '#4caf50';
        default: return '#757575';
        }
    };

  // Función para obtener el icono según el tipo de alerta
    const getAlertIcon = (type: Alert['type']) => {
        switch (type) {
        case 'critical': return 'alert';
        case 'warning': return 'alert-circle';
        case 'info': return 'information';
        case 'resolved': return 'check-circle';
        default: return 'help-circle';
        }
    };

  // Renderizar cada item de alerta
    const renderAlertItem = ({ item }: { item: Alert }) => (
    <Card style={[styles.alertCard, { borderLeftColor: getAlertColor(item.type) }]}>
        <Card.Content>
            <View style={styles.alertHeader}>
                <View style={styles.alertTitleContainer}>
                    <Text style={styles.alertTitle}>{item.title}</Text>
                    <Chip 
                        mode="outlined" 
                        textStyle={styles.chipText}
                        style={[styles.chip, { backgroundColor: getAlertColor(item.type) }]}
                        >
                        {item.type.toUpperCase()}
                    </Chip>
                </View>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
            
            <Text style={styles.alertMessage}>{item.message}</Text>
            
            {item.parameter !== 'pH' && item.value > 0 && (
                <View style={styles.alertDetails}>
                    <Text style={styles.parameterText}>
                        {item.parameter}: {item.value} 
                        {item.parameter === 'Temperatura' ? '°C' : item.parameter === 'ORP' ? ' mV' : ''}
                    </Text>
                </View>
            )}
            
            <View style={styles.alertActions}>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionText}>Marcar como resuelta</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionText}>Ver detalles</Text>
                </TouchableOpacity>
            </View>
        </Card.Content>
    </Card>
    );

    return (
    <View style={styles.container}>
      {/* Barra de búsqueda */}
        <Searchbar
        placeholder="Buscar alertas..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
        />
    
      {/* Filtros rápidos */}
        <View style={styles.filtersContainer}>
        {(['all', 'critical', 'warning', 'info', 'resolved'] as const).map((filter) => (
            <Chip
                key={filter}
                selected={activeFilter === filter}
                onPress={() => setActiveFilter(filter)}
                style={styles.filterChip}
                mode="outlined"
                >
                {filter === 'all' ? 'TODAS' : filter.toUpperCase()}
            </Chip>
        ))}
        </View>
    
        <Divider style={styles.divider} />
    
      {/* Contador de alertas */}
        <View style={styles.alertsCount}>
            <Text style={styles.alertsCountText}>
                {filteredAlerts.length} alerta{filteredAlerts.length !== 1 ? 's' : ''} encontrada{filteredAlerts.length !== 1 ? 's' : ''}
            </Text>
        </View>
    
      {/* Lista de alertas */}
        <FlatList
        data={filteredAlerts}
        renderItem={renderAlertItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
    />
    </View>
    );
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#F6F8D5',
    padding: 16,
    },
searchbar: {
    marginBottom: 12,
    elevation: 2,
    backgroundColor: '#ffffffff',
    },
filtersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
    },
filterChip: {
    marginBottom: 4,
    },
divider: {
    marginVertical: 8,
    },
alertsCount: {
    paddingVertical: 8,
    },
alertsCountText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    },
listContent: {
    paddingBottom: 16,
    },
alertCard: {
    marginBottom: 12,
    borderLeftWidth: 4,
    elevation: 2,
    },
alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    },
alertTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    },
alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
    flexShrink: 1,
    },
chip: {
    height: 24,
    marginLeft: 4,
    },
chipText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
    },
timestamp: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    flexShrink: 0,
    },
alertMessage: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
    },
alertDetails: {
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 4,
    marginBottom: 12,
    },
parameterText: {
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
    },
alertActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    },
actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    },
actionText: {
    color: '#2196f3',
    fontSize: 12,
    fontWeight: '500',
    },
});

export default AlertsScreen;