import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Card, Chip, Divider } from 'react-native-paper';

    const AnalysisScreen = () => {
    const [selectedAnalysis, setSelectedAnalysis] = useState<'comparative' | 'trends' | 'statistics'>('comparative');

    // Datos de ejemplo para análisis
    const analysisData = {
        weeklyTrends: [
        { day: 'Lun', pH: 7.3, ORP: 680, temp: 27 },
        { day: 'Mar', pH: 7.4, ORP: 700, temp: 28 },
        { day: 'Mié', pH: 7.2, ORP: 650, temp: 29 },
        { day: 'Jue', pH: 7.5, ORP: 720, temp: 26 },
        { day: 'Vie', pH: 7.1, ORP: 620, temp: 30 },
        { day: 'Sáb', pH: 7.3, ORP: 690, temp: 28 },
        { day: 'Dom', pH: 7.4, ORP: 710, temp: 27 },
        ],
        statistics: {
        avgPH: 7.3,
        avgORP: 682,
        avgTemp: 27.9,
        timeInOptimal: 85,
        criticalEvents: 2,
        stabilityIndex: 4.2
        },
        insights: [
        "El pH tiende a bajar los viernes",
        "ORP estable en las últimas 2 semanas",
        "Recomendación: calibrar sensores",
        "Temperatura óptima mantenida"
        ]
    };

  // Gráfico simple de barras (simulado)
    const renderBarChart = (data: any[], key: string, color: string) => {
        const maxValue = Math.max(...data.map(item => item[key]));
        
        return (
        <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>{key.toUpperCase()} - Última Semana</Text>
            <View style={styles.barsContainer}>
            {data.map((item, index) => (
                <View key={index} style={styles.barGroup}>
                <View style={styles.barBackground}>
                    <View 
                    style={[
                        styles.bar, 
                        { 
                        height: `${(item[key] / maxValue) * 100}%`,
                        backgroundColor: color
                        }
                    ]} 
                    />
                </View>
                <Text style={styles.barLabel}>{item.day}</Text>
                <Text style={styles.barValue}>{item[key]}</Text>
                </View>
            ))}
            </View>
        </View>
        );
    };

    // Métricas estadísticas
    const renderStatistics = () => (
        <View style={styles.statsGrid}>
        <Card style={styles.statCard}>
            <Card.Content>
            <Text style={styles.statValue}>{analysisData.statistics.avgPH}</Text>
            <Text style={styles.statLabel}>pH Promedio</Text>
            </Card.Content>
        </Card>
        
        <Card style={styles.statCard}>
            <Card.Content>
            <Text style={styles.statValue}>{analysisData.statistics.avgORP}</Text>
            <Text style={styles.statLabel}>ORP Promedio</Text>
            </Card.Content>
        </Card>
        
        <Card style={styles.statCard}>
            <Card.Content>
            <Text style={styles.statValue}>{analysisData.statistics.avgTemp}°C</Text>
            <Text style={styles.statLabel}>Temp Promedio</Text>
            </Card.Content>
        </Card>
        
        <Card style={styles.statCard}>
            <Card.Content>
            <Text style={styles.statValue}>{analysisData.statistics.timeInOptimal}%</Text>
            <Text style={styles.statLabel}>Tiempo Óptimo</Text>
            </Card.Content>
        </Card>
        
        <Card style={styles.statCard}>
            <Card.Content>
            <Text style={styles.statValue}>{analysisData.statistics.criticalEvents}</Text>
            <Text style={styles.statLabel}>Eventos Críticos</Text>
            </Card.Content>
        </Card>
        
        <Card style={styles.statCard}>
            <Card.Content>
            <Text style={styles.statValue}>{analysisData.statistics.stabilityIndex}/5</Text>
            <Text style={styles.statLabel}>Estabilidad</Text>
            </Card.Content>
        </Card>
        </View>
    );

    // Insights automáticos
    const renderInsights = () => (
        <Card style={styles.insightsCard}>
        <Card.Content>
            <Text style={styles.sectionTitle}>💡 Insights Automáticos</Text>
            {analysisData.insights.map((insight, index) => (
            <View key={index} style={styles.insightItem}>
                <Text style={styles.insightBullet}>•</Text>
                <Text style={styles.insightText}>{insight}</Text>
            </View>
            ))}
        </Card.Content>
        </Card>
    );

    return (
        <ScrollView style={styles.container}>
        <Text style={styles.title}>📈 Análisis</Text>
        
        {/* Selector de tipo de análisis */}
        <View style={styles.analysisSelector}>
            {([
            { key: 'comparative', label: 'Comparativo', icon: '📊' },
            { key: 'trends', label: 'Tendencias', icon: '📈' },
            { key: 'statistics', label: 'Estadísticas', icon: '🧮' }
            ] as const).map(({ key, label, icon }) => (
            <Chip
                key={key}
                selected={selectedAnalysis === key}
                onPress={() => setSelectedAnalysis(key)}
                style={[
                styles.analysisChip,
                selectedAnalysis === key && { backgroundColor: '#205781' }
                ]}
                textStyle={selectedAnalysis === key ? { color: '#fff' } : { color: '#205781' }}
            >
                {icon} {label}
            </Chip>
            ))}
        </View>

        <Divider style={styles.divider} />

        {/* Contenido según selección */}
        {selectedAnalysis === 'comparative' && (
            <View>
            <Text style={styles.sectionTitle}>Comparación pH vs ORP</Text>
            {renderBarChart(analysisData.weeklyTrends, 'pH', '#4F959D')}
            {renderBarChart(analysisData.weeklyTrends, 'ORP', '#205781')}
            </View>
        )}

        {selectedAnalysis === 'trends' && (
            <View>
            <Text style={styles.sectionTitle}>Tendencias Semanales</Text>
            {renderBarChart(analysisData.weeklyTrends, 'temp', '#ff6b6b')}
            <Card style={styles.trendCard}>
                <Card.Content>
                <Text style={styles.trendTitle}>📈 Comportamiento Mensual</Text>
                <Text style={styles.trendText}>
                    • pH: Estable con variación de ±0.2{"\n"}
                    • ORP: Mejoró 5% este mes{"\n"}
                    • Temperatura: Dentro de rango óptimo
                </Text>
                </Card.Content>
            </Card>
            </View>
        )}

        {selectedAnalysis === 'statistics' && (
            <View>
            <Text style={styles.sectionTitle}>Métricas Estadísticas</Text>
            {renderStatistics()}
            {renderInsights()}
            
            <TouchableOpacity style={styles.reportButton}>
                <Text style={styles.reportButtonText}>📄 Generar Reporte PDF</Text>
            </TouchableOpacity>
            </View>
        )}
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
    analysisSelector: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    analysisChip: {
        borderColor: '#205781',
    },
    divider: {
        marginVertical: 8,
        backgroundColor: '#205781',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#205781',
        marginBottom: 16,
    },
    chartContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        elevation: 2,
    },
    chartTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#205781',
        marginBottom: 12,
        textAlign: 'center',
    },
    barsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 200,
    },
    barGroup: {
        alignItems: 'center',
        flex: 1,
    },
    barBackground: {
        height: 150,
        width: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        justifyContent: 'flex-end',
        marginBottom: 8,
    },
    bar: {
        width: 20,
        borderRadius: 10,
        minHeight: 10,
    },
    barLabel: {
        fontSize: 10,
        color: '#666',
        marginTop: 4,
    },
    barValue: {
        fontSize: 10,
        color: '#205781',
        fontWeight: 'bold',
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 16,
    },
    statCard: {
        width: '48%',
        backgroundColor: '#fff',
        elevation: 2,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#205781',
        textAlign: 'center',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        marginTop: 4,
    },
    insightsCard: {
        backgroundColor: '#fff',
        elevation: 2,
        marginBottom: 16,
    },
    insightItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    insightBullet: {
        fontSize: 16,
        color: '#205781',
        marginRight: 8,
    },
    insightText: {
        flex: 1,
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },
    trendCard: {
        backgroundColor: '#fff',
        elevation: 2,
        marginBottom: 16,
    },
    trendTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#205781',
        marginBottom: 8,
    },
    trendText: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },
    reportButton: {
        backgroundColor: '#205781',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    reportButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    });

export default AnalysisScreen;