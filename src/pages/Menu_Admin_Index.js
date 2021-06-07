import { TextareaAutosize } from '@material-ui/core';
import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Icon } from 'react-native-elements';

export default class Menu_Admin_Index extends Component <{}>{


    constructor(props){
      super(props);

      const { params } = this.props.navigation.state;
      this.state = {
          id_admin: params.id_admin,
          nombre_admin: params.nombre_admin
        } 
      }


      Consultar_Editar_Parqs = () => {

        const id_admin = this.state.id_admin;
        this.props.navigation.navigate('Parqs_for_Admin',{id_admin});
      }



      Editar_admin_info = () => {

        const id_admin = this.state.id_admin;
        this.props.navigation.navigate('Update_Admin_Info',{id_admin});
      }


      Ver_parqs_map = () => {

        const id_admin = this.state.id_admin;
        this.props.navigation.navigate('Map_Admin_Sitio',{id_admin});
      }

    
    render(){

      
      return(
        <View style= {styles.container}>
              
              <View style={{flex:1, marginTop: 10}}>
              
                <Text style={styles.letter_top}> Hola:  <Text style={styles.nombres}>{this.state.nombre_admin}! {"\n"}
                </Text> Aquí puedes actualizar tus datos → <Icon name='gear'  type='evilicon' size={30}  color='#b6ad05' onPress={() => this.Editar_admin_info()}/> </Text>
                <Text style={styles.division}> {"\n"}  _____________________________________</Text>
              </View>
              
              <Text style={styles.letter}>Bienvenido Administrador! <Icon name='user'  type='evilicon'  color='#ffd600'  /></Text>
              
              <View style={{flex:2}}>
                  <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Registrar_Parq')}>
                      <Text style={styles.textButton} > <Icon name='plus'  type='evilicon'  color='#616161' />  Registrar un Parquedero </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.Consultar_Editar_Parqs()}>
                      <Text style={styles.textButton} > <Icon name='pencil'  type='evilicon'  color='#616161' />  Editar Mis Parqueaderos! </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.button} onPress={() => this.Ver_parqs_map()}>
                      <Text style={styles.textButton} > <Icon name='sc-telegram'  type='evilicon'  color='#616161' /> Ver Mis Parqueaderos en el Mapa! </Text>
                    </TouchableOpacity>
                </View>
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
        fontSize: 18,
        fontWeight: '200',
        color:'#ffffff',
        textAlign: 'center',
        marginVertical: 10,
      },

      nombres:{
        fontSize: 18,
        fontWeight: 'bold'
      },
      letter_top: {
        fontSize: 18,
        textAlign: 'center',
      },
      division: {
        color: '#b6ad05',
        fontSize: 20,
        fontWeight: 'bold'
      }


    });
  