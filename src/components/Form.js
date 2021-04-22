import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';

export default class FormLoginScreen extends Component <{}>{
      render(){
        return(
          <View style={styles.container}>
              <TextInput style= {styles.input_box}
               underlineColorAndroid='rgba(0,0,0,0)'
               
               placeholder= 'Usuario'
               placeholderTextColor= '#212121' />
              
               <TextInput style= {styles.input_box}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder= 'Contraseña'
                placeholderTextColor= '#212121'
                secureTextEntry={true}/>

                <TouchableOpacity style={styles.button}>
                  <Text style={styles.textButton}> Iniciar Sesión </Text>
                </TouchableOpacity>
          </View>

        )
      }


}


const styles = StyleSheet.create({
  container: {
    flex : 1,
    alignItems: 'center',
    justifyContent: 'center',
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
