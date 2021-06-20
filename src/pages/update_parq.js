import React, {Component, useState} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Switch, Alert, SafeAreaView, ScrollView, Dimensions }  from 'react-native';
import { Icon } from 'react-native-elements';
import MapView, {Marker} from 'react-native-maps';



const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 4.8152024;
const LONGITUDE = -75.7041791;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Update_Parq_View extends Component <{}> {

    
    constructor(props){
        super(props);


        const { params } = this.props.navigation.state;
        this.state = {
            id_parq: params.id_parq,
            Datos_Parq: [],
            marker_latitud: 4.813785,
            marker_longitude :  -75.694961,
            nombre: null,
            matricula: null,
            nit: null,
            direccion: null,
            servicios: null,
            apertura: null,
            cierre:null,
            hora_carro: null,
            hora_moto: null,
            estado: false,
            tmp_lat:null,
            tmp_lon:null
            
            }
            this.getInfoParqs();
     
        }


        
 componentDidMount(){
        this.getInfoParqs();
    }


    getInfoParqs = () => {

        const { id_parq }= this.state;

        fetch('http://34.217.178.10/Conexion_Parq_app/new_info_sitios.php', {

        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            id_parq: id_parq,
        })
    }).then((respuesta)=> respuesta.json())
    .then((respuestaJson) => {
        
        this.setState({Datos_Parq:respuestaJson});
        this.setState({nombre: this.state.Datos_Parq.nombre});
        this.setState({matricula: this.state.Datos_Parq.matricula});
        this.setState({nit: this.state.Datos_Parq.nit});
        this.setState({direccion: this.state.Datos_Parq.direccion});
        this.setState({servicios: this.state.Datos_Parq.servicios});
        this.setState({apertura: this.state.Datos_Parq.apertura});
        this.setState({cierre: this.state.Datos_Parq.cierre});
        this.setState({hora_moto: this.state.Datos_Parq.hora_moto});
        this.setState({hora_carro: this.state.Datos_Parq.hora_carro});
        this.setState({estado: this.state.Datos_Parq.estado});
        this.setState({marker_latitud: parseFloat(this.state.Datos_Parq.latitud_map)});
        this.setState({marker_longitude: parseFloat(this.state.Datos_Parq.longitud_map)});

        
        
    }).catch((error) => {
        alert(error);
    });

}






actualizar_nombre = (text) => {
    this.setState({nombre:text})
};
actualizar_matricula = (text) => {
    this.setState({matricula:text})
};
actualizar_nit = (text) => {
    this.setState({nit:text})
};
actualizar_direccion = (text) => {
    this.setState({direccion:text})
};

actualizar_servicios = (text) => {
    this.setState({servicios:text})
};

actualizar_apertura = (text) => {
    this.setState({apertura:text})
};

actualizar_cierre = (text) => {
    this.setState({cierre:text})
};

actualizar_hora_carro = (text) => {
    this.setState({hora_carro:text})
};

actualizar_hora_moto = (text) => {
    this.setState({hora_moto:text})
};


Cambiar_Estado = () => {

    const nuevo_estado = !this.state.estado;
    this.setState({estado : nuevo_estado});
         
}

 onMapPress = (e) => {
    // alert(e.nativeEvent.coordinate.latitude);
    this.setState({marker_latitud : e.nativeEvent.coordinate.latitude});
    this.setState({marker_longitude : e.nativeEvent.coordinate.longitude});
    


    
    
  };




Actualizar_Info = () => {
    const { id_parq } = this.state;
    const { nombre } = this.state;
    const { matricula } = this.state;
    const { nit } = this.state;
    const { direccion } = this.state;
    const { servicios } = this.state;
    const { apertura } = this.state;
    const { cierre } = this.state;
    const { hora_carro } = this.state;
    const { hora_moto } = this.state;
    const { estado } = this.state;

    const { marker_latitud } = this.state;
    const { marker_longitude } = this.state;

    fetch('http://34.217.178.10/Conexion_Parq_app/actualizar_info_parq.php', {

    method: 'POST',
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    },
    body: JSON.stringify({
        id_parq: id_parq,
        nombre: nombre,
        matricula: matricula,
        nit: nit,
        direccion: direccion,
        servicios: servicios,
        apertura: apertura,
        cierre: cierre,
        valor_carro: hora_carro,
        valor_moto: hora_moto,
        estado: estado,
        latitud_map:marker_latitud,
        longitud_map:marker_longitude

    })
}).then((respuesta)=> respuesta.json())
.then((respuestaJson) => {
    if(respuestaJson == "Actualizado"){

            Alert.alert("Muy bien!", "Actualizaste los datos del Parqueadero");

      }else if(respuestaJson == "Vacios"){

            Alert.alert("Atención!", "Tienes datos sin llenar");
        
      }else if(respuestaJson == "ya_existe_registro"){

            Alert.alert("Matricula Existente", "La matricula ingresada ya esta asociadaa un parqueadero registrado, por favor valida e ingresa el dato correcto");

      }else if(respuestaJson == "Fuera_Perimetro"){

            Alert.alert("Parqueadero fuera de Zona", "La ubicacion del parqueadero se encuentra fuera de la zona delimitada por el Administrador");
      
      }

    
}).catch((error) => {
    alert(error);
});
}


render() {


    
        
    return(
        <SafeAreaView style={styles.container_view}>
            <ScrollView>
                <View style={styles.container}>
                    

                        <View style= {styles.div_tittle}>
                            <Text style={styles.letter}>Modificar Parq! <Icon name='pencil' size={30}  type='evilicon'  color='#ffd600' /> {"\n"}  ____________________________________</Text>
                        </View>
        
                        <View style={styles.div_inputs}>
                                <View style={{flexDirection: 'row'}}>

                                    <Text style={styles.letter_labels}>Nombre:   </Text>
                                    <TextInput
                                        style = {styles.InputsText}
                                        value = {this.state.nombre}
                                        onChangeText = {nombre => this.actualizar_nombre(nombre)}
                                    />
                                </View>
                                <View style={{flexDirection: 'row'}}>

                                    <Text style={styles.letter_labels}>Matricula: </Text>
                                    <TextInput
                                        style = {styles.InputsText}
                                        value = {this.state.matricula}
                                        onChangeText = {matricula => this.actualizar_matricula(matricula)}
                                    />
                                </View>
                                <View style={{flexDirection: 'row'}}>

                                    <Text style={styles.letter_labels}>Nit:             </Text>
                                    <TextInput
                                        style = {styles.InputsText}
                                        value = {this.state.nit}
                                        onChangeText = {nit => this.actualizar_nit(nit)}
                                    />
                                </View>
                                <View style={{flexDirection: 'row'}}>

                                    <Text style={styles.letter_labels}>Dirección: </Text>
                                    <TextInput
                                        style = {styles.InputsText}
                                        value = {this.state.direccion}
                                        onChangeText = {direccion => this.actualizar_direccion(direccion)}
                                    />
                                </View>

                                <View style={{flexDirection: 'row'}}>

                                    <Text style={styles.letter_labels}>Servicios: </Text>
                                    <TextInput
                                        style = {styles.InputsText}
                                        value = {this.state.servicios}
                                        onChangeText = {servicios => this.actualizar_servicios(servicios)}
                                    />
                                </View>            
                                
                                
                                <View style={{flexDirection: 'row'}}>
                                    <View style={[styles.fraccion]}>
                                        <Text style={styles.letter_labels}>Hora Apertura: </Text>
                                        <TextInput
                                        style = {styles.InputsValues}
                                        value = {this.state.apertura}
                                        keyboardType = 'numeric'
                                        onChangeText = {apertura => this.actualizar_apertura(apertura)}
                                    />
                                    </View>

                                    <View style={[styles.fraccion]}>
                                        <Text style={styles.letter_labels}>Hora Cierre: </Text>
                                        <TextInput
                                        style = {styles.InputsValues}
                                        value = {this.state.cierre}
                                        keyboardType = 'numeric'
                                        onChangeText = {cierre => this.actualizar_cierre(cierre)}
                                    />
                                    </View>
                                </View>  
                                
                                <View style={{flexDirection: 'row'}}>
                                    <View style={[styles.fraccion]}>
                                    <Text style={styles.letter_labels}> Valor Hora Carro </Text>
                                    <TextInput
                                        style = {styles.InputsValues}
                                        value = {this.state.hora_carro}
                                        keyboardType = 'numeric'
                                        onChangeText = {hora_carro => this.actualizar_hora_carro(hora_carro)}
                                    />
                                    </View>

                                    <View style={[styles.fraccion]}>
                                    <Text style={styles.letter_labels}> Valor Hora Moto </Text>
                                    <TextInput
                                        style = {styles.InputsValues}
                                        value = {this.state.hora_moto}
                                        keyboardType = 'numeric'
                                        onChangeText = {hora_moto => this.actualizar_hora_moto(hora_moto)}
                                    />
                                    </View>
                                </View>





                        </View>

                            <Text style={styles.letter_labels}> Estado en el App: </Text> 
                            <Switch
                                    trackColor={{ false: "white", true: "white" }}
                                    thumbColor={this.state.estado == 1 ? "#ffd600" : "red"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={this.Cambiar_Estado}
                                    value={this.state.estado}
                                    
                            />

                    {this.state.estado == 1 ? <Text style={{color:'white', fontWeight:'bold', fontSize: 20}}>Activo</Text> : <Text style={{color:'#A72626', fontWeight:'bold', fontSize: 20}}>Inactivo</Text>}


                    <View style= {styles.div_map}>
                    

                      <MapView
                          style={styles.map}
                          showsUserLocation
                          onPress= {e => this.onMapPress(e)}
                          initialRegion={{
                            latitude: 4.8152024,
                            longitude: -75.7041791,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,
                                            
                          }}
                        >
                          <Marker
                              coordinate= {{
                                latitude: this.state.marker_latitud,
                                longitude: this.state.marker_longitude
                              }}
                              image = {require('../components/imagenes/Marker_Map.png')}
                              
                              draggable
                          >
                            </Marker>

                  </MapView>
                    
              </View>

                        <View style= {styles.div_button}>
                        
                            <TouchableOpacity style={styles.button} onPress={() => this.Actualizar_Info()} >
                            <Text style={styles.textButton}  > Actualizar Info Parq! </Text>
                            </TouchableOpacity>
                        </View>


                </View>

                </ScrollView>
    </SafeAreaView>

    );
  }
}
    
const styles = StyleSheet.create({
    container: {
        backgroundColor : '#616161',
        flex : 1,
        alignItems: 'center',
        padding: 10,
        flexDirection: "column",
        height: '100%',
        minHeight: Dimensions.get("window").height / 1.07
        
      },div_tittle: {
        flex: 1
        
      },
      div_inputs: {
        flex: 6,
        justifyContent: 'space-around'
        
      },
      letter: {
        fontSize: 20,
        fontWeight: '200',
        color:'#ffd600',
        textAlign: 'center',
        marginVertical: 10,
      },
      InputsText:{
          borderWidth:2,
          width: 200,
          textAlign: 'center',
          borderBottomWidth:5,
          borderBottomColor: '#ffd600',
          backgroundColor: 'white',
          fontSize:15
      },
      fraccion: {
        flex: 2,
        height: 80,
        alignItems: "center",
    
        
      },
      InputsValues:{
          borderBottomWidth:5,
          borderBottomColor: '#ffd600',
          width: 120,
          textAlign: 'center',
          backgroundColor: 'white',
          fontSize:15
      },

      letter_labels: {
          fontSize: 15,
          fontWeight: 'bold'
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
        fontWeight: 'bold',
        color:'#212121',
        textAlign: 'center',
      },
      
      div_button: {
        flex: 2,
        
      },container_view: {
        flex: 1,
     
      },
      div_map: {
        flex: 1,
        marginVertical: 10,
        width: '100%',
        minHeight: Dimensions.get("window").height / 3,
      },
      map: {
        height : '100%',
        width: '100%'
      },
  });
  