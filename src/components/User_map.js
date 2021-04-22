import MapView from 'react-native-maps';
import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,

} from 'react-native';

import Form_user_search from '../components/Form_user_search';
export default class User_map extends Component <{}>{
      render(){
        return(
          <View>
          <View style={styles.container}>
               <MapView

                 style={styles.map}
                 region={{
                   latitude: 37.78825,
                   longitude: -122.4324,
                   latitudeDelta: 0.015,
                   longitudeDelta: 0.0121,
                 }}
               >
               </MapView>
            </View>
            <View>
               <Form_user_search/>
            </View>
             </View>

        )
      }


}


const styles = StyleSheet.create({

  container: {
     height: 500,
     width: 400,
     justifyContent: 'flex-end',
     alignItems: 'center',
     marginVertical: 20





 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },



 input_box: {
   width: 300,
   backgroundColor:'#fff9c4',
   borderRadius: 25,
   paddingHorizontal: 16,
   fontSize: 18,
   color: '#212121',
   marginVertical: 10,
   flexGrow : 1,

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

});
