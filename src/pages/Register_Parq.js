
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Dimensions, Image, Button,SafeAreaView, ScrollView, StatusBar, CheckBox } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
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
          longitud_map: '',
          valor_carro: '0',
          valor_moto: '0'
  })



  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [hora_apertura, setHoraApertura] = useState(new Date('2021-06-06T12:30:00'));
  const [hora_cierre, setHoraCierre] = useState(new Date('2021-06-06T23:30:00'));
  
  const [show_reloj_apertura, setShow_reloj_apertura] = useState(false);
  const [show_reloj_cierre, setShow_reloj_cierre] = useState(false);

  const [Marker_Position, setMarker_Position] = useState ({latitude : 4.813785, longitude :  -75.694961});

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


  const reloj_apertura = (event, selectedDate) => {
    const currentDate = selectedDate || hora_apertura;
    showTimepicker_Apertura(Platform.OS === 'ios');
    setHoraApertura(currentDate);
  };

  const reloj_cierre = (event, selectedDate) => {
    const currentDate = selectedDate || hora_cierre;
    showTimepicker_Cierre(Platform.OS === 'ios');
    setHoraCierre(currentDate);
  };

 
  const showTimepicker_Apertura = () => {
    setShow_reloj_apertura(true);
  };
  
  
  const showTimepicker_Cierre = () => {
    setShow_reloj_cierre(true);
  };


const Registrar_Parq = () => {
    const { matricula} = Datos_Parq;
    const { nombres } = Datos_Parq;
    const { nit } = Datos_Parq;
    const { direccion } = Datos_Parq;
    const { latitude } = Marker_Position;
    const { longitude } = Marker_Position;
    const { valor_carro } = Datos_Parq;
    const { valor_moto } = Datos_Parq;
    const { servicios } = Datos_Parq;
    const apertura  = hora_apertura.getHours()  + ':' +  hora_apertura.getMinutes() + ':00' ;
    const cierre  = hora_cierre.getHours()  + ':' + hora_cierre.getMinutes() + ':00';

//alert( matricula + ' ' + nombres + ' ' + nit + ' ' + direccion + ' ' + latitud_map + ' ' + longitud_map + ' carro '+ valor_carro + ' moto '+ valor_moto + ' ' + apertura + ' ' + cierre );


  fetch('http://34.217.178.10/Conexion_Parq_app/validacion_perimetro.php', {
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
        latitud_map:latitude,
        longitud_map:longitude,
        valor_carro:valor_carro,
        valor_moto: valor_moto,
        apertura: apertura,
        cierre: cierre,
        servicios: servicios,
    })
}).then((respuesta)=> respuesta.json())
.then((respuestaJson) => {
  if(respuestaJson == "Vacios"){
        Alert.alert("Atención","Debes completar todos los campos para registrar el parqueadero");

  }else if(respuestaJson == "Fuera_Perimetro"){

    Alert.alert("Ten Presente lo siguiente:","El parqueadero no puede ser registrado porque se encuentra fuera del perímetro delimitado por el administrador del sistema");

  }else  if(respuestaJson == "Registrado"){
        Alert.alert("Excelente","Parq Registrado con Exito!");
        
        
    }else  if(respuestaJson == "ya_existe_registro"){
      Alert.alert("Ten Presente","Ya existe un parqueadero registrado con la misma matrícula");
      
  }    
    else{
      Alert.alert("Lastimosamente","Esta accion No pudo completarse!");
    }
  
  
}).catch((error) => {
    alert(error);
})


}
 

      return(
        <SafeAreaView style={styles.container_view}>
          <ScrollView>
            <View style= {styles.container}>
                <View style= {styles.div_tittle}>
                  
                <Text style={styles.letter}>Registrar Parquedero! <Icon name='plus'  type='evilicon'  color='#ffd600' /> {"\n"}  ____________________________________</Text>
                </View>

                <View style= {styles.div_inputs}>

                <Text>*** Numero de Matrícula</Text>
                <TextInput
                      style= {styles.input_box}
                      underlineColorAndroid='rgba(0,0,0,0)'
                      placeholder= 'Matricula'
                      placeholderTextColor= '#212121'
                      onChangeText = {matricula => setDatos_Parq({... Datos_Parq, matricula : matricula})}
                    />
                    

                    <Text>*** Nit del Parq!</Text>
                    <TextInput
                      style= {styles.input_box}
                      underlineColorAndroid='rgba(0,0,0,0)'
                      placeholder= 'Nit'
                      placeholderTextColor= '#212121'
                      onChangeText = {nit => setDatos_Parq({... Datos_Parq,nit : nit})}
                    />


                  <Text>*** Nombre del establecimiento</Text>
                    <TextInput
                      style= {styles.input_box}
                      underlineColorAndroid='rgba(0,0,0,0)'
                      placeholder= 'Nombre Comercial'
                      placeholderTextColor= '#212121'
                      onChangeText = {nombres => setDatos_Parq({... Datos_Parq, nombres : nombres})}
                    />


                    <Text>*** Dirección del parq!</Text>
                    <TextInput
                      style= {styles.input_box}
                      underlineColorAndroid='rgba(0,0,0,0)'
                      placeholder= 'Dirección'
                      placeholderTextColor= '#212121'
                      onChangeText = {direccion => setDatos_Parq({... Datos_Parq, direccion : direccion})}
                    />

                    <Text>*** Servicios adicionales Ofrecidos</Text>
                    <TextInput
                      style= {styles.input_box}
                      underlineColorAndroid='rgba(0,0,0,0)'
                      placeholder= 'Servicios Adicionales Ofrecidos'
                      placeholderTextColor= '#212121'
                      onChangeText = {servicios => setDatos_Parq({... Datos_Parq, servicios : servicios})}
                    />
                    
                    <View style={styles.row}>
                      <View style={[styles.fraccion]}>
                        <Image source={require("../components/imagenes/Carro.png")} style={{ width: '50%', height: '50%', resizeMode: 'contain' }} />
                        <TextInput
                        style= {styles.input_box_value}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder= 'Valor_Hora'
                        placeholderTextColor= '#212121'
                        keyboardType = 'numeric'
                        onChangeText = {valor_carro => setDatos_Parq({... Datos_Parq,valor_carro : valor_carro})}
                      />
                      <Text>Valor Hora Carro</Text>
                      </View>

                      <View style={[styles.fraccion]}>
                        <Image source={require("../components/imagenes/Moto.png")} style={{ width: '50%', height: '50%', resizeMode: 'contain' }} />
                        <TextInput
                          style= {styles.input_box_value}
                          underlineColorAndroid='rgba(0,0,0,0)'
                          placeholder= 'Valor_Hora'
                          placeholderTextColor= '#212121'
                          keyboardType = 'numeric'
                          onChangeText = {valor_moto => setDatos_Parq({... Datos_Parq,valor_moto : valor_moto})}
                      />
                      <Text>Valor Hora Moto</Text>
                      </View>
                  </View>

              
                  

                  <View style={styles.row}>
                      <View style={[styles.fraccion]}>
                      <Text style={styles.spinner_text}>  {hora_apertura.getHours()} : {hora_apertura.getMinutes()}   </Text>
                            <Button onPress={showTimepicker_Apertura} title="Hora Apertura" />
                    
                            {show_reloj_apertura && (
                              <DateTimePicker
                                value={hora_apertura}
                                mode='time'
                                is24Hour={false}
                                display="default"
                                minuteInterval={10}
                                onChange={reloj_apertura}
                              />
                            )}

                      </View>

                      <View style={[styles.fraccion]}>
                      <Text style={styles.spinner_text}> {hora_cierre.getHours()} : {hora_cierre.getMinutes()}   </Text>
                      <Button onPress={showTimepicker_Cierre} title="Hora Cierre" />
                              {show_reloj_cierre && (
                                <DateTimePicker
                                  value={hora_cierre}
                                  mode='time'
                                  is24Hour={false}
                                  display="default"
                                  minuteInterval={10}
                                  onChange={reloj_cierre}
                                />
                              )}
                              
                      </View>
                      
                  </View>
                      
                  

                </View>

                <View style= {styles.div_map}>
                    
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
                      <Text style={styles.spinner_text}><Icon name='spinner' size={30} type='evilicon'  color='#b6ad05'/>Obteniendo Ubicación Real</Text>
                    }
                </View>

               <Text style={styles.letter_titles}>Seleccione los Dias laborales </Text>
              <View style={styles.checkboxContainer}>
                <CheckBox
                  value={true}
                  style={styles.checkbox}
               /><Text>Lunes</Text>
               <CheckBox
                  value={true}
                  style={styles.checkbox}
               /><Text>Martes</Text>
               <CheckBox
                  value={true}
                  style={styles.checkbox}
               /><Text>Miercoles</Text>
               <CheckBox
                  value={true}
                  style={styles.checkbox}
               /><Text>Jueves</Text>
               <CheckBox
                  value={true}
                  style={styles.checkbox}
               /><Text>Viernes</Text>
              </View>
              <View style={styles.checkboxContainer}>
              <CheckBox
                  value={false}
                  style={styles.checkbox}
               /><Text>Sábado</Text>
               <CheckBox
                  value={false}
                  style={styles.checkbox}
               /><Text>Domingo</Text>
              </View>
              

                

                <View style= {styles.div_button}>
                  
                    <TouchableOpacity style={styles.button} onPress={() => Registrar_Parq()} >
                      <Text style={styles.textButton}  > Registrar Parq! </Text>
                    </TouchableOpacity>
                </View>
                  
              </View>

            </ScrollView>
    </SafeAreaView>
        
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
      height: '100%'
      
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
      input_box_value: {
        width: 130,
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
        flex: 5,
        justifyContent:'space-between'
        
      },
      div_map: {
        flex: 1,
        marginVertical: 10,
        width: '100%',
        minHeight: Dimensions.get("window").height / 3,
      },
      div_button: {
        flex: 1,
        
      },

      map: {
        height : '100%',
        width: '100%'
      },
      spinner_text:{
        fontSize: 20,
        fontWeight: '100',
        color:'#ffd600',
        textAlign: 'center',

      },
      row: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 10,
        
        
        
      },
      fraccion: {
        flex: 2,
        height: 150,
        alignItems: "center",
    
        
      },
      container_view: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
      },
      letter_titles: {
        fontSize: 18,
        fontWeight: '200',
        color:'white',
        textAlign: 'center',
        marginVertical: 10,
      },
      
      checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
      },
      checkbox: {
        alignSelf: "center",
      },
    });
  