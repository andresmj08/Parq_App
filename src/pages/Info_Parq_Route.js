import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { Icon } from 'react-native-elements';


const Info_Parq_Route = (props) => {
  
  const [modalVisible, setModalVisible] = useState(false);
  const id_parqueadero = props.Id_Parq;
  const [register_parq, setRegister] = useState(false);
  

  fetch('http://34.217.178.10/Conexion_Parq_app/info_sitios.php', {
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
      if(respuestaJson == 1){
        
        setRegister(true);
               
      }
    });
  
  
  
  

  
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}> 
           {register_parq 
              ? <Text style={styles.register_ok}> <Icon name='check' size={30} type='evilicon'  color='green'/> Parqueadero Registrado en CC</Text>
              : <Text style={styles.no_register}> <Icon name='exclamation' size={30} type='evilicon'  color='red'/> Parqueadero sin registro en CC</Text>
            }
            <Text style={styles.modalText}><Icon name='location' size={30} type='evilicon'  color='#b6ad05'/>Estas a {props.distancia} Km hasta <Text style={styles.bold_text}>{props.Parqueadero}</Text></Text>
            <Text style={styles.modalText}><Icon name='clock' size={30} type='evilicon'  color='#b6ad05'/>Con un promedio {props.tiempo} Minutos</Text>
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
    marginTop: 400
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
    elevation: 5
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
  }
});

export default Info_Parq_Route;