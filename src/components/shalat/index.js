import {View, Text, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import ShalatTime from './ShalatTime';
import Geolocation from 'react-native-geolocation-service';
import {ReqLocation} from '../geoLocation/ReqLocation';
const {width, height} = Dimensions.get('window');

export default function Shalat() {
  const [dShalat, setDShalat] = useState([]);
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const timestamp = Math.floor(Date.now() / 1000);
  const getDataShalat = async location => {
    await fetch(
      // `https://api.myquran.com/v1/sholat/jadwal/${cityId}/${year}/${month}/${day}`,
      `http://api.aladhan.com/v1/timings/${timestamp}?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&method=15`,
    )
      .then(response => response.json())
      .then(json => {
        setDShalat(json);
        // console.log(json);
      })
      .catch(err => console.log(err));
  };
  const getLocation = () => {
    const result = ReqLocation();
    result.then(res => {
      // console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            // console.log(position);
            // setLocation(position);
            getDataShalat(position);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            // setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
    // console.log(location);
  };

  useEffect(() => {
    getLocation();
    // console.log(dShalat);
  }, []);
  return (
    <View
      style={{
        paddingVertical: 6,
        // backgroundColor: 'darkgreen',
        width: width,
      }}>
      {dShalat.code != undefined ? (
        <View>
          <Text
            style={{
              color: 'darkgreen',
              fontSize: 17,
              fontWeight: '800',
              alignSelf: 'center',
              marginTop: 5,
            }}>
            Jadwal Shalat di Lokasimu - {dShalat.data.date.readable}
          </Text>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <ShalatTime
              props={{time: 'Imsak', data: dShalat.data.timings.Imsak}}
            />
            <ShalatTime
              props={{time: 'Subuh', data: dShalat.data.timings.Fajr}}
            />
            <ShalatTime
              props={{time: 'Dzuhur', data: dShalat.data.timings.Dhuhr}}
            />
            <ShalatTime
              props={{time: 'Ashar', data: dShalat.data.timings.Asr}}
            />
            <ShalatTime
              props={{time: 'Maghrib', data: dShalat.data.timings.Maghrib}}
            />
            <ShalatTime
              props={{time: 'Isya', data: dShalat.data.timings.Isha}}
            />
          </View>
        </View>
      ) : (
        <Text></Text>
      )}
    </View>
  );
}
