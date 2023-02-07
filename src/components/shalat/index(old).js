import {View, Text, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import ShalatTime from './ShalatTime';
import Geolocation from 'react-native-geolocation-service';
import {ReqLocation} from '../geoLocation/ReqLocation';
const {width, height} = Dimensions.get('window');

export default function Shalat() {
  const [location, setLocation] = useState({
    // coords: {
    //   accuracy: 13.619000434875488,
    //   altitude: 32.60000228881836,
    //   altitudeAccuracy: 2.692476511001587,
    //   heading: 0,
    //   latitude: -6.9011428,
    //   longitude: 110.6289636,
    //   speed: 0.04292236268520355,
    // },
    // mocked: false,
    // provider: 'fused',
    // timestamp: 1675424641183,
  });

  const getLocation = () => {
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
    console.log(location);
  };

  const [geoCode, setGeoCode] = useState('Demak');
  const getGeocode = async () => {
    await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${location.coords.latitude}&lon=${location.coords.longitude}&format=json`,
    )
      .then(response => response.json())
      .then(response => setGeoCode(response.address.county))
      .catch(err => console.log(err));
  };

  const [cityId, setCityId] = useState(1409);
  const getCityId = async () => {
    await fetch(`https://api.myquran.com/v1/sholat/kota/cari/${geoCode}`)
      .then(response => response.json())
      .then(response => setCityId(response.data[0].id))
      .catch(err => console.log(err));
  };

  const [dShalat, setDShalat] = useState([]);
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const timestamp = Math.floor(Date.now() / 1000);
  const getDataShalat = async () => {
    await fetch(
      `https://api.myquran.com/v1/sholat/jadwal/${cityId}/${year}/${month}/${day}`,
    )
      .then(response => response.json())
      .then(json => {
        setDShalat(json.data.jadwal);
        // console.log(json.data.jadwal);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getLocation();
    getGeocode();
    getCityId();
    getDataShalat();
    // console.log(dShalat);
  }, []);
  return (
    <View
      style={{
        paddingVertical: 6,
        // backgroundColor: 'darkgreen',
        width: width,
      }}>
      <Text
        style={{
          color: 'darkgreen',
          fontSize: 17,
          fontWeight: '800',
          alignSelf: 'center',
          marginTop: 5,
        }}>
        Jadwal Shalat di {geoCode} - {dShalat.tanggal}
      </Text>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <ShalatTime props={{time: 'Imsak', data: dShalat.imsak}} />
        <ShalatTime props={{time: 'Subuh', data: dShalat.subuh}} />
        <ShalatTime props={{time: 'Dzuhur', data: dShalat.dzuhur}} />
        <ShalatTime props={{time: 'Ashar', data: dShalat.ashar}} />
        <ShalatTime props={{time: 'Maghrib', data: dShalat.maghrib}} />
        <ShalatTime props={{time: 'Isya', data: dShalat.isya}} />
      </View>
    </View>
  );
}
