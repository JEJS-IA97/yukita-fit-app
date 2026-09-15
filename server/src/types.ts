export interface Flavor {
    id: string;
    name: string;
    unitsInStock: number;
    color: string;
}

export interface CreateFlavorDTO {
    id: string;
    name: string;
    unitsInStock?: number;
    color?: string;
}

export interface UpdateStockDTO {
    unitsInStock: number;
}

export interface ProductionBatchDTO {
    yucaKilos: number;
    extraIngredientsGrams?: Record<string, number>;
    yieldPerFlavor: Record<string, number>;
}

export interface AssemblePackDTO {
    type: 'VARIADO' | 'MONOSABOR';
    items: { flavorId: string; quantity: number }[];
}