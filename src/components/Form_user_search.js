import MapView from 'react-native-maps';
import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import RNPickerSelect from 'react-native-picker-select';
export default class Form_user_search extends Component <{}>{
      render(){
        return(
          <View style={styles.container}>
          <Text style={styles.Anuncio}> Busqueda Baa </Text>
            <View style={styles.contenedor_formulario}>

               <TextInput style= {styles.input_box}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder= 'Tipo Vehiculo'
                placeholderTextColor= '#212121' />

                <TextInput style= {styles.input_box}
                 underlineColorAndroid='rgba(0,0,0,0)'
                 placeholder= 'Tipo Cobro'
                 placeholderTextColor= '#212121' />
                  <TextInput style= {styles.input_box}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder= 'Horario'
                  placeholderTextColor= '#212121' />

                </View>

                 <TouchableOpacity style={styles.button}>
                   <Text style={styles.textButton}> Buscar </Text>
                 </TouchableOpacity>

             </View>

        )
      }


}


const styles = StyleSheet.create({
  container:{

    justifyContent: 'center',
    alignItems: 'center'

    },

  contenedor_formulario:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse'
  },

 input_box: {
   width: 120,
   backgroundColor:'#fff9c4',
   borderRadius: 25,
   paddingHorizontal: 20,
   fontSize: 18,
   color: '#212121',
   marginVertical: 10,


 },
 textButton: {
   fontSize: 24,
   fontWeight: '300',
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
 Anuncio: {
   marginVertical: 8,
   fontSize: 20,
   color: '#ffd600'
 },

});
