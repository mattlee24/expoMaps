import * as React from 'react';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function App() {

  const [pin, setPin] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
  })
  const [region, setRegion] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  return (
    <View style={{flex: 1}}>
      <GooglePlacesAutocomplete
        placeholder='Search...'
        fetchDetails={true}
        autoFocus={true}
        GooglePlacesSearchQuery={{
          rankby: "distance"
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
          setPin({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          })
          setRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0221,
          })
        }}
        query={{
          key: "AIzaSyAM0Qz2KaxfVQTNaiCCtQzQ66rlkUzEv90",
          language: 'en',
        }}
        styles = {{
          container: { flex: 0, position: "absolute", width: "95%", zIndex: 1, margin: 10, marginTop: 60},
          listView: { backgroundColor: "white" }
        }}
      />
      <MapView 
        style={styles.map} 
        region={region}
        showsCompass={false}
      >
        <Marker 
          coordinate={pin}
          pinColor="blue"
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag Start", e.nativeEvent.coordinate.latitude)
          }}
          onDragEnd={(e) => {
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            })
            setRegion({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            })
          }}
        >
          <Callout>
            <Text>I'm Here!</Text>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});