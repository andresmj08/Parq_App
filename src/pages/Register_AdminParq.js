import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, TextInput, Alert } from 'react-native';
import { Icon } from 'react-native-elements';

import Logo from '../components/Logo';

export default class Register_AdminParq extends Component <{}>{

    constructor(props){
        super(props);
        this.state = {
            isReady:false,
            nombres: '',
            apellidos: '',
            documento: '',
            telefono: '',
            correo: '',
            pass: '' 
        };
    }
    
    Registrar = () => {
        const { nombres} = this.state;
        const { apellidos } = this.state;
        const { documento } = this.state;
        const { telefono } = this.state;
        const { correo } = this.state;
        const { pass } = this.state;


      fetch('http://34.217.178.10/Conexion_Parq_app/register_admin_parq.php', {
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            nombres:nombres,
            apellidos:apellidos,
            documento:documento,
            telefono:telefono,
            correo:correo,
            pass:pass
        })
    }).then((respuesta)=> respuesta.json())
    .then((respuestaJson) => {
      if(respuestaJson == "Vacios"){
        Alert.alert("Debes completar todos los campos");
      }else if(respuestaJson == "Registrado"){
            Alert.alert("Usuario Registrado con Exito! Por favor inicie Sesion");
            this.props.navigation.navigate('Login');
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
              <Text style={styles.letter}>Registrar Administrador de Parqs! <Icon name='plus'  type='evilicon'  color='#ffd600' /> {"\n"}  ____________________________________</Text>
              
                      
              <TextInput
                  style= {styles.input_box}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder= 'Nombres'
                  placeholderTextColor= '#212121'
                  onChangeText = {nombres => this.setState({nombres})}
                />
                
                <TextInput
                  style= {styles.input_box}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder= 'Apellidos'
                  placeholderTextColor= '#212121'
                  onChangeText = {apellidos => this.setState({apellidos})}
                />

                <TextInput
                  style= {styles.input_box}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder= 'Nº Documento'
                  placeholderTextColor= '#212121'
                  onChangeText = {documento => this.setState({documento})}
                />
                
                <TextInput
                  style= {styles.input_box}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder= 'Celular'
                  placeholderTextColor= '#212121'
                  onChangeText = {telefono => this.setState({telefono})}
                />

                <TextInput
                  style= {styles.input_box}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder= 'Correo'
                  placeholderTextColor= '#212121'
                  onChangeText = {correo => this.setState({correo})}
                />

                 <TextInput
                  style= {styles.input_box}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder= 'Contraseña'
                  placeholderTextColor= '#212121'
                  onChangeText = {pass => this.setState({pass})}
                />


               <TouchableOpacity style={styles.button} onPress={this.Registrar}>
                  <Text style={styles.textButton}  > Registrarme </Text>
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
  
  