
import React, {Component,  useState, useEffect}  from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';



const { width, height } = Dimensions.get('window');



const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0012;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;



export default function MarkerMap(){

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [Marker_Position, setMarker_Position] = useState ({latitude : 1, longitude : 1});

  useEffect(() => {
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

  let ubicacion = false;
  let current_latitud = '';
  let current_longitud = '';

  if (errorMsg) {
    ubicacion = false;
  } else if (location) {
     ubicacion = true;
     current_latitud = JSON.stringify(location.coords);
     current_longitud = JSON.stringify(location.coords.longitude);
     
  }

  
  const onMapPress = (e) => {
    // alert(e.nativeEvent.coordinate.latitude);
    setMarker_Position(e.nativeEvent.coordinate);
    
  };


  return(
    <View style={styles.container}>
        
          
        {
          ubicacion ? 
            <MapView
                style={styles.map}
                showsUserLocation
                onPress= {e => onMapPress(e)}
                initialRegion={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                                   
                }}
               >
                 <Marker
                    coordinate= {{
                      latitude: Marker_Position.latitude,
                      longitude: Marker_Position.longitude
                    }}
                    image = {require('../components/imagenes/Marker_Map.png')}
                    
                    draggable
                 >
                   </Marker>

        </MapView>
          :
          <Text>Obteniendo Ubicacion Real</Text>
        }
             
    </View>
  )

}




  



const styles = StyleSheet.create({
  container: {
      ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollview: {
    alignItems:'center',
    paddingVertical: 40
  },
  map: {
    height : '100%',
    width: '100%'
  }
});
