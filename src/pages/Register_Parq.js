
import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import slide_marker from './slide_marker';

export default class Register_Parq extends Component <{}>{

  constructor(props){
    super(props);
    this.state = {
        isReady:false,
        matricula: '',
        nombres: '',
        nit: '',
        direccion: '',
        latitud_map: '',
        longitud_map: '' 
    };
}

Registrar_Parq = () => {
    const { matricula} = this.state;
    const { nombres } = this.state;
    const { nit } = this.state;
    const { direccion } = this.state;
    const { latitud_map } = this.state;
    const { longitud_map } = this.state;


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

    
    render(){
      return(
        <View style= {styles.container}>
              <Text style={styles.letter}>Registrar Parquedero! <Icon name='plus'  type='evilicon'  color='#ffd600' /> {"\n"}  ____________________________________</Text>
              
                      
              <TextInput
                  style= {styles.input_box}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder= 'Matricula'
                  placeholderTextColor= '#212121'
                  onChangeText = {matricula => this.setState({matricula})}
                />
                
                <TextInput
                  style= {styles.input_box}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder= 'Nit'
                  placeholderTextColor= '#212121'
                  onChangeText = {nit => this.setState({nit})}
                />

                <TextInput
                  style= {styles.input_box}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder= 'Nombre Comercial'
                  placeholderTextColor= '#212121'
                  onChangeText = {nombres => this.setState({nombres})}
                />

                <TextInput
                  style= {styles.input_box}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder= 'Dirección'
                  placeholderTextColor= '#212121'
                  onChangeText = {direccion => this.setState({direccion})}
                />
                
                 <TextInput
                  style= {styles.input_box}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder= 'Latitud_Mapa'
                  placeholderTextColor= '#212121'
                  onChangeText = {latitud_map => this.setState({latitud_map})}
                />
                
                <TextInput
                  style= {styles.input_box}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder= 'Longitud_Mapa'
                  placeholderTextColor= '#212121'
                  onChangeText = {longitud_map => this.setState({longitud_map})}
                />

                <TouchableOpacity style={styles.button} onPress={<slide_marker/>} >
                  <Text style={styles.textButton}  > mapa </Text>
                </TouchableOpacity>

               <TouchableOpacity style={styles.button} onPress={this.Registrar_Parq} >
                  <Text style={styles.textButton}  > Registrar Parq! </Text>
                </TouchableOpacity>

          </View>
    
      );
    }
}


const styles = StyleSheet.create({
    container: {
      backgroundColor : '#616161',
      flex : 1,
      alignItems: 'center',
      justifyContent: 'center',
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
      }
    });
  