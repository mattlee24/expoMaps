import * as React from 'react';
import { useRef } from 'react';
import { useState, useEffect } from 'react';
import MapView from 'react-native-map-clustering';
import { Callout, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, useColorScheme, Image, Button, Pressable, Alert} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'axios';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';

const MapScreen = ({navigation}) => {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => { //useEffect function used to gain the users permission for their location.
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    // console.log(location.coords.latitude)
  }

    const [ nationalData, setnationalData ] = useState({})
  
    const axiosInstance = axios.create({ baseURL: 'https://www.nationaltrust.org.uk/search/data/all-places' });

    useEffect(() => {
        axiosInstance.get().then((response) => {
            setnationalData(response.data)
        })
    }, [])

    //console.log(nationalData)

    const [region, setRegion] = useState({ // sets the default view for the map on first load of the application
        latitude: 55.378051,
        longitude: -3.435973,
        latitudeDelta: 10,
        longitudeDelta: 10,
      })
    
    const colourScheme = useColorScheme();
    const isDarkMode = colourScheme === "dark";

    const calculateDistance = () => { // calculates distance from user and given location
      var dis = getDistance(
        { latitude: 51.528308, longitude: -0.3817765 },
        { latitude: 51.528308, longitude: -0.3817765 }
      );
      //console.log(`Distance\n\n${dis} Meters\nOR\n${dis / 1609} Miles`);
    };
    
    calculateDistance();

    const mapRef = useRef();

    const animateToRegion = (latitude, longitude) => {
      let region = { // when GooglePlacesAutoComplete gets an input, the map will animate to the location passed
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0222,
      };
  
      mapRef.current.animateToRegion(region, 2000); // the time it takes for the animation to complete
    };

    return (
        <View style={{flex: 0, backgroundColor: "white"}}>
        <GooglePlacesAutocomplete //Used to search the map
          placeholder='Search...'
          textInputProps={{
            placeholderTextColor: "grey"
          }}
          fetchDetails={true}
          autoFocus={true}
          GooglePlacesSearchQuery={{
            rankby: "distance",
          }}
          onPress={(data, details = null) => {
            //'details' is provided when fetchDetails = true 
            //console.log(details);
            animateToRegion(details.geometry.location.lat, details.geometry.location.lng)
          }}
          query={{
            key: "AIzaSyD60HFa9mBuqDJ_KAlwysZGEkB764K4UbU",
            language: 'en',
            components: 'country:uk', //set uk as boundry for searches 
          }}
          styles = {{ // styling for the seatch component and the corrosponding list displayed upon typing
            container: { flex: 0, position: "absolute", zIndex: 1, marginTop: 60, margin: 10, width: "95%"},
            listView: { backgroundColor: "white", borderRadius: 25 },
            poweredContainer: {
              display: "none"
            }
          }}
        />
    
        <MapView //map view
          ref={mapRef}
          style={styles.map} 
          initialRegion={region} // initial region set from component declared earlier
          clusterColor={"#007A3B"}
          showsCompass={false}
          userInterfaceStyle={isDarkMode ? "dark" : "light"}
          loadingEnabled={true}
          showsUserLocation={true}
        >
          {Object.values(nationalData).map(index => {
            return <Marker //When the marker is pressed a button will be displayed which allows 
              key={index.id} // the user to find out more information on that particular place
              coordinate={index.location} // (navigating to the details screen)
              width={"auto"}
              height={"auto"}
              pinColor="#007A3B"                                     // perameters passed to the details screen
              onCalloutPress={() => navigation.push("DetailsScreen", {paramA: index.id, paramB: index.location})}
            >                                       
              <Callout style={styles.callout}>{/* displays when the marker is pressed */}
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

const styles = StyleSheet.create({ //styling for the page
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
        backgroundColor: "#007A3B",
        alignItems: "center",
        borderRadius: 25,
      },
      calloutText: {
        color: "white",
        margin: 5
      },
})

