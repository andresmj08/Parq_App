import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Icon } from 'react-native-elements';

import Logo from '../components/Logo';

export default class HomeScreen extends Component <{}>{

    
    render(){
      return(
        <View style= {styles.container}>
              <Text ><Icon name='user'  type='evilicon'  color='#b6ad05' onPress={() => this.props.navigation.navigate('Login')}/> ¿Eres Administrador de un Parq? </Text>
              
              <Logo/> 

              <Text style={styles.letter}>Bienvenido a Parq Pereira!{"\n"}  ____________________________________</Text>
              <Text style={styles.perfil}> Te ayudamos a encontrar {"\n"} la mejor opción de Parqueo {"\n"} en Pereira! </Text>

              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Marker')}>
                  <Text style={styles.textButton} > Buscar Parqs! </Text>
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
  
    perfil: {
        marginVertical: 50,
        fontSize: 20,
        color: '#eeeeee',
        textAlign:'center',
        // fontFamily: "Comfortaa-Regular",
      },
      button: {
        width: 150,
        backgroundColor:'#ffd600',
        borderRadius: 25,
        marginVertical: 50,
        paddingVertical: 16,
        
    
      },
      textButton: {
        fontSize: 20,
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
    });
  