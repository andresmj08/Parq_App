
import React, {Component} from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import MapView, {Marker, ProviderProptype} from 'react-native-maps';
import * as Location from 'expo-location';


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 4.81756;
const LONGITUDE = -75.6920539;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;



export default class dev extends Component <{}> {
    constructor(){
        super();

        this.state = {
            region:{
                latitude: null,
                longitude: null,
                latitudeDelta : null,
                longitudeDelta : null
            },
            markers:[],
        }
        this.Sitios_Mapa()
    }

    calcDelta(current_latitude, current_longitude, accuracy){
        const oneDegreeOfLongitudInMeters = 111.32;
        const circumference = (40075 / 360);

        const LATITUDE_DELTA = accuracy *( 1 / (Math.cos(current_latitude) * circumference))
        const LONGITUDE_DELTA = (accuracy / oneDegreeOfLongitudInMeters)

        this.setState({
            region:{
                latitude : current_latitude,
                longitude : current_longitude,
                latitudeDelta : LATITUDE_DELTA,
                longitudeDelta : LONGITUDE_DELTA
            }
        })
    }

        UNSAFE_componentWillMount () {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const current_latitude = position.coords.latitude
                    const current_longitude = position.coords.longitude
                    const accuracy = position.coords.accuracy

                    this.calcDelta(current_latitude, current_longitude, accuracy)
                }
            )
        }

    Sitios_Mapa = () => {
      
      fetch('http://192.168.0.8/Parq_App_Conection/sitios.php', {
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
