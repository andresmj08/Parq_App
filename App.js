import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './src/pages/Login';
import HomeScreen from './src/pages/Home';

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