import cors from 'cors';
import express, { Request, Response } from 'express';
import {
    AssemblePackDTO,
    CreateFlavorDTO,
    Flavor,
    ProductionBatchDTO
} from './types';

const app = express();
app.use(cors());
app.use(express.json());

// Estado en memoria dinámico (reemplazable por base de datos)
let inventory: Record<string, Flavor> = {};
let finishedPacks = 0;

/* ==========================================================================
   RUTAS DE GESTIÓN DE INVENTARIO Y SABORES (CRUD)
   ========================================================================== */

// 1. OBTENER TODO EL INVENTARIO Y DASHBOARD
app.get('/api/inventory', (_req: Request, res: Response) => {
    const flavorsList = Object.values(inventory);
    const totalArepas = flavorsList.reduce((acc, curr) => acc + curr.unitsInStock, 0);

    res.json({
        flavors: flavorsList,
        totalArepasSueltas: totalArepas,
        potentialPacks: Math.floor(totalArepas / 8),
        finishedPacksCount: finishedPacks,
    });
});

// 2. CREAR UN NUEVO SABOR
app.post('/api/inventory/flavor', (req: Request<{}, {}, CreateFlavorDTO>, res: Response) => {
    const { id, name, unitsInStock = 0, color = '#82bb2c' } = req.body;

    if (!id || !name) {
        return res.status(400).json({ error: 'El ID y el nombre del sabor son obligatorios.' });
    }

    const cleanId = id.toLowerCase().trim().replace(/\s+/g, '_');

    if (inventory[cleanId]) {
        return res.status(409).json({ error: `El sabor con ID '${cleanId}' ya existe.` });
    }

    inventory[cleanId] = {
        id: cleanId,
        name,
        unitsInStock: Math.max(0, unitsInStock),
        color,
    };

    return res.status(201).json({
        message: 'Sabor registrado exitosamente.',
        flavor: inventory[cleanId],
    });
});

// 3. ACTUALIZAR STOCK O DATOS DE UN SABOR (Ajuste Manual)
app.put('/api/inventory/flavor/:id', (req: Request<{ id: string }, {}, Partial<Flavor>>, res: Response) => {
    const { id } = req.params;
    const { name, unitsInStock, color } = req.body;

    if (!inventory[id]) {
        return res.status(404).json({ error: `El sabor '${id}' no existe.` });
    }

    if (name !== undefined) inventory[id].name = name;
    if (color !== undefined) inventory[id].color = color;
    if (unitsInStock !== undefined) {
        if (unitsInStock < 0) {
        return res.status(400).json({ error: 'El stock no puede ser negativo.' });
        }
        inventory[id].unitsInStock = unitsInStock;
    }

    return res.json({
        message: `Sabor '${id}' actualizado correctamente.`,
        flavor: inventory[id],
    });
});

// 4. ELIMINAR UN SABOR DEL CATÁLOGO
app.delete('/api/inventory/flavor/:id', (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    if (!inventory[id]) {
        return res.status(404).json({ error: `El sabor '${id}' no existe.` });
    }

    delete inventory[id];

    return res.json({
        message: `Sabor '${id}' eliminado del inventario.`,
    });
});

/* ==========================================================================
   RUTAS DE PRODUCCIÓN Y EMPAQUE
   ========================================================================== */

// 5. REGISTRAR TANDA DE PRODUCCIÓN (Aumenta stock según kilos de yuca procesados)
app.post('/api/production/batch', (req: Request<{}, {}, ProductionBatchDTO>, res: Response) => {
    const { yucaKilos, yieldPerFlavor } = req.body;

    if (!yucaKilos || !yieldPerFlavor || Object.keys(yieldPerFlavor).length === 0) {
        return res.status(400).json({ error: 'Debes indicar los kilos de yuca y el rendimiento por sabor.' });
    }

    const errors: string[] = [];

    // Validar existencia de sabores antes de modificar
    Object.keys(yieldPerFlavor).forEach((flavorId) => {
        if (!inventory[flavorId]) {
        errors.push(`El sabor '${flavorId}' no existe en el catálogo.`);
        }
    });

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    // Sumar arepas producidas
    Object.entries(yieldPerFlavor).forEach(([flavorId, count]) => {
        inventory[flavorId].unitsInStock += count;
    });

    return res.json({
        message: 'Tanda de producción registrada con éxito.',
        updatedInventory: Object.values(inventory),
    });
});

// 6. ARMAR PAQUETE CONGELADO (Descuenta 8 unds del stock de arepas procesadas)
app.post('/api/packs/assemble', (req: Request<{}, {}, AssemblePackDTO>, res: Response) => {
    const { items, type } = req.body;

    if (!items || !Array.isArray(items)) {
        return res.status(400).json({ error: 'Debes enviar la lista de ítems a empaquetar.' });
    }

    const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);
    if (totalUnits !== 8) {
        return res.status(400).json({ error: 'Un paquete debe contener exactamente 8 arepas (~900g).' });
    }

    // Validar disponibilidad
    for (const item of items) {
        const flavor = inventory[item.flavorId];
        if (!flavor) {
        return res.status(400).json({ error: `El sabor '${item.flavorId}' no existe.` });
        }
        if (flavor.unitsInStock < item.quantity) {
        return res.status(400).json({
            error: `Stock insuficiente de '${flavor.name}'. Disponibles: ${flavor.unitsInStock}, solicitadas: ${item.quantity}`,
        });
        }
    }

    // Descontar del inventario
    items.forEach((item) => {
        inventory[item.flavorId].unitsInStock -= item.quantity;
    });

    finishedPacks += 1;

    return res.json({
        message: `Paquete ${type} armado exitosamente.`,
        remainingInventory: Object.values(inventory),
        totalFinishedPacks: finishedPacks,
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Backend Yukita Fit ejecutándose en http://localhost:${PORT}`);
});