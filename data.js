import * as React from 'react';
import { useState, useEffect } from 'react';
import MapView, { AnimatedRegion, Callout, Circle, Marker } from 'react-native-maps';
import { Text } from 'react-native';
import axios from 'axios';

const DataResult = () => {
    const [data, setdata] = useState({})
    const axiosInstance = axios.create({ baseURL: 'https://www.nationaltrust.org.uk/search/data/all-places' });
    const markerLocationTest = axiosInstance.get().then((response) => {
            return (
                response.data
            )
        }
    )
    useEffect(() => {
        setdata(markerLocationTest);
      }, []);

      console.log(data)

    return (
        <Marker
            pinColor="blue"
        >
            <Callout>
                <Text>It Worked!</Text>
            </Callout>
        </Marker>
    )
}; 


export default DataResult;