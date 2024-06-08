export interface Round {
    name: string;
    meanOfTransport: 'bus' | 'train';
    distance: number | null;
    stations: Stop[];
}

export interface Stop {
    stopName: string;
    stopLat: number;
    stopLon: number;
    stopId: number;
    departures: Departure[];
    trips: Trip[];
}

export interface Trip {
    tripId: number;
    serviceId: number;
    stops: Stop[];
}

export interface Departure {
    time: Date;
    destination: string;
}

