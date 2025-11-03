import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Searchbar, Card, Chip, Divider, Button } from 'react-native-paper';

// Tipo para los resultados de búsqueda
type SearchResult = {
    id: string;
    type: 'reading' | 'alert' | 'maintenance';
    title: string;
    description: string;
    parameter: 'pH' | 'ORP' | 'Temperatura';
    value: number;
    status: 'optimal' | 'warning' | 'danger';
    timestamp: string;
    highlight?: string;
};

// Datos de ejemplo para búsquedas
const mockSearchData: SearchResult[] = [
    {
        id: '1',
        type: 'reading',
        title: 'Lectura de pH',
        description: 'pH medido en zona principal',
        parameter: 'pH',
        value: 7.4,
        status: 'optimal',
        timestamp: '2025-10-31 14:30:00'
    },
    {
        id: '2',
        type: 'alert',
        title: 'Alerta de ORP',
        description: 'Nivel de cloro bajo detectado',
        parameter: 'ORP',
        value: 620,
        status: 'warning',
        timestamp: '2025-10-31 10:15:00'
    },
    {
        id: '3',
        type: 'reading',
        title: 'Temperatura Alta',
        description: 'Temperatura en límite superior',
        parameter: 'Temperatura',
        value: 31,
        status: 'warning',
        timestamp: '2025-10-30 16:45:00'
    },
    {
        id: '4',
        type: 'maintenance',
        title: 'Mantenimiento Programado',
        description: 'Calibración de sensores de pH',
        parameter: 'pH',
        value: 0,
        status: 'optimal',
        timestamp: '2025-10-29 09:00:00'
    },
    {
        id: '5',
        type: 'alert',
        title: 'pH Crítico',
        description: 'pH fuera de rango seguro',
        parameter: 'pH',
        value: 6.9,
        status: 'danger',
        timestamp: '2025-10-28 11:20:00'
    },
    {
        id: '6',
        type: 'reading',
        title: 'ORP Óptimo',
        description: 'Nivel de cloro en rango ideal',
        parameter: 'ORP',
        value: 720,
        status: 'optimal',
        timestamp: '2025-10-27 13:10:00'
    }
];

// Búsquedas rápidas predefinidas
const quickSearches = [
    { id: '1', title: 'pH bajo esta semana', query: 'pH bajo' },
    { id: '2', title: 'Alertas críticas hoy', query: 'crítico' },
    { id: '3', title: 'Temperatura > 30°C', query: 'Temperatura' },
    { id: '4', title: 'ORP estable', query: 'ORP óptimo' },
];

const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [activeFilters, setActiveFilters] = useState({
        parameter: '' as 'pH' | 'ORP' | 'Temperatura' | '',
        status: '' as 'optimal' | 'warning' | 'danger' | '',
        dateRange: 'all' as 'all' | 'today' | 'week' | 'month'
    });

  // Búsqueda rápida
    const handleQuickSearch = (query: string) => {
        setSearchQuery(query);
        performSearch(query);
    };

  // Realizar búsqueda
    const performSearch = (query: string) => {
    setIsSearching(true);
    
    setTimeout(() => {
        let results = mockSearchData;
    
      // Filtrar por texto de búsqueda
        if (query) {
        const searchTerm = query.toLowerCase();
        results = results.filter(item =>
            item.title.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm) ||
            item.parameter.toLowerCase().includes(searchTerm)
        );
    }
    
      // Aplicar filtros avanzados
        if (activeFilters.parameter) {
            results = results.filter(item => item.parameter === activeFilters.parameter);
    }
    
        if (activeFilters.status) {
            results = results.filter(item => item.status === activeFilters.status);
    }
    
      // Aplicar filtro de fecha (simplificado)
    if (activeFilters.dateRange !== 'all') {
        results = results.filter(item => {
            const itemDate = new Date(item.timestamp);
            const today = new Date();
            const diffTime = Math.abs(today.getTime() - itemDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            switch (activeFilters.dateRange) {
            case 'today': return diffDays <= 1;
            case 'week': return diffDays <= 7;
            case 'month': return diffDays <= 30;
            default: return true;
            }
        });
        }
    
      // Agregar highlight al texto encontrado
    if (query) {
        results = results.map(item => ({
        ...item,
        highlight: query
        }));
    }
    
    setSearchResults(results);
    setIsSearching(false);
    }, 500);
};

  // Efecto para búsqueda en tiempo real
    useEffect(() => {
        if (searchQuery.length > 2) {
            performSearch(searchQuery);
        } else if (searchQuery.length === 0) {
            setSearchResults([]);
        }
    }, [searchQuery, activeFilters]);

  // Función para obtener color según estado
    const getStatusColor = (status: SearchResult['status']) => {
        switch (status) {
            case 'optimal': return '#4caf50';
            case 'warning': return '#ffaa00';
            case 'danger': return '#ff4444';
            default: return '#757575';
        }
    };

  // Función para obtener ícono según tipo
    const getTypeIcon = (type: SearchResult['type']) => {
        switch (type) {
            case 'reading': return 'chart-line';
            case 'alert': return 'alert';
            case 'maintenance': return 'toolbox';
            default: return 'help';
            }
    };

  // Renderizar resultado de búsqueda
    const renderSearchResult = ({ item }: { item: SearchResult }) => {
        const highlightText = (text: string, highlight?: string) => {
            if (!highlight) return text;
            
            const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
            return parts.map((part, index) =>
                part.toLowerCase() === highlight.toLowerCase() ? (
                <Text key={index} style={styles.highlightedText}>
                    {part}
                </Text>
                ) : (
                part
                )
        );
    };

    return (
    <Card style={styles.resultCard}>
            <Card.Content>
            <View style={styles.resultHeader}>
                <View style={styles.resultTitleContainer}>
                    <Text style={styles.resultTitle}>
                        {highlightText(item.title, item.highlight)}
                    </Text>
                    <Chip 
                        mode="outlined"
                        textStyle={styles.chipText}
                        style={[styles.statusChip, { backgroundColor: getStatusColor(item.status) }]}
                    >
                        {item.status.toUpperCase()}
                    </Chip>
                </View>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
            
            <Text style={styles.resultDescription}>
                {highlightText(item.description, item.highlight)}
            </Text>
            
            {item.value > 0 && (
                <View style={styles.valueContainer}>
                    <Text style={styles.valueText}>
                        {item.parameter}: <Text style={styles.valueNumber}>{item.value}</Text>
                        {item.parameter === 'Temperatura' ? '°C' : item.parameter === 'ORP' ? ' mV' : ''}
                    </Text>
                </View>
            )}
            
                <View style={styles.resultFooter}>
                    <Chip 
                        mode="outlined"
                        style={styles.typeChip}
                        textStyle={{ color: '#205781' }}
                        >
                        {item.type.toUpperCase()}
                    </Chip>
                    <TouchableOpacity style={styles.detailsButton}>
                        <Text style={styles.detailsButtonText}>Ver detalles</Text>
                    </TouchableOpacity>
                </View>
            </Card.Content>
    </Card>
    );
    };

    return (
    <View style={styles.container}>
      {/* Barra de búsqueda principal */}
        <Searchbar
        placeholder="Buscar en lecturas, alertas, mantenimiento..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
        placeholderTextColor="#666"
        iconColor="#205781"
        onSubmitEditing={() => performSearch(searchQuery)}
        />

      {/* Búsquedas rápidas */}
        <View style={styles.quickSearchesSection}>
            <Text style={styles.sectionTitle}>Búsquedas Rápidas</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.quickSearchesContainer}>
                    {quickSearches.map((quickSearch) => (
                        <TouchableOpacity
                            key={quickSearch.id}
                            style={styles.quickSearchButton}
                            onPress={() => handleQuickSearch(quickSearch.query)}
                            >
                            <Text style={styles.quickSearchText}>{quickSearch.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>

      {/* Filtros avanzados */}
        <View style={styles.filtersSection}>
        <Text style={styles.sectionTitle}>Filtros Avanzados</Text>
        
        <View style={styles.filtersContainer}>
          {/* Filtro por parámetro */}
            <View style={styles.filterGroup}>
                <Text style={styles.filterLabel}>Parámetro</Text>
                <View style={styles.filterChips}>
                    {(['', 'pH', 'ORP', 'Temperatura'] as const).map((param) => (
                    <Chip
                        key={param}
                        selected={activeFilters.parameter === param}
                        onPress={() => setActiveFilters(prev => ({ ...prev, parameter: param }))}
                        style={[
                        styles.filterChip,
                        activeFilters.parameter === param && { backgroundColor: '#205781' }
                        ]}
                        textStyle={activeFilters.parameter === param ? { color: '#fff' } : { color: '#205781' }}
                    >
                        {param || 'TODOS'}
                    </Chip>
                    ))}
                </View>
            </View>

            {/* Filtro por estado */}
            <View style={styles.filterGroup}>
                <Text style={styles.filterLabel}>Estado</Text>
                <View style={styles.filterChips}>
                {(['', 'optimal', 'warning', 'danger'] as const).map((status) => (
                    <Chip
                        key={status}
                        selected={activeFilters.status === status}
                        onPress={() => setActiveFilters(prev => ({ ...prev, status: status }))}
                        style={[
                            styles.filterChip,
                            activeFilters.status === status && { backgroundColor: '#205781' }
                        ]}
                        textStyle={activeFilters.status === status ? { color: '#fff' } : { color: '#205781' }}
                        >
                        {status || 'TODOS'}
                    </Chip>
                ))}
                </View>
            </View>

          {/* Filtro por fecha */}
        <View style={styles.filterGroup}>
                <Text style={styles.filterLabel}>Período</Text>
                <View style={styles.filterChips}>
                {(['all', 'today', 'week', 'month'] as const).map((period) => (
                    <Chip
                    key={period}
                    selected={activeFilters.dateRange === period}
                    onPress={() => setActiveFilters(prev => ({ ...prev, dateRange: period }))}
                    style={[
                        styles.filterChip,
                        activeFilters.dateRange === period && { backgroundColor: '#205781' }
                    ]}
                    textStyle={activeFilters.dateRange === period ? { color: '#fff' } : { color: '#205781' }}
                    >
                    {period === 'all' ? 'TODOS' : 
                    period === 'today' ? 'HOY' :
                    period === 'week' ? 'SEMANA' : 'MES'}
                    </Chip>
                ))}
                </View>
            </View>
        </View>
    </View>

        <Divider style={styles.divider} />

      {/* Resultados de búsqueda */}
        <View style={styles.resultsSection}>
            <View style={styles.resultsHeader}>
                <Text style={styles.resultsTitle}>
                    {isSearching ? 'Buscando...' : `Resultados (${searchResults.length})`}
                </Text>
                {searchResults.length > 0 && (
                    <TouchableOpacity style={styles.clearButton}>
                    <Text style={styles.clearButtonText}>Limpiar</Text>
                    </TouchableOpacity>
                )}
            </View>

            {searchQuery && !isSearching && searchResults.length === 0 && (
            <View style={styles.noResults}>
                <Text style={styles.noResultsText}>No se encontraron resultados para "{searchQuery}"</Text>
            </View>
            )}

            {!searchQuery && searchResults.length === 0 && (
            <View style={styles.initialState}>
                <Text style={styles.initialStateText}>
                Realiza una búsqueda para ver resultados
                </Text>
            </View>
            )}

            <FlatList
            data={searchResults}
            renderItem={renderSearchResult}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.resultsList}
            />
        </View>
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
        marginBottom: 16,
        elevation: 2,
        backgroundColor: '#fff',
    },
    quickSearchesSection: {
        
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#205781',
        marginBottom: 12,
    },
    quickSearchesContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    quickSearchButton: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#205781',
        minWidth: 120,
    },
    quickSearchText: {
        color: '#205781',
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
    },
    filtersSection: {
        marginBottom: 16,
    },
    filtersContainer: {
        gap: 16,
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
    resultsSection: {
        flex: 1,
    },
    resultsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    resultsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#205781',
    },
    clearButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    clearButtonText: {
        color: '#205781',
        fontSize: 12,
        fontWeight: '500',
    },
    resultsList: {
        paddingBottom: 16,
    },
    resultCard: {
        marginBottom: 12,
        elevation: 2,
        backgroundColor: '#fff',
    },
    resultHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    resultTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    resultTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
        flexShrink: 1,
        color: '#205781',
    },
    statusChip: {
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
    resultDescription: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
        lineHeight: 20,
    },
    highlightedText: {
        backgroundColor: '#FFF59D',
        fontWeight: 'bold',
        color: '#205781',
    },
    valueContainer: {
        backgroundColor: '#f8f9fa',
        padding: 8,
        borderRadius: 4,
        marginBottom: 12,
        borderLeftColor: '#205781',
        borderLeftWidth: 2,
    },
    valueText: {
        fontSize: 13,
        color: '#205781',
        fontWeight: '500',
    },
    valueNumber: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    resultFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    typeChip: {
        borderColor: '#205781',
    },
    detailsButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    detailsButtonText: {
        color: '#205781',
        fontSize: 12,
        fontWeight: '500',
    },
    noResults: {
        padding: 20,
        alignItems: 'center',
    },
    noResultsText: {
        color: '#666',
        fontSize: 14,
        textAlign: 'center',
    },
    initialState: {
        padding: 40,
        alignItems: 'center',
    },
    initialStateText: {
        color: '#666',
        fontSize: 14,
        textAlign: 'center',
        fontStyle: 'italic',
    },
});

export default SearchScreen;