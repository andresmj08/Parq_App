import React, {Component} from 'react';
import { StyleSheet,View,Text,TouchableOpacity } from 'react-native';

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
              <FormLoginScreen/>
              <TouchableOpacity onPress={this.navegar}></TouchableOpacity>
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
  });
