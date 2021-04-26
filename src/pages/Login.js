import React, {Component} from 'react';
import { StyleSheet,View,Text,TouchableOpacity, TextInput } from 'react-native';
import MapView, {Marker, ProviderProptype} from 'react-native-maps';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Logo from '../components/Logo';
import FormLoginScreen from '../components/Form';
import HomeScreen from './Home';


export default class LoginScreen extends Component <{}>{
    
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
                />
              
               <TextInput
                  style= {styles.input_box}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder= 'Contraseña'
                  placeholderTextColor= '#212121'
                  secureTextEntry={true}
                  />

                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Menu_Admin')}>
                  <Text style={styles.textButton} > Iniciar Sesión </Text>
                </TouchableOpacity>

              
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
  });
