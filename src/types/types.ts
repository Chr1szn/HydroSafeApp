// src/types.ts
export interface WaterQualityData {
    id?: string;
    pH: number;
    ORP: number;
    temperature: number;
    status: 'optimal' | 'warning' | 'danger';
    timestamp: string;
}

export interface Alert {
    id: string;
    type: 'critical' | 'warning' | 'info' | 'resolved';
    title: string;
    message: string;
    parameter: 'pH' | 'ORP' | 'Temperatura';
    value: number;
    timestamp: string;
    isActive: boolean;
}