
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 4.8152024;
const LONGITUDE = -75.7041791;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function Register_Parq(){

  const [Datos_Parq, setDatos_Parq] = useState({
          matricula: '',
          nombres: '',
          nit: '',
          direccion: '',
          latitud_map: '',
          longitud_map: ''
  })


  
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
    
    setDatos_Parq({... Datos_Parq, longitud_map : Marker_Position.longitude, latitud_map : Marker_Position.latitude});

    
    
  };



const Registrar_Parq = () => {
    const { matricula} = Datos_Parq;
    const { nombres } = Datos_Parq;
    const { nit } = Datos_Parq;
    const { direccion } = Datos_Parq;
    const { latitud_map } = Datos_Parq;
    const { longitud_map } = Datos_Parq;
  
  // alert( matricula + ' ' + nombres + ' ' + nit + ' ' + direccion + ' ' + latitud_map + ' ' + longitud_map);

  fetch('http://34.217.178.10/Conexion_Parq_app/register_parq.php', {
    method: 'POST',
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    },
    body: JSON.stringify({
        matricula:matricula,
        nombres:nombres,
        nit:nit,
        direccion:direccion,
        latitud_map:latitud_map,
        longitud_map:longitud_map
    })
}).then((respuesta)=> respuesta.json())
.then((respuestaJson) => {
  if(respuestaJson == "Vacios"){
        Alert.alert("Debes completar todos los campos");
  }else  if(respuestaJson == "Registrado"){
        Alert.alert("Parq Registrado con Exito!");
        this.props.navigation.navigate('Menu_Admin');
    }else{
        Alert.alert("No pudo completarse!");
    }
  
  
}).catch((error) => {
    console.error(error);
})


}
 

      return(
        <View style= {styles.container}>
            <View style= {styles.div_tittle}>
            <Text style={styles.letter}>Registrar Parquedero! <Icon name='plus'  type='evilicon'  color='#ffd600' /> {"\n"}  ____________________________________</Text>
            </View>

            <View style= {styles.div_inputs}>
            <TextInput
                  style= {styles.input_box}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder= 'Matricula'
                  placeholderTextColor= '#212121'
                  onChangeText = {matricula => setDatos_Parq({... Datos_Parq, matricula : matricula})}
                />
                
                <TextInput
                  style= {styles.input_box}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder= 'Nit'
                  placeholderTextColor= '#212121'
                  onChangeText = {nit => setDatos_Parq({... Datos_Parq,nit : nit})}
                />

                <TextInput
                  style= {styles.input_box}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder= 'Nombre Comercial'
                  placeholderTextColor= '#212121'
                  onChangeText = {nombres => setDatos_Parq({... Datos_Parq, nombres : nombres})}
                />

                <TextInput
                  style= {styles.input_box}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder= 'Dirección'
                  placeholderTextColor= '#212121'
                  onChangeText = {direccion => setDatos_Parq({... Datos_Parq, direccion : direccion})}
                />
                
              
              

            </View>

            <View style= {styles.div_map}>
                {/* <Text style={styles.letter}>Fija el Parqueadero en el Mapa</Text> */}
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

            <View style= {styles.div_button}>
                <TouchableOpacity style={styles.button} onPress={() => Registrar_Parq()} >
                  <Text style={styles.textButton}  > Registrar Parq! </Text>
                </TouchableOpacity>
            </View>
              
          </View>
    
      );
    
}


const styles = StyleSheet.create({
    container: {
      backgroundColor : '#616161',
      flex : 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      flexDirection: "column",
      
    },

      button: {
        width: 300,
        backgroundColor:'#ffd600',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 20,
        
    
      },
      textButton: {
        fontSize: 15,
        fontWeight: '200',
        color:'#212121',
        textAlign: 'center',
      },
      letter: {
        fontSize: 20,
        fontWeight: '200',
        color:'#ffd600',
        textAlign: 'center',
        marginVertical: 10,
      },
      input_box: {
        width: 300,
        backgroundColor:'#fff9c4',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 18,
        color: '#212121',
        marginVertical: 10,
        
    
      },
      textButton: {
        fontSize: 20,
        fontWeight: '200',
        color:'#212121',
        textAlign: 'center',
      },
      div_tittle: {
        flex: 1,
        
      },
      div_inputs: {
        flex: 3,
        
      },
      div_map: {
        flex: 3,
        
        width: '100%'
      },
      div_button: {
        flex: 2,
        
      },

      map: {
        height : '100%',
        width: '100%'
      }
    });
  