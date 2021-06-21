import React, {Component} from 'react'
import { View, StyleSheet, Text } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts'
import { Icon } from 'react-native-elements';
 
export default class Estadisticas extends Component<{}> {

  constructor(props){
    super(props);
    this.state = {
        
        Estadisticas: [],
        
        }
        this.getInfoAdmin();
 
    }


  componentDidMount(){
    this.getInfoAdmin();
}


getInfoAdmin = () => {

    

    fetch('http://34.217.178.10/Conexion_Parq_app/parqs_por_estado.php', {

    method: 'POST',
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    }
   
}).then((respuesta)=> respuesta.json())
.then((respuestaJson) => {
    
    this.setState({Estadisticas:respuestaJson});
    
    
}).catch((error) => {
    alert(error);
});

}



    render() {

      const Activos = parseInt(this.state.Estadisticas.Activos,10);
      const Inactivos = parseInt(this.state.Estadisticas.Inactivos,10);
      const Registrados_CC = parseInt(this.state.Estadisticas.Registrado,10);
      const Sin_Registro_CC = parseInt(this.state.Estadisticas.No_Registrado,10);
      const Admins = parseInt(this.state.Estadisticas.Admins,10);
      const total_parqs = Activos + Inactivos;
      const Actividad = parseInt(this.state.Estadisticas.Actividad,10);
      const Calificaciones = parseInt(this.state.Estadisticas.Calificaciones,10);


        return(

            <View style={styles.container}> 

            
                <Text style={styles.letter}>Estadísticas Parq Pereira! <Icon name='plus'  type='evilicon'  color='#ffd600' /> {"\n"}  ____________________________________</Text>
                  
                <View style={{alignItems:'center', marginTop:15}}>
                <Text style = {styles.letra_Informativa}>Se han registrado <Text style = {styles.bold}>{Admins}</Text> Administradores <Icon name='user'  type='evilicon'  color='#ffd600' />  </Text>
                <Text style = {styles.letra_Informativa}>Tenemos: <Text style = {styles.bold}>{total_parqs} Parqueaderos</Text> <Text style = {styles.letra_Informativa}> en el App </Text></Text>
                </View>

                <View style={{alignItems:'center', marginTop:15}}>
                <Text style = {styles.letra_Informativa}>De los Cuales Existen:</Text>
                </View>
                
                <View style={styles.row}>
                    
                  <View style={[styles.fraccion]}>
                  <Text style={styles.letter}>Inactivos</Text>
                  <Text style={styles.texto_valores}>{Inactivos}</Text>

                  </View>

                  

                  <View style={[styles.fraccion]}>
                  <Text style={styles.letter}>Activos</Text>
                  <Text style={styles.texto_valores}>{Activos}</Text>
                  </View>
                  
               </View>


                <View style={{ marginTop:15}}>
                    <ProgressCircle 
                      style={{ height: 200 }} 
                      progress={Activos/total_parqs} 
                      progressColor={'#ffd600'}
                      percent={Activos/total_parqs}

                      
                      variant="overBackground"
                      />
                </View>

                <Text style={styles.letter}>____________________________________</Text>

                <View style={styles.row}>
                    
                  <View style={[styles.fraccion]}>
                  <Text style={styles.letter_Camara}>Registrados en Cámara Comercio</Text>
                  <Text style={styles.texto_valores}>{Registrados_CC}</Text>

                  </View>

                  <View style={[styles.fraccion]}>
                  <Text style={styles.letter_Camara}>Sin registro en Cámara Comercio</Text>
                  <Text style={styles.texto_valores}>{Sin_Registro_CC}</Text>

                  </View>
                  
               </View>

               <Text style={styles.letter}>____________________________________</Text>
               <View style={{alignItems:'center', marginTop:15}}>
                <Text style = {styles.letra_Informativa}>Han visualizado los parqs en: <Text style = {styles.bold}>{Actividad}</Text> Veces <Icon name='chart'  type='evilicon'  color='#ffd600' />  </Text>
                <Text style = {styles.letra_Informativa}>Han calificado: <Text style = {styles.bold}>{Calificaciones} Parqueaderos</Text> <Text style = {styles.letra_Informativa}> en el App <Icon name='star'  type='evilicon'  color='#ffd600' />  </Text></Text>
                </View>
            </View>
         

         )
    }
}




const styles = StyleSheet.create({
    container: {
      backgroundColor : '#616161',
      flex : 1,
      justifyContent: 'center',
    },
      letter: {
        fontSize: 20,
        fontWeight: '200',
        color:'#ffd600',
        textAlign: 'center',
        marginVertical: 10,
      },
      letra_Informativa: {
        fontSize:15,
        color: '#eeee',
        alignContent:'center'
      },
      bold: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        textDecorationLine: 'underline',
        fontSize: 15
      },
      row: {
        
        flexDirection: 'row',
        marginVertical: 10,
        
        
        
      },
      fraccion: {
        flex: 2,
        alignItems: "center",
        
      },
      texto_valores:{
          fontSize: 18,
          fontWeight:'bold',
          color: 'white'
      },
      letter_Camara: {
        fontSize: 15,
        fontWeight: '200',
        color:'#ffd600',
        textAlign: 'center',
        marginVertical: 10,
      },
});