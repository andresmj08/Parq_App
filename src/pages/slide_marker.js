
import React, {Component} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { Current_Location_Function } from '../components/Current_Location_User';



const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 4.8152024;
const LONGITUDE = -75.7041791;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


 export default class slide_marker extends Component <{}> {



    constructor(props) {
        super(props);
      
         this.state = {
          region: {
           latitude: LATITUDE,
           longitude: LONGITUDE,
           latitudeDelta: LATITUDE_DELTA,
           longitudeDelta: LONGITUDE_DELTA,
          },
          marker: {
            coordinate: {
              latitude: 0,
              longitude: 0,
              }
          }
         };
        }

    onMapPress(e) {
        this.setState({
            marker: 
            {
                coordinate: e.nativeEvent.coordinate,
            },
        });
     }

     nueva(uno){
        return uno * 2;
     }

 render() {
   return (
      <View style={styles.container}>
             <MapView
                provider={this.props.provider}
                style={styles.map}
                initialRegion={this.state.region}
                onPress={e => this.onMapPress(e)}
               >
      
                    <Marker
                    coordinate={this.state.marker.coordinate}
                    image = {require('../components/imagenes/Marker_Map.png')}
                    >
                    </Marker>
      
             </MapView>
             
            <Text>{this.state.marker.coordinate.latitude}</Text>
            
        </View>
      );
    }
 
}  



const styles = StyleSheet.create({
  container: {
      ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollview: {
    alignItems:'center',
    paddingVertical: 40
  },
  map: {
    height : '100%',
    width: '100%'
  }
});
