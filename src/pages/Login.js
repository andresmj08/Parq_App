import React, {Component} from 'react';
import { StyleSheet,View,Text,TouchableOpacity, TextInput, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { AsyncStorage } from 'react-native';

import Logo from '../components/Logo';



export default class LoginScreen extends Component <{}>{
    
  constructor(props){
    super(props);
    this.state = {
      isReady : false,
      email : '',
      pass: ''
    };
  }

  Login = () => {
    const {email} = this.state;
    const {pass} = this.state;

    fetch('http://34.217.178.10/Conexion_Parq_app/login.php', {
      method: 'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        email:email,
        pass:pass
      })
    }).then((respuesta)=> respuesta.json())
    .then((respuestaJson) => {
      if(respuestaJson == "Correcto"){
        alert("Bienvenido Admin");
        this.props.navigation.navigate('Menu_Admin');
      }
      else{
        Alert.alert("Verifica tus datos");
      }
           
    }).catch((error) => {
        console.error(error);
    })

  }


      render(){
        return(
          <View style= {styles.container}>
              <Logo/>
              <Text style={styles.perfil}> Administrador de Sitio </Text>
              <TextInput 
                  style= {styles.input_box}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder= 'Usuario'
                  placeholderTextColor= '#212121'
                  onChangeText = {email => this.setState({email})}
                />
              
               <TextInput
                  style= {styles.input_box}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder= 'Contraseña'
                  placeholderTextColor= '#212121'
                  secureTextEntry={true}
                  onChangeText = {pass => this.setState({pass})}
                  />

                <TouchableOpacity style={styles.button} onPress={this.Login}>
                  <Text style={styles.textButton} > Iniciar Sesión </Text>
                </TouchableOpacity>
                <Text style={styles.letter}> ___________________________________________</Text>
                <Text style = {styles.textRegister} > ¿Aún no te has registrado? Toca aquí <Icon name='user'  type='evilicon'  color='#b6ad05' onPress={() => this.props.navigation.navigate('Registrar_Admin_Parq')}/></Text>
              <Text></Text>
          </View>
        )
      }


}




const styles = StyleSheet.create({
  letra: {
    color: '#ffffff',
    fontSize: 18,
  },
  container: {
    backgroundColor : '#616161',
    flex : 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  registrer_content:{
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',

  },

  registrer_text:{
    color: '#ffffff',
    fontSize: 18,
  },
  perfil: {
    marginVertical: 2,
    fontSize: 20,
    color: '#eeeeee'
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
  button: {
    width: 150,
    backgroundColor:'#ffd600',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 16,
    marginVertical: 10,

  },
  textRegister: {
    fontSize: 18,
    color:'#212121',
    textAlign: 'center',
  },
  });
