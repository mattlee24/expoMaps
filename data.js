import * as React from 'react';
import MapView, { AnimatedRegion, Callout, Circle, Marker } from 'react-native-maps';
import { Text } from 'react-native';
import axios from 'axios';

const DataResult = () => {
    const axiosInstance = axios.create({ baseURL: 'https://www.nationaltrust.org.uk/search/data/all-places' });
    axiosInstance.get().then((response) => {
        let nationalData = [response.data]
        {nationalData.map((placeData) => {
            return (
                <Marker
                    coordinate={placeData.location}
                >
                    <Callout>
                        <Text>It Worked!</Text>
                    </Callout>
                </Marker>
            )
        })}
      }); 
}

export default DataResult;