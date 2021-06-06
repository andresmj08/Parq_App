import React, { useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image } from "react-native";
import { Icon } from 'react-native-elements';
import StarRating from 'react-native-star-rating';


const Info_Parq_Route = (props) => {
  
  const [modalVisible, setModalVisible] = useState(false);
  const id_parqueadero = props.Id_Parq;
  const [Datos_Parq, setDatos_Parq] = useState({});
  const [starCount, setStarCount] = useState(4);


  fetch('http://34.217.178.10/Conexion_Parq_app/new_info_sitios.php', {
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            id_parq:id_parqueadero
        })
    }).then((respuesta)=> respuesta.json())
    .then((respuestaJson) => {
      
        setDatos_Parq(respuestaJson);
        
               
      
    }).catch((error) => {
      alert(error);
  });
  
    // fetch('http://34.217.178.10/Conexion_Parq_app/visite_record.php', {
    //   method: 'POST',
    //   headers:{
    //       'Accept':'application/json',
    //       'Content-Type':'application/json'
    //   },
    //   body: JSON.stringify({
    //       id_parq:id_parqueadero
    //   })
  // });
  
  
  onStarRatingPress = (rating) =>{

    setStarCount(rating);

  }
  
  
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Se ha minimizado la Informacion del Parq!");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}> 
          {/* <Text>{JSON.stringify(Datos_Parq)}</Text> */}
          <Text>Calificar Parq!</Text>
          <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={starCount}
                  selectedStar= {(rating) => onStarRatingPress(rating)}
                  fullStarColor={'#ffd600'}
              />
          

          
          <View style={styles.row}>
            <View style={[styles.fraccion, styles.unique_box, styles.button]}>
              <Text style={styles.bold_text}>Valor de Fracción</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.fraccion]}>
              <Image source={require("../components/imagenes/Carro.png")} style={{ width: '50%', height: '50%', resizeMode: 'contain' }} />
            </View>

            <View style={[styles.fraccion]}>
              <Image source={require("../components/imagenes/Moto.png")} style={{ width: '50%', height: '50%', resizeMode: 'contain' }} />
            </View>
          </View>

          
          <View style={styles.row}>
            <View style={[styles.fraccion,  styles.valor_box]}>
              <Text style={styles.bold_text}>{"\n"}$ {Datos_Parq.hora_carro}</Text>
            </View>
            <View style={[styles.fraccion,  styles.valor_box]}>
              <Text style={styles.bold_text}>{"\n"}$ {Datos_Parq.hora_moto}</Text>
            </View>
          </View>
          

          

         <Text style={styles.modalText}>{"\n"}<Icon name='calendar' size={30} type='evilicon'  color='#b6ad05'/>Horario de Atención de:{"\n"} <Text style={styles.bold_text}>{Datos_Parq.apertura}</Text> hasta: <Text style={styles.bold_text}>{Datos_Parq.cierre}</Text></Text>


         <Text style={styles.modalText}><Icon name='plus' size={30} type='evilicon'  color='#b6ad05'/>Servicio Adicional <Text style={styles.bold_text}>{Datos_Parq.servicios}</Text></Text>
           {Datos_Parq.registrado == 1
              ? <Text style={styles.register_ok}> <Icon name='check' size={30} type='evilicon'  color='green'/>Registrado en Cámara de Comercio{"\n"}</Text>
              : <Text style={styles.no_register}> <Icon name='exclamation' size={30} type='evilicon'  color='red'/> Sin registro en Cámara de Comercio{"\n"}</Text>
            }
            <Text style={styles.modalText}><Icon name='location' size={30} type='evilicon'  color='#b6ad05'/>Estas a {props.distancia} Km hasta <Text style={styles.bold_text}>{Datos_Parq.nombre}</Text></Text>
            <Text style={styles.modalText}><Icon name='clock' size={30} type='evilicon'  color='#b6ad05'/>Con un promedio de {props.tiempo} Minutos</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}> Ocultar Info</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Ver Información del Parq</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
    
    
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 20,
    
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#212121",
  },
  buttonClose: {
    backgroundColor: "#212121",
  },
  textStyle: {
    color: "#ffd600",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  register_ok: {
    color: "green",
    fontWeight: "bold"
  },
  no_register: {
    color: "red",
    fontWeight: "bold"
  },
  bold_text: {
    fontWeight: "bold"
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    margin: '6%'
    
    
  },
  fraccion: {
    flex: 1,
    height: 100,
    alignItems: "center",
  },
  
  valor_box: {
    height: 50
  },
  unique_box: {
    flex:2,
    backgroundColor: "#ffd600",
    height: 30
  }
});

export default Info_Parq_Route;