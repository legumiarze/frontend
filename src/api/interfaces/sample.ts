export interface Route {
    routeColor: string,
    routeTextColor: string,
    routeShortName: string,
    routeId: string,
    routeType: number, // 3 -> autobusy, 2 -> pociagi
    routeLongName: string
}

export interface Stop {
    stopName: string;
    stopLat: number;
    stopLon: number;
    stopId: string;
    departures: Departure[];
    trips: Trip[];
}

export interface Trip {
    tripId: string;
    serviceId: string;
    stops: Stop[];
}

export interface Departure {
    time: Date;
    destination: string;
}

