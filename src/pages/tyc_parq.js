
import React, { Component} from 'react';
import { StyleSheet, Text, View,  Dimensions,SafeAreaView, ScrollView } from 'react-native';





export default class terminos_condiciones extends Component <{}>{
    
      render(){
        return(
      <SafeAreaView style={styles.container_view}>
        <ScrollView>



          <View style= {styles.container}>

          
          <View style= {styles.div_tittle}>
                  
                  <Text style={styles.letter}>TÉRMINOS Y CONDICIONES DE SERVICIO {"\n"}  ____________________________________</Text>
          </View>


          </View>

        </ScrollView>
    </SafeAreaView>
        )
      }


}




const styles = StyleSheet.create({
  
  container: {
    backgroundColor : '#616161',
    flex : 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get("window").height / 1.07,

  }, 
  container_view: {
    flex:1 ,

  },
  titulo: {
    fontSize: 14,
    color: 'white'
  },
  cuerpo: {
    fontSize: 12
  },
  div_tittle: {
    flex: 2,
    backgroundColor : '#616161',
  },
  letter: {
    fontSize: 20,
    fontWeight: '200',
    color:'#ffd600',
    textAlign: 'center',
    marginVertical: 10,
  },
  });
