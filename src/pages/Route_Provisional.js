
import React, {Component, useState, useEffect} from 'react';
import { TouchableOpacity,StyleSheet, Text, View, Dimensions, Modal, Alert } from 'react-native';
import MapView, {Marker, ProviderProptype} from 'react-native-maps';
import MapViewDirections, {} from 'react-native-maps-directions';
import { Icon } from 'react-native-elements';
import Info_Parq_Route from './Info_Parq_Route';
import * as Location from 'expo-location';

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
            duracion: 0,
            current_latitud: 0,
            current_longitud: 0,
            ubicacion: false,
            permiso_gps: false
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
        

        componentDidMount() {
            this._getLocationAsync();
          }
        
        _getLocationAsync = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                this.setState({ubicacion:false});
              return;
            }else{

                this.setState({ubicacion:true});

                let location = await Location.getCurrentPositionAsync({});
            
                this.setState({current_latitud : JSON.stringify(location.coords.latitude)});
                this.setState({current_longitud : JSON.stringify(location.coords.longitude)});
            }
      
         

            
            
           };

    


render() {

    

        const { params } = this.props.navigation.state;
        const latitudeDestino = params ? params.latitudeDestino : null;
        const longitudeDestino = params ? params.longitudeDestino : null;
        const Parqueadero = params ? params.Parqueadero : null;
        const Id_Parq = params ? params.Id_Parq : null;

        
        const origin = {latitude: this.state.current_latitud, longitude: this.state.current_longitud};
        const destination = { latitude: parseFloat(latitudeDestino), longitude: parseFloat(longitudeDestino)};
        

        const coordinates = [{
            latitude: this.state.current_latitud,
            longitude: this.state.current_longitud,
        },
        {
            latitude:  parseFloat(latitudeDestino),
            longitude: parseFloat(longitudeDestino),
        },
        ];

        
    return(
        <View style={StyleSheet.absoluteFillObject}>
            
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
                    title = { 'Bien' }
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
                        this.setState({ distancia: result.distance.toFixed(2)})
                        this.setState({ duracion: result.duration.toFixed(2)})
                    }}
                />
            )}
        
            
            </MapView>
                
                
                <Info_Parq_Route Parqueadero={Parqueadero} distancia={this.state.distancia} tiempo={this.state.duracion} Id_Parq={Id_Parq}/>
         
        </View>

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
