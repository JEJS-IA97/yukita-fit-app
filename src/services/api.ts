import { Platform } from 'react-native';
const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3001/api' : 'http://localhost:3001/api';

export const fetchDashboardData = async () => {
    const response = await fetch(`${API_URL}/dashboard`);
    if (!response.ok) throw new Error('Error al obtener datos');
    return response.json();
};

export const assemblePack = async (type: 'VARIADO' | 'MONOSABOR', items: { flavorId: string; quantity: number }[]) => {
    const response = await fetch(`${API_URL}/packs/assemble`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, items }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
    }
    return response.json();
};