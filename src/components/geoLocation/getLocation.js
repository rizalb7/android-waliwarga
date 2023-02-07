import {useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {ReqLocation} from './ReqLocation';

export const getLocation = () => {
  const [location, setLocation] = useState(false);
  const result = ReqLocation();
  result.then(res => {
    // console.log('res is:', res);
    if (res) {
      Geolocation.getCurrentPosition(
        position => {
          // console.log(position);
          setLocation(position);
          // setLocation(position);
        },
        error => {
          // See error code charts below.
          // console.log(error.code, error.message);
          setLocation(false);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  });
  return location;
};
