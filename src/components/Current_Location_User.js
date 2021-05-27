import  { useState, useEffect} from 'react';
import * as Location from 'expo-location';


export default function current_location_function(){

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  
  

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let ubicacion = 'Procesando';
  let current_latitud = '';
  let current_longitud = '';

  if (errorMsg) {
    ubicacion = errorMsg;
  } else if (location) {
     ubicacion = 'Obtenida';
     current_latitud = JSON.stringify(location.coords.latitude);
     current_longitud = JSON.stringify(location.coords.longitude);
     

  }

  return location;
}
