import { TextareaAutosize } from '@material-ui/core';
import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';



export default class Parqs_for_Admin extends Component<{}>{

    constructor(props){
        super(props);

        const { params } = this.props.navigation.state;
        this.state = {
            id_admin: params.id_admin,
            data: [],
            listar: false

        }
    }

    componentDidMount(){
        this.getParqs();
    }


    getParqs = () => {

      const { id_admin } = this.state;

        fetch('http://34.217.178.10/Conexion_Parq_app/consultar_parqs_admin.php', {
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            id_admin:id_admin
        })
         }).then((respuesta)=> respuesta.json())
         .then((respuestaJson) => {

          if(respuestaJson == "Vacio"){
            this.setState({listar : false});
          }else {
            this.setState({listar : true});
            this.setState({data:respuestaJson});
          }
      
        
        
               
      
    }).catch((error) => {
      alert(error);
  });


    }


    
    Pasar_a_Vista = (id) => {
      const id_parq = id;

      this.props.navigation.navigate('Update_Parq_View', {id_parq : id_parq});
    }


    render() {
        return(
            <View style={styles.container}>
                    <View style={{flex:1}}>
                        <Text style={styles.letter}>Consultar y Editar Parqs! <Icon name='plus'  type='evilicon'  color='#ffd600' /> {"\n"}  ____________________________________</Text>
                    </View>


                    

          {this.state.listar ?

                <View style={{flex:8}}>
                    <FlatList
                        data = {this.state.data}
                        renderItem =  {({item})=>(
                            <View style={styles.item} >
                                <Text>Nombre: <Text style={styles.title}>{item.nombre}</Text></Text>
                                <Text>Estado en Plataforma: {item.estado == 1 ? <Text style={styles.estado_activo}>Activo</Text> : <Text style={styles.estado_inactivo}>Inactivo</Text>}</Text>
                                <Text> Valor hora Carro: <Text style={styles.bold}>{item.hora_carro}</Text>  Valor hora Moto: <Text style={styles.bold}>{item.hora_moto} </Text></Text>
                                <Text> Hora Apertura: <Text style={styles.bold}>{item.apertura}</Text> Hora Cierre: <Text style={styles.bold}>{item.cierre} {"\n"}</Text></Text>
                                

                                <View style={{alignItems:'center'}}>
                                    <TouchableOpacity style={styles.boton_editar}>
                                            <Text  style={styles.textButton}  onPress={() => this.Pasar_a_Vista(item.id)} > Editar </Text>
                                    </TouchableOpacity> 
                                 </View>
                            </View>

                         )}




                        keyExtractor = {item => item.id}
                        
                    />
                </View>
                :
                <View style={{flex:8}}>
                    <View style={styles.item} >
                      <Text style={styles.estado_inactivo}>No Cuentas con ningun Parqueadero Registrado {"\n"}</Text>
                      <Text>Registra ahora mismo tus Parqueaderos en ParqApp  </Text>
                    </View>
                </View>
              }

            </View>
            
        );
        
    } 
}




const styles = StyleSheet.create({

    container: {
        backgroundColor : '#616161',
        flex : 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        
      },
   
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      backgroundColor: 'white',
      borderTopColor: '#ffd600',
      borderTopWidth:5
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    letter: {
        fontSize: 20,
        fontWeight: '200',
        color:'#ffd600',
        textAlign: 'center',
        
      },
      bold:{
          fontWeight:'bold'
      },
      estado_activo: {
        color: 'green',
        fontWeight:'bold'
      },
      estado_inactivo: {
        color: 'red',
        fontWeight:'bold'
      },
      boton_editar:{
        width: 80,
        backgroundColor:'#ffd600',
        borderRadius: 5,
        paddingVertical: 5,
        alignItems:'center'
      },
       textButton: {
        fontSize: 12,
        fontWeight: '200',
        color:'#212121',
        textAlign: 'center',
      },
  });