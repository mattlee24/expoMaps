import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios'
import MapView, { AnimatedRegion, Callout, Circle, Marker } from 'react-native-maps';

const DetailsScreen = ({route}) => {

    const [ placeData, setplaceData ] = useState({});
  
    const axiosInstance = axios.create({ baseURL: 'https://www.nationaltrust.org.uk/search/data/all-places' });

    useEffect(() => {
        axiosInstance.get().then((response) => {
            setplaceData(response.data[route.params.paramA])
        })
    }, []);

    //console.log(nationalData.location.latitude)

    //const latitude = nationalData.location.latitude;
    //const longitude = nationalData.location.longitude;

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.topView}>
                    <Image source={{ uri: placeData.imageUrl }} style={styles.image}></Image>
                    <View style={styles.titleview}>
                        <Text style={styles.title}>{placeData.title}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default DetailsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 30
    },
    topView: {
        backgroundColor: "white",
        height: "auto"
    },
    image: {
        width: "100%",
        height: 250,
    },
    titleview: {
        position: "absolute",
        backgroundColor: "white",
        width: "90%",
        height: "20%",
        margin: 220,
        alignSelf: "center",
        borderRadius: 25,
        shadowOffset: {
            width: 0,
            height: 4,
            },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5,
        justifyContent: "center",
        zIndex: 100
    },
    title: {
        textAlign: "center",
        color: "#007A3B",
        fontWeight: "bold"
    },
})