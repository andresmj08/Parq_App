import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image } from "react-native";
import { Icon } from 'react-native-elements';


const dev_comsuption_service = (props) => {
  
    const id_parqueadero = 1;

  const [Datos_Parq, setDatos_Parq] = useState({
    hora_moto: 300,
    hora_carro: 2600,
    apertura: '08:00',
    cierre: '18:00'
  });
  
  const [dato, setDato] = useState([]);

  fetch('http://192.168.0.5/Parq_App_Conection/info_sitios.php', {
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            id_parq:1
        })
    }).then((respuesta)=> respuesta.json())
    .then((respuestaJson) => {

        setDato(respuestaJson)
        alert(respuestaJson.apertura);
    }).catch((error) => {
            alert(error);
        })
  

  
  

  
  return (
    <View >
      

    </View>
  );
};


export default dev_comsuption_service;