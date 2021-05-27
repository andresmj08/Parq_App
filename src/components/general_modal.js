import React, { Component, useState, useEffect} from 'react'
import { StyleSheet, Text , View, Modal, Pressable, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 4.8152024;
const LONGITUDE = -75.7041791;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


export default function General_Modal(props){
    const [modalVisible, setModalVisible] = useState(false);
    const [LocationUser, setLocationUser] = useState(null);

    

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
                <Text>Bien</Text>
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
        <Text style={styles.textStyle}>Fijar Parq en el Mapa</Text>
      </Pressable>
        </View>

        
            )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 1
    },
    modalView: {
      margin: 60,
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
      elevation: 10
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