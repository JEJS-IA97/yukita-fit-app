import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface YieldProps {
    lastBatchKilos: number;
    arepasProduced: number;
    averageGramsPerArepa?: number;
    }

    export const ProductionYieldCard: React.FC<YieldProps> = ({
    lastBatchKilos,
    arepasProduced,
    averageGramsPerArepa = 112.5, // 900g / 8 arepas = 112.5g aprox
    }) => {
    const totalPacksYield = (arepasProduced / 8).toFixed(1);

    return (
        <View style={styles.card}>
        <Text style={styles.title}>Última Tanda de Masa</Text>
        <View style={styles.row}>
            <View style={styles.metric}>
            <Text style={styles.label}>Yuca Usada</Text>
            <Text style={styles.value}>{lastBatchKilos} kg</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.metric}>
            <Text style={styles.label}>Arepas Obt.</Text>
            <Text style={styles.value}>{arepasProduced} und</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.metric}>
            <Text style={styles.label}>Rendimiento</Text>
            <Text style={styles.highlight}>{totalPacksYield} Packs</Text>
            </View>
        </View>
        <Text style={styles.footerNote}>
            * Promedio peso por arepa: {averageGramsPerArepa}g (Pack 8 und = ~900g)
        </Text>
        </View>
    );
    };

    const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        marginHorizontal: 20,
        padding: 16,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        marginBottom: 16,
    },
    title: { fontSize: 14, fontWeight: '700', color: '#0f172a', marginBottom: 12 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    metric: { alignItems: 'center', flex: 1 },
    label: { fontSize: 11, color: '#64748b' },
    value: { fontSize: 16, fontWeight: '700', color: '#0f172a', marginTop: 2 },
    highlight: { fontSize: 16, fontWeight: '800', color: '#82bb2c', marginTop: 2 },
    divider: { width: 1, height: 28, backgroundColor: '#e2e8f0' },
    footerNote: { fontSize: 10, color: '#94a3b8', marginTop: 12, fontStyle: 'italic' },
});