import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';

export default class Menu_SuperAdmin extends Component <{}>{


  definir_registro_cc() {

    fetch('http://34.217.178.10/Conexion_Parq_app/validar_registro_global_cc.php', {
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    }).then((respuesta)=> respuesta.json())
    .then((rtaJson) => {
        if(rtaJson == "Registros_Actualizados"){
            Alert.alert('Excelente','Se identificaron y marcaron los parqueaderos que están registrados en Cámara y Comercio');
        }else{
            alert("Ojo");
        }
    })
    .catch((error) => {
        alert('Tenemos este error:' + error);
    });
  }

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

                <TouchableOpacity style={styles.button} onPress={this.definir_registro_cc}>
                  <Text style={styles.textButton} > <Icon name='link'  type='evilicon'  color='#616161' /> Validar matrículas en Cámara y Comercio </Text>
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
        width: 350,
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
  