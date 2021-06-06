import React, {Component} from 'react'
import { View, StyleSheet, Text } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts'
import { Icon } from 'react-native-elements';
 
export default class Estadisticas extends Component<{}> {



    render() {
        return(

            <View style={styles.container}> 
                <Text style={styles.letter}>Estadísticas Parq Pereira! <Icon name='plus'  type='evilicon'  color='#ffd600' /> {"\n"}  ____________________________________</Text>

                <View style={{alignItems:'center', marginTop:15}}>
                <Text style = {styles.letra_Informativa}>Tenemos: <Text style = {styles.bold}>30 Parqueaderos</Text> <Text style = {styles.letra_Informativa}> en el App </Text></Text>
                </View>

                <View style={{alignItems:'center', marginTop:15}}>
                <Text style = {styles.letra_Informativa}>De los Cuales Existen:</Text>
                </View>
                
                <View style={styles.row}>
                    
                  <View style={[styles.fraccion]}>
                  <Text style={styles.letter}>Activos</Text>
                  <Text style={styles.texto_valores}>30</Text>

                  </View>

                  <View style={[styles.fraccion]}>
                  <Text style={styles.letter}>Inactivos</Text>
                  <Text style={styles.texto_valores}>7</Text>

                  </View>
                  
               </View>


                <View style={{ marginTop:15}}>
                    <ProgressCircle style={{ height: 200 }} progress={0.25} progressColor={'#ffd600'} />
                </View>
            </View>
         

         )
    }
}




const styles = StyleSheet.create({
    container: {
      backgroundColor : '#616161',
      flex : 1,
      justifyContent: 'center',
    },
      letter: {
        fontSize: 20,
        fontWeight: '200',
        color:'#ffd600',
        textAlign: 'center',
        marginVertical: 10,
      },
      letra_Informativa: {
        fontSize:15,
        color: '#eeee',
        alignContent:'center'
      },
      bold: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        textDecorationLine: 'underline',
        fontSize: 15
      },
      row: {
        
        flexDirection: 'row',
        marginVertical: 10,
        
        
        
      },
      fraccion: {
        flex: 2,
        alignItems: "center",
        
      },
      texto_valores:{
          fontSize: 18,
          fontWeight:'bold',
          color: 'white'
      }
});