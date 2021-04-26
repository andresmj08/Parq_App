
import React, {Component} from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import MapView, {Marker, ProviderProptype} from 'react-native-maps';
import MapViewDirections, {} from 'react-native-maps-directions';
import { Icon } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 4.8152024;
const LONGITUDE = -75.7041791;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


const GOOGLE_MAPS_APIKEY = 'AIzaSyDIbhZya3xLEMiqNnX7gCvBSuEcMJBBuk8';


export default class Ruta_al_Parq extends Component <{}> {
    constructor(props){
        super(props);

        this.state = {
            distancia: 0,
            duracion: 0
        };

        this.MapView = null;

        }

        OnMapPress = (e) => {
            this.setState({
                coordinates: [
                    ...this.state.coordinates,
                    e.nativeEvent.coordinate,
                ],
            })
        }
        
    

    


render() {

        const { params } = this.props.navigation.state;
        const latitudeDestino = params ? params.latitudeDestino : null;
        const longitudeDestino = params ? params.longitudeDestino : null;
        const Parqueadero = params ? params.Parqueadero : null;

        const origin = {latitude: 4.801609, longitude: -75.705830 };
        const destination = { latitude: parseFloat(latitudeDestino), longitude: parseFloat(longitudeDestino)};
        

        const coordinates = [{
            latitude: 4.801609,
            longitude: -75.705830,
        },
        {
            latitude:  parseFloat(latitudeDestino),
            longitude: parseFloat(longitudeDestino),
        },
        ];

    return(
        
        <MapView
            style = { styles.map_style}
          initialRegion = {{
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
          }}
          style = {StyleSheet.absoluteFill}
          ref = {c => this.OnMapPress}
          
          
          >
        
        {coordinates.map((coordinate, index) => 
            <MapView.Marker 
                key = {`coordinate_${index}`} 
                coordinate = {coordinate}
                title = { Parqueadero }
                image = {require('../components/imagenes/Marker_Map.png')}
                 />
            
        )}

        {(coordinates.length >= 2 ) && (
            <MapViewDirections
                origin = {origin}
                destination = {destination}
                apikey = {GOOGLE_MAPS_APIKEY}
                strokeWidth = {3}
                strokeColor = "#BB9B15"
                onReady = { result => {
                    this.setState({ distancia: result.distance})
                    this.setState({ duracion: result.duration})
                }}
            />
        )}
       
       <View style = {styles.div_info}>
       <Text>  la Distancia hasta {Parqueadero} es de {this.state.distancia} Km </Text>
            <Text> Estas a {this.state.duracion} Minutos </Text>
            

        </View>
          </MapView>

    );
  }
}
    

const styles = StyleSheet.create({
  map_style: {
    marginTop: 20,
    flex: 10
  },

  div_info: {
      flex: 2,
      marginTop: 100,
  },


});
