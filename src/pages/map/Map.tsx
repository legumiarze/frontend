import RouteSelector from "../../components/route-selector/RouteSelector";
import {useEffect, useState} from "react";
import {fetchStopsByLocation} from "../../api/clients/tripClient";
import {Stop} from "../../api/interfaces/sample";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";




const Map = () => {

    return (
        <div>
            <RouteSelector />
        </div>
    );
}

export default Map;
