import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, FlatList } from 'react-native';
import { Card, Chip, Divider, Button } from 'react-native-paper';
import { WaterQualityData } from '../types';

// Datos de ejemplo para historial
const mockHistoryData: WaterQualityData[] = [
  { id: '1', pH: 7.4, ORP: 720, temperature: 28, status: 'optimal', timestamp: '2025-10-31 14:30:00' },
  { id: '2', pH: 7.2, ORP: 680, temperature: 27, status: 'optimal', timestamp: '2025-10-31 13:15:00' },
  { id: '3', pH: 7.1, ORP: 620, temperature: 29, status: 'warning', timestamp: '2025-10-31 12:00:00' },
  { id: '4', pH: 7.5, ORP: 710, temperature: 26, status: 'optimal', timestamp: '2025-10-31 10:45:00' },
  { id: '5', pH: 6.9, ORP: 580, temperature: 31, status: 'danger', timestamp: '2025-10-31 09:30:00' },
  { id: '6', pH: 7.3, ORP: 690, temperature: 28, status: 'optimal', timestamp: '2025-10-31 08:15:00' },
];

const HistoryScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'24h' | '7d' | '30d'>('24h');
  const [filteredData, setFilteredData] = useState<WaterQualityData[]>(mockHistoryData);
  const [selectedParameter, setSelectedParameter] = useState<'all' | 'pH' | 'ORP' | 'temperature'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'optimal' | 'warning' | 'danger'>('all');

  // Filtrar datos según selecciones
  useEffect(() => {
    let results = mockHistoryData;
    
    // Filtrar por período (simulado)
    if (selectedPeriod === '7d') {
      results = results.slice(0, 20); // Simular 7 días
    } else if (selectedPeriod === '30d') {
      results = results.slice(0, 10); // Simular 30 días
    }
    
    // Filtrar por parámetro
    if (selectedParameter !== 'all') {
      // En una implementación real, filtrarías por parámetro específico
    }
    
    // Filtrar por estado
    if (selectedStatus !== 'all') {
      results = results.filter(item => item.status === selectedStatus);
    }
    
    setFilteredData(results);
  }, [selectedPeriod, selectedParameter, selectedStatus]);

  // Función para exportar datos
  const handleExportData = () => {
    console.log("Exportando datos...");
    // Aquí iría la lógica para exportar a CSV/PDF
    alert('Función de exportación en desarrollo');
  };

  // Función para obtener color según estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return '#4caf50';
      case 'warning': return '#ffaa00';
      case 'danger': return '#ff4444';
      default: return '#757575';
    }
  };

  // Función para formatear fecha
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  // Renderizar item del historial
  const renderHistoryItem = ({ item }: { item: WaterQualityData }) => (
    <Card style={styles.historyCard}>
      <Card.Content>
        <View style={styles.historyHeader}>
          <Text style={styles.timestamp}>{formatDate(item.timestamp)}</Text>
          <Chip 
            mode="outlined"
            textStyle={styles.chipText}
            style={[styles.statusChip, { backgroundColor: getStatusColor(item.status) }]}
          >
            {item.status.toUpperCase()}
          </Chip>
        </View>
        
        <View style={styles.parametersContainer}>
          <View style={styles.parameterRow}>
            <Text style={styles.parameterLabel}>pH:</Text>
            <Text style={[styles.parameterValue, { color: getStatusColor(item.status) }]}>
              {item.pH}
            </Text>
          </View>
          
          <View style={styles.parameterRow}>
            <Text style={styles.parameterLabel}>ORP:</Text>
            <Text style={[styles.parameterValue, { color: getStatusColor(item.status) }]}>
              {item.ORP} mV
            </Text>
          </View>
          
          <View style={styles.parameterRow}>
            <Text style={styles.parameterLabel}>Temp:</Text>
            <Text style={[styles.parameterValue, { color: getStatusColor(item.status) }]}>
              {item.temperature}°C
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Selector de período */}
      <View style={styles.periodSelector}>
        <Text style={styles.sectionTitle}>Período</Text>
        <View style={styles.periodChips}>
          {(['24h', '7d', '30d'] as const).map((period) => (
            <Chip
              key={period}
              selected={selectedPeriod === period}
              onPress={() => setSelectedPeriod(period)}
              style={[
                styles.periodChip,
                selectedPeriod === period && { backgroundColor: '#205781' }
              ]}
              textStyle={selectedPeriod === period ? { color: '#fff' } : { color: '#205781' }}
            >
              {period}
            </Chip>
          ))}
        </View>
      </View>

      {/* Filtros */}
      <View style={styles.filtersSection}>
        <Text style={styles.sectionTitle}>Filtros</Text>
        <View style={styles.filtersContainer}>
          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>Parámetro</Text>
            <View style={styles.filterChips}>
              {(['all', 'pH', 'ORP', 'temperature'] as const).map((param) => (
                <Chip
                  key={param}
                  selected={selectedParameter === param}
                  onPress={() => setSelectedParameter(param)}
                  style={[
                    styles.filterChip,
                    selectedParameter === param && { backgroundColor: '#205781' }
                  ]}
                  textStyle={selectedParameter === param ? { color: '#fff' } : { color: '#205781' }}
                >
                  {param === 'all' ? 'TODOS' : param.toUpperCase()}
                </Chip>
              ))}
            </View>
          </View>

          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>Estado</Text>
            <View style={styles.filterChips}>
              {(['all', 'optimal', 'warning', 'danger'] as const).map((status) => (
                <Chip
                  key={status}
                  selected={selectedStatus === status}
                  onPress={() => setSelectedStatus(status)}
                  style={[
                    styles.filterChip,
                    selectedStatus === status && { backgroundColor: '#205781' }
                  ]}
                  textStyle={selectedStatus === status ? { color: '#fff' } : { color: '#205781' }}
                >
                  {status === 'all' ? 'TODOS' : status.toUpperCase()}
                </Chip>
              ))}
            </View>
          </View>
        </View>
      </View>

      <Divider style={styles.divider} />

      {/* Encabezado de resultados */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsTitle}>
          {filteredData.length} registro{filteredData.length !== 1 ? 's' : ''} encontrado{filteredData.length !== 1 ? 's' : ''}
        </Text>
        <TouchableOpacity style={styles.exportButton} onPress={handleExportData}>
          <Text style={styles.exportButtonText}>📥 Exportar Datos</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de historial */}
      <FlatList
        data={filteredData}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id!}
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
  periodSelector: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#205781',
    marginBottom: 8,
  },
  periodChips: {
    flexDirection: 'row',
    gap: 8,
  },
  periodChip: {
    borderColor: '#205781',
  },
  filtersSection: {
    marginBottom: 16,
  },
  filtersContainer: {
    gap: 12,
  },
  filterGroup: {
    gap: 8,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#205781',
  },
  filterChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    borderColor: '#205781',
  },
  divider: {
    marginVertical: 8,
    backgroundColor: '#205781',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
  },
  resultsTitle: {
    fontSize: 14,
    color: '#205781',
    fontWeight: '500',
  },
  exportButton: {
    backgroundColor: '#205781',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  exportButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: 16,
  },
  historyCard: {
    marginBottom: 12,
    elevation: 2,
    backgroundColor: '#fff',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },
  statusChip: {
    height: 24,
  },
  chipText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  parametersContainer: {
    gap: 6,
  },
  parameterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  parameterLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  parameterValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HistoryScreen;