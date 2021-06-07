import React, {Component, useState} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Switch, Alert }  from 'react-native';
import { Icon } from 'react-native-elements';
import ReactDOM from 'react-dom';




export default class Update_Parq_View extends Component <{}> {

    
    constructor(props){
        super(props);


        const { params } = this.props.navigation.state;
        this.state = {
            id_parq: params.id_parq,
            Datos_Parq: [],
            
            }
            this.getInfoParqs();
     
        }


        
 componentDidMount(){
        this.getInfoParqs();
    }


    getInfoParqs = () => {

        const { id_parq }= this.state;

        fetch('http://34.217.178.10/Conexion_Parq_app/new_info_sitios.php', {

        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            id_parq: id_parq,
        })
    }).then((respuesta)=> respuesta.json())
    .then((respuestaJson) => {
        
        this.setState({Datos_Parq:respuestaJson});
        
        
    }).catch((error) => {
        alert(error);
    });

}


Actualizar_Info = () => {
    Alert.alert('Registro Apto para Guardar');
}


Cambiar_Estado = () => {

    const nuevo_estado = !this.state.Datos_Parq.estado;
    this.setState({Datos_Parq:{estado : nuevo_estado}});
         
}



render() {


    
        
    return(
    <View style={styles.container}>

            <View style= {styles.div_tittle}>
                <Text style={styles.letter}>Modificar Parq! <Icon name='pencil' size={30}  type='evilicon'  color='#ffd600' /> {"\n"}  ____________________________________</Text>
            </View>


            
            <View style={styles.div_inputs}>
                    <View style={{flexDirection: 'row'}}>

                        <Text style={styles.letter_labels}>Nombre: </Text>
                        <TextInput
                            style = {styles.InputsText}
                            value = {this.state.Datos_Parq.nombre}
                            onChangeText = {nombre => this.setState({Datos_Parq:nombre})}
                        />
                    </View>

                    <View style={{flexDirection: 'row'}}>

                        <Text style={styles.letter_labels}>Servicios: </Text>
                        <TextInput
                            style = {styles.InputsText}
                            value = {this.state.Datos_Parq.servicios}
                            onChangeText = {servicios => this.setState({Datos_Parq:servicios})}
                        />
                    </View>            
                    
                    
                    <View style={{flexDirection: 'row'}}>
                        <View style={[styles.fraccion]}>
                            <Text style={styles.letter_labels}>Hora Apertura: </Text>
                            <TextInput
                            style = {styles.InputsValues}
                            value = {this.state.Datos_Parq.apertura}
                            onChangeText = {apertura => this.setState({Datos_Parq:apertura})}
                        />
                        </View>

                        <View style={[styles.fraccion]}>
                            <Text style={styles.letter_labels}>Hora Cierre: </Text>
                            <TextInput
                            style = {styles.InputsValues}
                            value = {this.state.Datos_Parq.cierre}
                            onChangeText = {cierre => this.setState({Datos_Parq:cierre})}
                        />
                        </View>
                    </View>  
                    
                    <View style={{flexDirection: 'row'}}>
                        <View style={[styles.fraccion]}>
                        <Text style={styles.letter_labels}> Valor Hora Carro </Text>
                        <TextInput
                            style = {styles.InputsValues}
                            value = {this.state.Datos_Parq.hora_carro}
                            onChangeText = {hora_carro => this.setState({Datos_Parq:hora_carro})}
                        />
                        </View>

                        <View style={[styles.fraccion]}>
                        <Text style={styles.letter_labels}> Valor Hora Moto </Text>
                        <TextInput
                            style = {styles.InputsValues}
                            value = {this.state.Datos_Parq.hora_moto}
                            onChangeText = {hora_moto => this.setState({Datos_Parq:hora_moto})}
                        />
                        </View>
                    </View>





            </View>

                <Text style={styles.letter_labels}> Estado en el App: </Text> 
                <Switch
                        trackColor={{ false: "white", true: "white" }}
                        thumbColor={this.state.Datos_Parq.estado == 1 ? "#ffd600" : "red"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={this.Cambiar_Estado}
                        value={this.state.Datos_Parq.estado}
                        
                />

        {this.state.Datos_Parq.estado == 1 ? <Text style={{color:'white', fontWeight:'bold', fontSize: 20}}>Activo</Text> : <Text style={{color:'#A72626', fontWeight:'bold', fontSize: 20}}>Inactivo</Text>}

            <View style= {styles.div_button}>
              
                <TouchableOpacity style={styles.button} onPress={() => this.Actualizar_Info()} >
                  <Text style={styles.textButton}  > Actualizar Info Parq! </Text>
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
  