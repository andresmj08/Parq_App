
import React from 'react';
import { Text, View } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './src/pages/Login';
import Register_AdminParq from './src/pages/Register_AdminParq';
import Menu_Admin_Index from './src/pages/Menu_Admin_Index';

import HomeScreen from './src/pages/Home';
import MapUser from './src/pages/MapUser';
import Route_to_Site from './src/pages/Route';
import Register_Parq from './src/pages/Register_Parq';
import MarkerMap from './src/pages/slide_marker';
import PolygonCreator from './src/pages/polygon_map';
import dev_comsuption_service from './src/pages/dev_service_comsuption';
import Filtrar_Parqs from './src/pages/Filtrar_Parqs';
import Filtered_map from './src/pages/Filtered_map';


class Home extends React.Component{
  render(){
    return(
      
      <View>
          <Text>Home Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Inicio: {
    screen: HomeScreen
  },
  Login: {
    screen: LoginScreen
  },
  Mapa_Parqs: {
    screen: MapUser
  },
  Ruta_al_Parq: {
    screen: Route_to_Site
  },
  Menu_Admin:{
    screen: Menu_Admin_Index
  },
  Registrar_Parq: {
    screen: Register_Parq
  },
  Registrar_Admin_Parq: {
    screen: Register_AdminParq
  },
  Marker: {
    screen: MarkerMap
  },
  Poligono: {
    screen: PolygonCreator
  },
  dev_service: {
    screen: dev_comsuption_service
  },
  Filtrar_Parqs: {
    screen: Filtrar_Parqs
  },
  Map_Filtro: {
    screen: Filtered_map
  }

});


export default createAppContainer(AppNavigator);