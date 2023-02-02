import {View, Text, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import ShalatTime from './ShalatTime';
const {width, height} = Dimensions.get('window');

export default function Shalat() {
  const [dShalat, setDShalat] = useState([]);
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const getDataShalat = async () => {
    await fetch(
      `https://api.myquran.com/v1/sholat/jadwal/1408/${year}/${month}/${day}`,
    )
      .then(response => response.json())
      .then(json => {
        setDShalat(json.data.jadwal);
        // console.log(json.data.jadwal);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
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
        Jadwal Shalat di Demak - {dShalat.tanggal}
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
