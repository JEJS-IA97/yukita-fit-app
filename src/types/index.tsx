export type FlavorId = 'natural' | 'espinaca' | 'zanahoria' | 'remolacha' | 'chia' | 'pimenton' | 'pimenton_ahumado' | 'aji_dulce' | 'al_ajillo';

export interface FlavorStock {
    id: FlavorId;
    name: string;
    unitsInStock: number;
    color: string;
}

export interface PackItem {
    flavorId: FlavorId;
    quantity: number;
}

export interface FrozenPack {
    id: string;
    type: 'VARIADO' | 'MONOSABOR';
    items: PackItem[]; // Suma total siempre 8 unidades (~900g)
    weightGrams: number; // ~900g
}

export interface ProductionBatch {
    id: string;
    date: string;
    yucaKilos: number;
    extraIngredientsGrams: Record<string, number>;
    totalArepasProduced: number;
    yieldPerFlavor: Record<FlavorId, number>;
    }