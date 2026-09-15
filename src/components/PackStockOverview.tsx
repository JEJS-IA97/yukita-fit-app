import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { FlavorStock } from '../types';

interface PackStockOverviewProps {
    flavors: FlavorStock[];
    }

    export const PackStockOverview: React.FC<PackStockOverviewProps> = ({ flavors }) => {
    const totalArepas = flavors.reduce((acc, curr) => acc + curr.unitsInStock, 0);
    const totalPacksAvailable = Math.floor(totalArepas / 8);

    return (
        <View style={styles.container}>
        <View style={styles.summaryCard}>
            <View>
            <Text style={styles.summaryTitle}>Paquetes Disponibles (8 und / ~900g)</Text>
            <Text style={styles.summarySub}>Basado en inventario de arepas sueltas procesadas</Text>
            </View>
            <Text style={styles.summaryBadge}>{totalPacksAvailable} Packs</Text>
        </View>

        <Text style={styles.sectionTitle}>Stock por Sabor (Base para Packs)</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
            {flavors.map((item) => {
            const possibleSinglePacks = Math.floor(item.unitsInStock / 8);
            return (
                <View key={item.id} style={styles.card}>
                <View style={styles.header}>
                    <View style={[styles.dot, { backgroundColor: item.color }]} />
                    <Text style={styles.flavorName} numberOfLines={1}>{item.name}</Text>
                </View>
                <Text style={styles.stockVal}>
                    {item.unitsInStock} <Text style={styles.unit}>arepas</Text>
                </Text>
                <Text style={styles.packEquivalent}>
                    ~{possibleSinglePacks} packs puros
                </Text>
                </View>
            );
            })}
        </ScrollView>
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: { marginVertical: 12 },
    summaryCard: {
        backgroundColor: '#e2f5d3',
        padding: 16,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 16,
    },
    summaryTitle: { fontSize: 13, fontWeight: '700', color: '#014325' },
    summarySub: { fontSize: 11, color: '#475569', marginTop: 2 },
    summaryBadge: { fontSize: 18, fontWeight: '800', color: '#014325' },
    sectionTitle: { fontSize: 15, fontWeight: '700', color: '#0f172a', marginHorizontal: 20, marginBottom: 8 },
    scroll: { paddingLeft: 20, paddingRight: 10 },
    card: {
        backgroundColor: '#ffffff',
        padding: 12,
        borderRadius: 14,
        marginRight: 10,
        width: 130,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
    dot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
    flavorName: { fontSize: 12, fontWeight: '700', color: '#0f172a', flex: 1 },
    stockVal: { fontSize: 16, fontWeight: '800', color: '#014325' },
    unit: { fontSize: 10, fontWeight: '400', color: '#64748b' },
    packEquivalent: { fontSize: 10, color: '#82bb2c', fontWeight: '600', marginTop: 4 },
});