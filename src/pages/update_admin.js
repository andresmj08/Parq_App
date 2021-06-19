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
            nombres: null,
            apellidos: null,
            documento: null,
            telefono: null,
            correo: null,
            
            
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
        this.setState({nombres: this.state.Datos_admin.nombres});
        this.setState({apellidos: this.state.Datos_admin.apellidos});
        this.setState({documento: this.state.Datos_admin.documento});
        this.setState({telefono: this.state.Datos_admin.telefono});
        this.setState({correo: this.state.Datos_admin.email});
        
    }).catch((error) => {
        alert(error);
    });

}


Actualizar_Info = () => {
    Alert.alert('Registro Apto para Guardar');
}


actualizar_nombres = (text) => {
    this.setState({nombres:text})
};

actualizar_apellidos = (text) => {
    this.setState({apellidos:text})
};

actualizar_documento = (text) => {
    this.setState({documento:text})
};

actualizar_telefono = (text) => {
    this.setState({telefono:text})
};

actualizar_correo = (text) => {
    this.setState({correo:text})
};




update_info = () => {
    const { id_admin }= this.state;
    const { nombres }= this.state;
    const { apellidos }= this.state;
    const { documento }= this.state;
    const { telefono }= this.state;
    const { correo }= this.state;

    fetch('http://34.217.178.10/Conexion_Parq_app/actualizar_info_admin.php', {

    method: 'POST',
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    },
    body: JSON.stringify({
        id_admin: id_admin,
        nombres: nombres,
        apellidos: apellidos,
        documento: documento,
        telefono: telefono,
        email: correo
    })
}).then((respuesta)=> respuesta.json())
.then((respuestaJson) => {
    if(respuestaJson == "Actualizado"){
        Alert.alert("Muy bien!", "Actualizaste datos");
    }else{
        Alert.alert("Paila");
    }
    
    
}).catch((error) => {
    alert(error);
});

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
                            value = {this.state.nombres}
                            onChangeText = {(nombres) => this.actualizar_nombres(nombres)}
                        />
                    </View>


                    <Text>{this.state.nombres}</Text>
                    <Text>{this.state.apellidos}</Text>
                    <Text>{this.state.documento}</Text>
                    <Text>{this.state.telefono}</Text>
                    <Text>{this.state.correo}</Text>
                    

                    <View style={{flexDirection: 'row'}}>

                        <Text style={styles.letter_labels}>Apellidos:      </Text>
                        <TextInput
                            style = {styles.InputsText}
                            value = {this.state.apellidos}
                            onChangeText = {(apellidos) => this.actualizar_apellidos(apellidos)}
                            
                        />
                    </View> 

                    <View style={{flexDirection: 'row'}}>

                        <Text style={styles.letter_labels}>Documento:   </Text>
                        <TextInput
                            style = {styles.InputsText}
                            value = {this.state.documento}
                            onChangeText = {(documento) => this.actualizar_documento(documento)}
                            
                        />
                    </View>  

                    <View style={{flexDirection: 'row'}}>

                        <Text style={styles.letter_labels}>Teléfono:        </Text>
                        <TextInput
                            style = {styles.InputsText}
                            value = {this.state.telefono}
                            onChangeText = {(telefono) => this.actualizar_telefono(telefono)}
                            
                        />
                    </View> 
                    
                    <View style={{flexDirection: 'row'}}>

                        <Text style={styles.letter_labels}>Correo:           </Text>
                        <TextInput
                            style = {styles.InputsText}
                            value = {this.state.correo}
                            onChangeText = {(email) => this.actualizar_correo(email)}
                            
                        />
                    </View>  
                    
         
                    
                    



            </View>

               
            <View style= {styles.div_button}>
              
                <TouchableOpacity style={styles.button} onPress={() => this.update_info()} >
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
  