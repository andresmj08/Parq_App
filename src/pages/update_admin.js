import React, {Component, useState} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Switch, Alert }  from 'react-native';
import { Icon } from 'react-native-elements';





export default class Update_Admin_Info extends Component <{}> {

    
    constructor(props){
        super(props);


        const { params } = this.props.navigation.state;
        this.state = {
            id_admin: params.id_admin,
            Datos_admin: [],
            
            }
            this.getInfoAdmin();
     
        }


        
 componentDidMount(){
        this.getInfoAdmin();
    }


    getInfoAdmin = () => {

        const { id_admin }= this.state;

        fetch('http://34.217.178.10/Conexion_Parq_app/info_admin.php', {

        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            id_admin: id_admin,
        })
    }).then((respuesta)=> respuesta.json())
    .then((respuestaJson) => {
        
        this.setState({Datos_admin:respuestaJson});
        
        
    }).catch((error) => {
        alert(error);
    });

}


Actualizar_Info = () => {
    Alert.alert('Registro Apto para Guardar');
}





render() {


    
        
    return(
    <View style={styles.container}>

            <View style= {styles.div_tittle}>
                <Text style={styles.letter}>Modificar Informacion de Admin! <Icon name='pencil' size={30}  type='evilicon'  color='#ffd600' /> {"\n"}  _________________________________________</Text>
            </View>


            
            <View style={styles.div_inputs}>
                    <View style={{flexDirection: 'row'}}>

                        <Text style={styles.letter_labels}>Nombres:       </Text>
                        <TextInput
                            style = {styles.InputsText}
                            value = {this.state.Datos_admin.nombres}
                            
                        />
                    </View>

                    <View style={{flexDirection: 'row'}}>

                        <Text style={styles.letter_labels}>Apellidos:      </Text>
                        <TextInput
                            style = {styles.InputsText}
                            value = {this.state.Datos_admin.apellidos}
                            
                        />
                    </View> 

                    <View style={{flexDirection: 'row'}}>

                        <Text style={styles.letter_labels}>Documento:   </Text>
                        <TextInput
                            style = {styles.InputsText}
                            value = {this.state.Datos_admin.documento}
                            
                        />
                    </View>  

                    <View style={{flexDirection: 'row'}}>

                        <Text style={styles.letter_labels}>Teléfono:        </Text>
                        <TextInput
                            style = {styles.InputsText}
                            value = {this.state.Datos_admin.telefono}
                            
                        />
                    </View> 
                    
                    <View style={{flexDirection: 'row'}}>

                        <Text style={styles.letter_labels}>Correo:           </Text>
                        <TextInput
                            style = {styles.InputsText}
                            value = {this.state.Datos_admin.email}
                            
                        />
                    </View>  
                    
                     <View style={{flexDirection: 'row'}}>

                        <Text style={styles.letter_labels}>Contraseña:   </Text>
                        <TextInput
                            style = {styles.InputsText}
                            value = {this.state.Datos_admin.password}
                            
                        />
                    </View>            
                    
                    



            </View>

               
            <View style= {styles.div_button}>
              
                <TouchableOpacity style={styles.button} onPress={() => this.Actualizar_Info()} >
                  <Text style={styles.textButton}  > Actualizar Info Personal! </Text>
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
        padding: 10,
        flexDirection: "column",
        height: '100%'
        
      },div_tittle: {
        flex: 1
        
      },
      div_inputs: {
        flex: 6,
        justifyContent: 'space-around'
        
      },
      letter: {
        fontSize: 20,
        fontWeight: '200',
        color:'#ffd600',
        textAlign: 'center',
        marginVertical: 10,
      },
      InputsText:{
          borderWidth:2,
          width: 200,
          textAlign: 'center',
          borderBottomWidth:5,
          borderBottomColor: '#ffd600',
          backgroundColor: 'white',
          fontSize:15
      },
      fraccion: {
        flex: 2,
        height: 80,
        alignItems: "center",
    
        
      },
      InputsValues:{
          borderBottomWidth:5,
          borderBottomColor: '#ffd600',
          width: 120,
          textAlign: 'center',
          backgroundColor: 'white',
          fontSize:15
      },

      letter_labels: {
          fontSize: 15,
          fontWeight: 'bold'
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
        fontWeight: 'bold',
        color:'#212121',
        textAlign: 'center',
      },
      
      div_button: {
        flex: 2,
        
      }
  });
  