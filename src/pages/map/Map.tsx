import RouteSelector from "../../components/route-selector/RouteSelector";
import {useEffect, useState} from "react";
import fetchData from "../../api/clients/trip-client";
import {Stop} from "../../api/interfaces/sample";


const Map = () => {

    const [data, setData] = useState<Stop[]>([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await fetchData();
                setData(result);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        getData();

        }, []);

    return (
        <div>
            <RouteSelector data={data}/>
        </div>
    );
}

export default Map;
