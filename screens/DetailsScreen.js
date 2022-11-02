import { StyleSheet, Text, View, Image, ScrollView, Pressable, ImageBackground } from 'react-native'
import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios'
import MapView, { AnimatedRegion, Callout, Circle, Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import clear from '../assets/clear.png'
import rainy from '../assets/rainy.png'
import snowy from '../assets/snowy.png'
import stormy from '../assets/stormy.png'
import sunny from '../assets/sunny.png'

const DetailsScreen = ({route, navigation}) => {

    let KEY = "ccf2524bfcfe4db4b4dc42c2457fe054"

    const [temperature, setTemperature] = useState("");
    const [backgroundUrl, setBackground] = useState(null)

    useEffect(() => {
        async function fetchWeather(lat, lon) {
            await axios
            .get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${KEY}&units=metric`)
            .then((response) => {
                console.log(response.data.weather[0].main);
                setTemperature(response.data.main.temp);
                if ( response.data.weather[0].main === "Rain") {
                    setBackground(Image.resolveAssetSource(rainy).uri)
                } else if (response.data.weather[0].main === "Clouds") {
                    setBackground(Image.resolveAssetSource(clear).uri)
                }

            })
            .catch(error => {
                console.log(error)
            });
        }
        fetchWeather(latitude, longitude)
    }, []);

    const [ placeData, setplaceData ] = useState({});
  
    const axiosInstance = axios.create({ baseURL: 'https://www.nationaltrust.org.uk/search/data/all-places' });

    useEffect(() => {
        const axoisGET = async () => {
            await axiosInstance.get().then((response) => {
                setplaceData(response.data[route.params.paramA])
            })
        }
        axoisGET();
    }, []);

    const {latitude, longitude} = route.params.paramB;

    const hasActivities = (activites) => {
        if (activites != null) {
            return (
                <View>
                    <Text style={styles.activitesTitle}>Activies:</Text>
                    <Text style={styles.openStatusText}>{placeData.activityTagsAsCsv}</Text>
                </View>
            )
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.topView}>
                    <Image source={{ uri: placeData.imageUrl }} style={styles.image} accessibilityLabel={placeData.imageDescription}></Image>
                    <View style={styles.titleview}>
                        <Pressable onPress={() => navigation.goBack()} style={styles.buttonback}>
                            <Ionicons name={"arrow-back-circle"} size={35} color={"#007A3B"}/>
                        </Pressable>
                        <Text style={styles.title} numberOfLines={1}>{placeData.title}</Text>
                    </View>
                </View>
                <View style={styles.openStatusView}>
                    <Text style={styles.moreInfo}>More Info</Text>
                    <Text style={styles.openStatusText}>{placeData.openingTimeStatus}</Text>
                    {hasActivities(placeData.activityTagsAsCsv)}
                </View>
                <View style={styles.mapOuterView} >
                    <MapView 
                        mapType={"mutedStandard"}
                        style={styles.map}
                        region={{
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 0.009,
                            longitudeDelta: 0.005,
                        }}
                        showsCompass={false}
                        loadingEnabled={true}
                        >
                        <Marker
                            key={route.params.paramA}
                            coordinate={route.params.paramB}
                            width={"auto"}
                            height={"auto"}
                            pinColor="#659136"
                        />
                    </MapView>
                </View>
                <View style={styles.weatherView}>
                    <ImageBackground 
                        source={{uri: backgroundUrl}}
                        resizeMode="cover"
                        style={styles.imageBackground}
                        imageStyle={{ borderRadius: 25}}
                    >
                        <Text style={styles.weatherTemperatureText}>{temperature}{"\u00B0"} C</Text>
                    </ImageBackground>
                </View>
            </View>
        </ScrollView>
    )
}

export default DetailsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 30,
        marginBottom: 100,
    },
    topView: {
        backgroundColor: "white",
        height: "auto"
    },
    topView: {
        backgroundColor: "white",
        height: "auto",
    },
    image: {
        width: "100%",
        height: 250,
    },
    titleview: {
        flexDirection: "row",
        position: "absolute",
        backgroundColor: "white",
        width: "95%",
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
        zIndex: 100,
    },
    title: {
        textAlign: "center",
        color: "#007A3B",
        fontWeight: "bold",
        alignSelf: "center",
        fontSize: 25,
        maxWidth: "70%"
    },
    buttonback: {
        alignSelf: "center",
        marginLeft: 5,
        position: "absolute",
        left: 0,
    },
    mapOuterView: {
        shadowOffset: {
            width: 0,
            height: 4,
            },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5,
        width: "95%",
        height: 200,
        borderWidth: 1,
        borderColor: "transparent",
        alignItems: "center",
        marginTop: 10,
        borderRadius: 25,
        overflow: (Platform.OS === "ios") ? "visible" : "hidden",
        alignSelf: "center"
    },
    map: {
        width: "100%",
        height: "100%",
        marginHorizontal: 10,
        borderRadius: 25
    },
    openStatusView: {
        backgroundColor: "white",
        width: "95%",
        height: "auto",
        marginTop: 30,
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
    openStatusText: {
        marginBottom: 15,
        marginTop: 10,
        color: "#007A3B",
        textAlign: "center"
    },
    moreInfo: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10,
        color: "#007A3B"
    },
    activitesTitle: {
        textAlign: "center",
        fontWeight: "bold",
        color: "#007A3B"
    },
    weatherView: {
        backgroundColor: "white",
        width: "95%",
        height: "12%",
        marginTop: 10,
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
    weatherTemperatureText: {
        color: "white",
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold"
    },
    imageBackground: {
        height: "100%",
        justifyContent: "center",
    }
})