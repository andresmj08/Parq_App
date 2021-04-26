import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';

import Logo from '../components/Logo';

export default class Register_Parq extends Component <{}>{

    
    render(){
      return(
        <View style= {styles.container}>
              <Text style={styles.letter}>Registrar Parquedero! <Icon name='plus'  type='evilicon'  color='#ffd600' /> {"\n"}  ____________________________________</Text>
              
                      
              <TextInput
                  style= {styles.input_box}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder= 'Matricula'
                  placeholderTextColor= '#212121'
                />
                
                <TextInput
                  style= {styles.input_box}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder= 'Nit'
                  placeholderTextColor= '#212121'
                />

                <TextInput
                  style= {styles.input_box}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder= 'Nombre Comercial'
                  placeholderTextColor= '#212121'
                />

                <TextInput
                  style= {styles.input_box}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder= 'Telefono'
                  placeholderTextColor= '#212121'
                />
                 <TextInput
                  style= {styles.input_box}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder= 'Direccion'
                  placeholderTextColor= '#212121'
                />


               <TouchableOpacity style={styles.button} >
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
  