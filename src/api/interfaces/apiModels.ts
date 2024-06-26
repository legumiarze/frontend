export interface Route {
    routeColor: string,
    routeTextColor: string,
    routeShortName: string,
    routeId: string,
    routeType: number,
    routeLongName: string
    stops: Stop[]
    trip: Trip
    isSelected: boolean
}

export interface Stop {
    stopName: string;
    stopLat: number;
    stopLon: number;
    stopId: string;
    departures: Departure[];
    trips: Trip[];
    locationType: string;
}

export interface Trip {
    tripId: string;
    serviceId: string;
    stops: Stop[];
    route: Route
}

export interface Departure {
    time: Date;
    destination: string;
}

