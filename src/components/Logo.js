import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
} from 'react-native';


export default class Logo extends Component <{}>{
      render(){
        return(
          <View style={styles.container}>
                <Image style={styles.ubicacion_logo} source= {require('./imagenes/logo.png')}/>
          </View>
        )
      }


}


const styles = StyleSheet.create({
  ubicacion_logo:{
    width: 70,
    height:100,
  },
  container: {
    flex : 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  });
