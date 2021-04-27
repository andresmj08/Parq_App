
import React, {Component} from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import MapView, {Marker, ProviderProptype} from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 4.8152024;
const LONGITUDE = -75.7041791;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

//
export default class Mapa_Parqs extends Component <{}> {
    constructor(props){
        super(props);

        this.state = {
            region:{
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta : LATITUDE_DELTA,
                longitudeDelta : LONGITUDE_DELTA
            },
            markers:[],
        }
        this.Sitios_Mapa()
    }
    Sitios_Mapa = () => {
      
      fetch('http://34.217.178.10/sitios.php', {
        method:'POST',
        header:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        }
        // ,
        // body: JSON.stringify({
        //   "Id_Route" : "64",
        //   "Id_Partner" : "999"
        // })
      }).then((respuesta) => respuesta.json())
      .then((rtaJson) => {
          this.setState({markers:rtaJson})
      })
      .catch((error) => {
          console.error(error);
      })
      // fetch('http://192.168.0.7/Dev.php', { method: 'POST'})
      // .then((respuesta) => respuesta.json())
      // .then((rtaJson) => alert(rtaJson))
  }


render() {
    return(
      <View style={styles.container}>
        <MapView
          provider = {this.props.provider}
          style = {styles.map}
          scrollEnabled = {true}
          zoomEnabled = {true}
          minZoomLevel={10}
          pitchEnabled = {true}
          rotateEnabled = {true}
          initialRegion = {this.state.region}
          showsUserLocation = {true}
          followsUserLocation = {true}
          >
            
        {this.state.markers.map(marker => (
            <Marker
                key = {marker.id}
                coordinate = {{
                    latitude : parseFloat(marker.latitud_map),
                    longitude : parseFloat(marker.longitud_map)

                }}
                title = {marker.nombre}
                onPress={() => this.props.navigation.navigate('Ruta_al_Parq',{
                  latitudeDestino: parseFloat(marker.latitud_map),
                  longitudeDestino: parseFloat(marker.longitud_map),
                  Parqueadero: (marker.nombre)
                })
                }
                image = {require('../components/imagenes/Marker_Map.png')}
            />
        ))}
          </MapView>
      </View>
    );
  }
 
    }  

// MapUser.prototype = {
//   provider: ProviderProptype,
// }

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
