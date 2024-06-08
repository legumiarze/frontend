export interface Round {
    name: string;
    meanOfTransport: 'bus' | 'train';
    distance: number | null;
    stations: Stop[];
}

export interface Stop {
    name: string;
    lat: number;
    lon: number;
    departures: Departure[];
}

export interface Departure {
    time: Date;
    line: Stop;
}

export const mockRounds: Round[] = [
    {
        name: 'A1 Kraków - Mogilany - Myślenice',
        meanOfTransport: 'bus',
        distance: 25,
        stations: [
            {
                name: 'Kraków',
                lat: 50.0647,
                lon: 19.9450,
                departures: [
                    {
                        time: new Date('2024-06-08T08:00:00'),
                        line: { name: 'Mogilany', lat: 49.9381, lon: 19.8714, departures: [] }
                    },
                    {
                        time: new Date('2024-06-08T12:00:00'),
                        line: { name: 'Myślenice', lat: 49.8397, lon: 19.9383, departures: [] }
                    },
                ]
            },
            {
                name: 'Mogilany',
                lat: 49.9381,
                lon: 19.8714,
                departures: [
                    {
                        time: new Date('2024-06-08T09:00:00'),
                        line: { name: 'Kraków', lat: 50.0647, lon: 19.9450, departures: [] }
                    },
                    {
                        time: new Date('2024-06-08T10:00:00'),
                        line: { name: 'Myślenice', lat: 49.8397, lon: 19.9383, departures: [] }
                    },
                ]
            },
            {
                name: 'Myślenice',
                lat: 49.8397,
                lon: 19.9383,
                departures: [
                    {
                        time: new Date('2024-06-08T11:00:00'),
                        line: { name: 'Kraków', lat: 50.0647, lon: 19.9450, departures: [] }
                    },
                ]
            },
        ]
    },
    {
        name: 'A2 Wieliczka - Kraków - Oświęcim',
        meanOfTransport: 'bus',
        distance: 50,
        stations: [
            {
                name: 'Wieliczka',
                lat: 49.9873,
                lon: 20.0655,
                departures: [
                    {
                        time: new Date('2024-06-08T07:00:00'),
                        line: { name: 'Kraków', lat: 50.0647, lon: 19.9450, departures: [] }
                    },
                    {
                        time: new Date('2024-06-08T15:00:00'),
                        line: { name: 'Oświęcim', lat: 50.0344, lon: 19.2104, departures: [] }
                    },
                ]
            },
            {
                name: 'Kraków',
                lat: 50.0647,
                lon: 19.9450,
                departures: [
                    {
                        time: new Date('2024-06-08T08:00:00'),
                        line: { name: 'Wieliczka', lat: 49.9873, lon: 20.0655, departures: [] }
                    },
                    {
                        time: new Date('2024-06-08T10:00:00'),
                        line: { name: 'Oświęcim', lat: 50.0344, lon: 19.2104, departures: [] }
                    },
                ]
            },
            {
                name: 'Oświęcim',
                lat: 50.0344,
                lon: 19.2104,
                departures: [
                    {
                        time: new Date('2024-06-08T12:00:00'),
                        line: { name: 'Kraków', lat: 50.0647, lon: 19.9450, departures: [] }
                    },
                ]
            },
        ]
    },
    {
        name: 'P1 Kraków - Tarnów - Nowy Sącz',
        meanOfTransport: 'train',
        distance: 90,
        stations: [
            {
                name: 'Kraków',
                lat: 50.0647,
                lon: 19.9450,
                departures: [
                    {
                        time: new Date('2024-06-08T06:00:00'),
                        line: { name: 'Tarnów', lat: 50.0125, lon: 20.9869, departures: [] }
                    },
                    {
                        time: new Date('2024-06-08T14:00:00'),
                        line: { name: 'Nowy Sącz', lat: 49.6214, lon: 20.6970, departures: [] }
                    },
                ]
            },
            {
                name: 'Tarnów',
                lat: 50.0125,
                lon: 20.9869,
                departures: [
                    {
                        time: new Date('2024-06-08T08:00:00'),
                        line: { name: 'Kraków', lat: 50.0647, lon: 19.9450, departures: [] }
                    },
                    {
                        time: new Date('2024-06-08T16:00:00'),
                        line: { name: 'Nowy Sącz', lat: 49.6214, lon: 20.6970, departures: [] }
                    },
                ]
            },
            {
                name: 'Nowy Sącz',
                lat: 49.6214,
                lon: 20.6970,
                departures: [
                    {
                        time: new Date('2024-06-08T18:00:00'),
                        line: { name: 'Kraków', lat: 50.0647, lon: 19.9450, departures: [] }
                    },
                ]
            },
        ]
    },
];

