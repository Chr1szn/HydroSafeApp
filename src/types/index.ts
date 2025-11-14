export interface WaterQualityData {
    id?: string; //number
    pH: number;
    ORP: number;
    temperature: number;
    timestamp: string;
    status: 'optimal' | 'warning' | 'danger';
}

export interface AppConfig {
    pH: {
    min: number;
    max: number;
    };
    ORP: {
    min: number;
    max: number;
    };
    temperature: {
    min: number;
    max: number;
    };
}