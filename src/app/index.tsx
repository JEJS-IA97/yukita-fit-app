import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '../components/Header';
import { PackStockOverview } from '../components/PackStockOverview';
import { ProductionYieldCard } from '../components/ProductionYieldCard';
import { FlavorStock } from '../types';

const INITIAL_FLAVORS: FlavorStock[] = [
  { id: 'natural', name: 'Natural', unitsInStock: 48, color: '#82bb2c' },
  { id: 'espinaca', name: 'Espinaca', unitsInStock: 32, color: '#014325' },
  { id: 'zanahoria', name: 'Zanahoria', unitsInStock: 24, color: '#f9b02d' },
  { id: 'remolacha', name: 'Remolacha', unitsInStock: 16, color: '#e11d48' },
  { id: 'chia', name: 'Chía', unitsInStock: 20, color: '#64748b' },
  { id: 'pimenton', name: 'Pimentón', unitsInStock: 8, color: '#dc2626' },
  { id: 'pimenton_ahumado', name: 'Pim. Ahumado', unitsInStock: 12, color: '#b91c1c' },
  { id: 'aji_dulce', name: 'Ají Dulce', unitsInStock: 24, color: '#f59e0b' },
  { id: 'al_ajillo', name: 'Al Ajillo', unitsInStock: 16, color: '#10b981' },
];

export default function DashboardScreen() {
  return (
    <View style={styles.mainContainer}>
      <Header partnerName="Socio" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <ProductionYieldCard lastBatchKilos={15} arepasProduced={133} />
        <PackStockOverview flavors={INITIAL_FLAVORS} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scroll: {
    paddingBottom: 32,
  },
});