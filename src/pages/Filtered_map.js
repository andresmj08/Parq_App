
import React, {Component, useState} from 'react';
import { TouchableOpacity,StyleSheet, Text, View, Dimensions, Modal, Alert } from 'react-native';
import MapView, {Marker, ProviderProptype} from 'react-native-maps';
import MapViewDirections, {} from 'react-native-maps-directions';
import { Icon } from 'react-native-elements';
import Info_Parq_Route from './Info_Parq_Route';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 4.8152024;
const LONGITUDE = -75.7041791;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


const GOOGLE_MAPS_APIKEY = 'AIzaSyDIbhZya3xLEMiqNnX7gCvBSuEcMJBBuk8';


export default class Filtered_map extends Component <{}> {
    constructor(props){
        super(props);


        const { params } = this.props.navigation.state;

        this.state = {
            valor_inicial_var: params.valor_inicial,
            valor_final_var: params.valor_final,
            vehiculo_var :  params.vehiculo,
            region:{
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta : LATITUDE_DELTA,
                longitudeDelta : LONGITUDE_DELTA
                  },
             markers:[],
                },
                this.Sitios_Mapa_Filtro()
            }

Sitios_Mapa_Filtro = () => {
    const { valor_inicial_var } = this.state;
    const { valor_final_var } = this.state;
    const { vehiculo_var } = this.state;
    
                
    fetch('http://192.168.2.1/Parq_App_Conection/filter_parqs.php', {
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            valor_inicial:valor_inicial_var,
            valor_final: valor_final_var,
            tipo_vehiculo: vehiculo_var
        })
    }).then((respuesta)=> respuesta.json())
    .then((rtaJson) => {
        if(rtaJson == "Vacio"){
            alert('No se encontraron Registros');
        }else{
            this.setState({markers:rtaJson})
        }
    })
    .catch((error) => {
        alert('Tenemos este error:' + error);
    });

        
}      
    

    


render() {


       
        
    return(
    <View style={styles.container}>
        <View style= {styles.div_texto}>
            {
            this.state.markers.length 
            ?
             <Text style= {styles.titulo_filtros}>De los siguientes filtros : {"\n"}
             <Text style = {styles.letra_filtros}>Tipo de Vehiculo: <Text style = {styles.bold}>{ this.state.vehiculo_var  == 1 ? 'Carro' : 'Moto'}</Text> Valor Desde: <Text style = {styles.bold}>${this.state.valor_inicial_var}</Text> Hasta: <Text style = {styles.bold}>${this.state.valor_final_var}</Text> </Text></Text>
         :
            <Text style= {styles.titulo_sin_resultados}> No se encontraron Registros:{"\n"}
             <Text style = {styles.letra_filtros}>Por Favor cambia los valores de búsqueda</Text> </Text>
         }
         </View>

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
                  Parqueadero: (marker.nombre),
                  Id_Parq:(marker.id)
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
    },
    div_texto: {
        marginTop : 70,
        backgroundColor : '#616161',
        width: '100%',
        height: '10%'
    },
    titulo_filtros: {
        fontSize: 20,
        fontWeight: '200',
        color:'#ffd600',
        textAlign: 'center',
        
    },
    letra_filtros: {
        fontSize:15,
        color: '#eeee'
    },
    bold: {
        fontWeight: 'bold'
    },
    titulo_sin_resultados:{
        fontSize: 20,
        fontWeight: 'bold',
        color:'#E74C3C',
        textAlign: 'center',
    }
  });
  