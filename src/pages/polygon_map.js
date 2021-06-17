import { TextareaAutosize } from '@material-ui/core';
import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity,Alert } from 'react-native';

import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 4.8152024;
const LONGITUDE = -75.7041791;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;


class PolygonCreator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      polygons: [],
      editing: null,
      creatingHole: false,
    };
  }

  finish() {
    const { polygons, editing } = this.state;
    this.setState({
      polygons: [...polygons, editing],
      editing: null,
      creatingHole: false,
    });
  }

  createHole() {
    const { editing, creatingHole } = this.state;
    if (!creatingHole) {
      this.setState({
        creatingHole: true,
        editing: {
          ...editing,
          holes: [
            ...editing.holes,
            [],
          ],
        },
      });
    } else {
      const holes = [...editing.holes];
      if (holes[holes.length - 1].length === 0) {
        holes.pop();
        this.setState({
          editing: {
            ...editing,
            holes,
          },
        });
      }
      this.setState({ creatingHole: false });
    }
  }

  onPress(e) {
    const { editing, creatingHole } = this.state;
    if (!editing) {
      this.setState({
        editing: {
          id: id++,
          coordinates: [e.nativeEvent.coordinate],
          holes: [],
        },
      });
    } else if (!creatingHole) {
      this.setState({
        editing: {
          ...editing,
          coordinates: [
            ...editing.coordinates,
            e.nativeEvent.coordinate,
          ],
        },
      });
    } else {
      const holes = [...editing.holes];
      holes[holes.length - 1] = [
        ...holes[holes.length - 1],
        e.nativeEvent.coordinate,
      ];
      this.setState({
        editing: {
          ...editing,
          id: id++, // keep incrementing id to trigger display refresh
          coordinates: [
            ...editing.coordinates,
          ],
          holes,
        },
      });
    }
  }

  render() {
    const mapOptions = {
      scrollEnabled: true,
    };

    if (this.state.editing) {
      mapOptions.scrollEnabled = false;
      mapOptions.onPanDrag = e => this.onPress(e);
    }

    return (
      <View style={styles.container}>
        <View style= {styles.div_texto}>
               
            {
                !this.state.editing ?

                [ 
                    !this.state.polygons.length ?
                      <Text style= {styles.titulo_filtros}>Definir Perimetro Urbano {"\n"}
                      <Text style = {styles.letra_filtros}>Para iniciar: <Text style = {styles.bold}>Click sobre el mapa </Text></Text></Text> 
                  :
                      <Text style= {styles.titulo_filtros}>Definir Perimetro Urbano {"\n"}                 
                      <Text style = {styles.letra_filtros}> Perfecto!  <Text style = {styles.perimetro_definido}>El perimetro ha sido definido!</Text></Text></Text> 
                      
                ]
                :
                <Text style= {styles.titulo_filtros}>Definir Perimetro Urbano {"\n"}
                <Text style = {styles.letra_filtros}>Seleccione los puntos extremos de la zona y por ultimo  <Text style = {styles.bold}>Click en "Terminar y Enviar" </Text></Text></Text>
            }

            
        </View>
        {/* <Text>{this.state.polygons.length}</Text> */}
        {/*<Text>{JSON.stringify(this.state.polygons)}</Text> */}
        <MapView
          provider={this.props.provider}
          style={styles.map}
          
          initialRegion={this.state.region}
          onPress={e => this.onPress(e)}
          {...mapOptions}
        >
          {this.state.polygons.map(polygon => (
            <MapView.Polygon
              key={polygon.id}
              coordinates={polygon.coordinates}
              holes={polygon.holes}
              strokeColor="#000000"
              fillColor="rgba(0,163,49,0.5)"
              strokeWidth={2}
            />
          ))}
          {this.state.editing && (
            <MapView.Polygon
              key={this.state.editing.id}
              coordinates={this.state.editing.coordinates}
              holes={this.state.editing.holes}
              strokeColor="#000000"
              fillColor="rgba(255,214,0,0.2)"
              strokeWidth={2}
            />
          )}
        </MapView>

     
        <View style={styles.buttonContainer}>
          {this.state.editing && (
                  <TouchableOpacity
                      onPress={() => this.finish()}
                      style={[styles.bubble, styles.button]}
                    >
                      <Text>Terminar</Text>
                    </TouchableOpacity>

          )}

        
          {!this.state.editing ?

                [
                  this.state.polygons.length ?

                  <TouchableOpacity style={styles.boton_regresar_menu} onPress={() => this.props.navigation.navigate('Menu_SuperAdmin')}> 
                      <Text style= {styles.text_btn_regresar}>Regresar al Menu Principal</Text>
                  </TouchableOpacity>

                  
                  :
                    <Text></Text>
                ]
                :
                <Text></Text>
              
              }



            
        </View>
      </View>
    );
  }
}

PolygonCreator.propTypes = {
  provider: MapView.ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
      height : '80%',
      width: '100%'
  },
  bubble: {
    backgroundColor: '#ffd600',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 150,
    paddingHorizontal: 12,
    alignItems: 'center',
    
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  div_texto: {
    
    backgroundColor : '#616161',
    width: '100%',
    height: '10%'
  },
  titulo_filtros: {
    fontSize: 20,
    fontWeight: '200',
    color:'#ffd600',
    textAlign: 'center',
    
},
letra_filtros: {
  fontSize:15,
  color: '#eeee'
},
bold: {
  fontWeight: 'bold'
},

perimetro_definido: {
  color: '#00A331',
  fontWeight:'bold',
  fontSize: 18
},

boton_regresar_menu: {
  borderRadius: 20,
  padding: 10,
  elevation: 2,
  backgroundColor: "#616161",
},
text_btn_regresar: {
  color: "#ffd600",
  fontWeight: "bold",
  textAlign: "center"
},
});

module.exports = PolygonCreator;