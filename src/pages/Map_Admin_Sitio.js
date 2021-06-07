
import React, {Component} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 4.8152024;
const LONGITUDE = -75.7041791;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

//
export default class Map_Admin_Sitio extends Component <{}> {

    
    constructor(props){
        super(props);

        const { params } = this.props.navigation.state;

        this.state = {
            region:{
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta : LATITUDE_DELTA,
                longitudeDelta : LONGITUDE_DELTA,
                id_admin: params.id_admin,
                tiene_parqs: false
            },
            markers:[],
        }
        this.Sitios_Mapa()
    }
    Sitios_Mapa = () => {
      
        const { id_admin } = this.state;

      fetch('http://34.217.178.10/Conexion_Parq_app/sitios_admin_map.php', {
        method:'POST',
        header:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
            id_admin:id_admin
        })
        
      }).then((respuesta) => respuesta.json())
      .then((rtaJson) => {
            if(rtaJson == "Vacio"){
                this.setState({tiene_parqs: false});
            }else{
                this.setState({markers:rtaJson});
                this.setState({tiene_parqs: true});
            }

          
      })
      .catch((error) => {
          console.error(error);
      })

  }


render() {
    return(
        
      <View style={styles.container}>

        {this.state.tiene_parqs ?

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
          :
                 <View style={{flex:8}}>
                    <View style={styles.item} >
                      <Text style={styles.estado_inactivo}>No Cuentas con ningun Parqueadero Registrado para Mostrar {"\n"}</Text>
                      <Text>Registra ahora mismo tus Parqueaderos en ParqApp  </Text>
                    </View>
                </View>
            }
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
  },
  estado_inactivo: {
    color: 'red',
    fontWeight:'bold'
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: 'white',
    borderTopColor: '#ffd600',
    borderTopWidth:5
  },
});
