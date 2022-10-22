import * as React from 'react';
import { useState, useEffect } from 'react';
import MapView, { AnimatedRegion, Callout, Circle, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, useColorScheme, Image, Button, Pressable} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'axios';

const MapScreen = ({navigation}) => {
    const [ nationalData, setnationalData ] = useState({})
  
    const axiosInstance = axios.create({ baseURL: 'https://www.nationaltrust.org.uk/search/data/all-places' });

    useEffect(() => {
        axiosInstance.get().then((response) => {
            setnationalData(response.data)
        })
    }, [])

    //console.log(nationalData)

    const [region, setRegion] = useState({
        latitude: 55.378051,
        longitude: -3.435973,
        latitudeDelta: 10,
        longitudeDelta: 10,
      })
    
    const colourScheme = useColorScheme();
    const isDarkMode = colourScheme === "dark";

    return (
        <View style={{flex: 0, backgroundColor: "white"}}>
        <GooglePlacesAutocomplete
          placeholder='Search...'
          textInputProps={{
            placeholderTextColor: "grey"
          }}
          fetchDetails={true}
          autoFocus={true}
          GooglePlacesSearchQuery={{
            rankby: "distance"
          }}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            //console.log(data, details);
            setRegion({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.0222,
              longitudeDelta: 0.0221,
            })
          }}
          query={{
            key: "AIzaSyD60HFa9mBuqDJ_KAlwysZGEkB764K4UbU",
            language: 'en',
          }}
          styles = {{
            container: { flex: 0, position: "absolute", zIndex: 1, marginTop: 60, margin: 10, width: "95%"},
            listView: { backgroundColor: "white" }
          }}
        />
    
        <MapView 
          style={styles.map} 
          region={region}
          showsCompass={false}
          userInterfaceStyle={isDarkMode ? "dark" : "light"}
        >
          {Object.values(nationalData).map(index => {
            return <Marker
              //onPress={() => navigation.navigate("DetailsScreen")}
              key={index.id} 
              coordinate={index.location}
              width={"auto"}
              height={"auto"}
              pinColor="#659136"
              onCalloutPress={() => navigation.push("DetailsScreen", {paramA: index.id})}
            >
              <Callout style={styles.callout}>
                <Text style={styles.calloutTitle}>{index.title}</Text>
                <Pressable style={styles.calloutButton}>
                  <Text style={styles.calloutText}>Find More</Text>
                </Pressable>
              </Callout>
            </Marker>
          })}
        </MapView>
      </View>
    )
}

export default MapScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      map: {
        width: Dimensions.get('window').width,
        height: (Platform.OS === 'ios') ? Dimensions.get('window').height : "100%",
      },
      calloutTitle: {
        fontWeight: "bold"
      },
      calloutButton: {
        backgroundColor: "#659136",
        alignItems: "center",
        borderRadius: 25,
      },
      calloutText: {
        color: "white",
        margin: 5
      },
      callout: {
      }
})

