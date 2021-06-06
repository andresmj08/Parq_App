import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Icon } from 'react-native-elements';

import Logo from '../components/Logo';

export default class Menu_SuperAdmin extends Component <{}>{

    
    render(){
      return(
        <View style= {styles.container}>
              <Text style={styles.letter}>Bienvenido Super Admin David! <Icon name='user'  type='evilicon'  color='#ffd600'  /></Text>
              
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Poligono')}>
                  <Text style={styles.textButton} > <Icon name='pointer'  type='evilicon'  color='#616161' />  Definir Perimetro Urbano </Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Estadisticas_SA')}>
                  <Text style={styles.textButton} > <Icon name='chart'  type='evilicon'  color='#616161' /> Estadísticas del App </Text>
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
        fontSize: 15,
        fontWeight: '200',
        color:'#ffffff',
        textAlign: 'center',
        marginVertical: 10,
      },
    });
  