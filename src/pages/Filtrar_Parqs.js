import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, TextInput } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Icon } from 'react-native-elements';

import Logo from '../components/Logo';

export default class Filtrar_Parqs extends Component <{}>{

    constructor(props){
        super(props);
        this.state = {
            
            valor_inicial: 0,
            valor_final: 100,
            vehiculo: 1
        };
    }

 
    


    render(){
      return(
        <View style= {styles.container}>
              <Text style={styles.letter}>Filtrar Parqs! <Icon name='search'  type='evilicon'  color='#ffd600' /> {"\n"}  ____________________________________</Text>
              
                      
              <Text style={styles.letter_titles}>Seleccione el tipo de Vehículo</Text>
                
              <View style={styles.card}>
                <Picker
                    
                    selectedValue={this.state.vehiculo}
                    style={styles.picker_style}
                    onValueChange={(itemvalue) => this.setState({vehiculo:itemvalue})}
                >
                    <Picker.Item label="Carro" value="1"/>
                    <Picker.Item label="Moto" value="2" />
                </Picker>
                </View>



                <Text style={styles.letter_titles}>Seleccione el rango de Valores</Text>

                <View style= {styles.row}>
                    <View style= {styles.fraccion}>
                    <TextInput
                        style= {styles.input_box_values}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder= 'Desde'
                        placeholderTextColor= '#212121'
                        onChangeText = {valor_inicial => this.setState({valor_inicial})}
                    />
                    <Text style={styles.letter_values}>Valor Hora Desde</Text>
                    </View>

                    <View style= {styles.fraccion}>
                    <TextInput
                        style= {styles.input_box_values}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder= 'Hasta'
                        placeholderTextColor= '#212121'
                        onChangeText = {valor_final => this.setState({valor_final})}
                    />
                    <Text style={styles.letter_values}>Valor Hora Hasta</Text>
                    </View>
                    

                </View>

               
                 
            {/* <Text>{this.state.valor_inicial}</Text>
            <Text>{this.state.valor_final}</Text>
            <Text>{this.state.vehiculo}</Text> */}
               <TouchableOpacity 
                style={styles.button} 
                onPress={() => this.props.navigation.navigate('Map_Filtro',{
                    valor_inicial: this.state.valor_inicial,
                    valor_final: this.state.valor_final,
                    vehiculo: this.state.vehiculo
                  })}>
                <Text style={styles.textButton}  > Buscar </Text>
                </TouchableOpacity>

          </View>
    
      );
    }
};







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
        fontSize: 20,
        fontWeight: '200',
        color:'#ffd600',
        textAlign: 'center',
        marginVertical: 10,
      },
      input_box: {
        width: 300,
        backgroundColor:'#fff9c4',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 18,
        color: '#212121',
        marginVertical: 10,
        
    
      },
      textButton: {
        fontSize: 20,
        fontWeight: '200',
        color:'#212121',
        textAlign: 'center',
      },

      picker_style: {
        height: 50, 
        width: 150,
       
      },
      card:{
        borderWidth: 1,
        width: 100,
        borderRadius: 20,
        backgroundColor: "#F6E8AE",
        marginTop: 10,
        marginLeft: 4
      },
      row: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent:"space-between"
        
      },
      input_box_values: {
        
            width: 100,
            backgroundColor:'#fff9c4',
            borderRadius: 25,
            paddingHorizontal: 16,
            fontSize: 18,
            color: '#212121',
            marginVertical: 10,
            height: 50
      },
      fraccion: {
        flex: 2,
        height: 100,
        alignItems: "center",
      },
      letter_values:{
          fontSize: 15,
          fontWeight: 'bold'
      },

      letter_titles: {
        fontSize: 18,
        fontWeight: '200',
        color:'white',
        textAlign: 'center',
        marginVertical: 10,
      },

    });
  
  