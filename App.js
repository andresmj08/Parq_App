
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './src/pages/Login';
import Register_AdminParq from './src/pages/Register_AdminParq';
import Menu_Admin_Index from './src/pages/Menu_Admin_Index';

import HomeScreen from './src/pages/Home';
import MapUser from './src/pages/MapUser';
import Route_to_Site from './src/pages/Route';
import dev from './src/pages/dev_map';

import Register_Parq from './src/pages/Register_Parq';

// export default function App() {
//   return (
//       <View style= {styles.container}>
//           <StatusBar barStyle= 'light-content'  backgroundColor= '#ffd600'/>
//           <HomeScreen/>

//       </View>
//   )
// }


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
  }

});

// const styles = StyleSheet.create({
//   letra: {
//     color: '#ffffff',
//     fontSize: 18,
//   },
//   container: {
//     backgroundColor : '#616161',
//     flex : 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   registrer_content:{
//     flexGrow: 1,
//     alignItems: 'center',
//     justifyContent: 'flex-end',

//   },

//   registrer_text:{
//     color: '#ffffff',
//     fontSize: 18,
//   },
//   });

export default createAppContainer(AppNavigator);