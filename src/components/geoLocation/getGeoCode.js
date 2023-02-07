import {useState} from 'react';
import {getLocation} from './getLocation';

export const getGeoCode = async () => {
  const [geoCode, setGeoCode] = useState('');
  const location = getLocation();
  console.log(location);
  await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${location.coords.latitude}&lon=${location.coords.longitude}&format=json`,
  )
    .then(response => response.json())
    .then(response => setGeoCode(response.address.county))
    .catch(err => console.log(err));
  return geoCode;
};
