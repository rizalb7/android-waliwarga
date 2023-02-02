import {View, Text, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import CuacaTime from './CuacaTime';
const {width, height} = Dimensions.get('window');

export default function Cuaca() {
  const [dCuaca, setDCuaca] = useState([]);
  const [dini, setDini] = useState([]);
  const [pagi, setPagi] = useState([]);
  const [siang, setSiang] = useState([]);
  const [malam, setMalam] = useState([]);
  let d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  const dateNow = year + month + day;
  // console.log(dateNow);
  const getDataCuaca = async () => {
    await fetch(
      `https://cuaca-gempa-rest-api.vercel.app/weather/jawa-tengah/demak`,
    )
      .then(response => response.json())
      .then(json => {
        // setDCuaca(json.data.jadwal);
        setDini(
          json.data.params[6].times.find(o => o.datetime == dateNow + '0000'),
        );
        setPagi(
          json.data.params[6].times.find(o => o.datetime == dateNow + '0600'),
        );
        setSiang(
          json.data.params[6].times.find(o => o.datetime == dateNow + '1200'),
        );
        setMalam(
          json.data.params[6].times.find(o => o.datetime == dateNow + '1800'),
        );
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getDataCuaca();
    // console.log(dini);
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
          marginTop: -7,
        }}>
        Cuaca Demak Hari Ini{' '}
        <Text style={{color: 'gray', fontSize: 12}}>(Sumber: BMKG)</Text>
      </Text>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <CuacaTime props={{time: 'Pagi', data: pagi.name}} />
        <CuacaTime props={{time: 'Siang', data: siang.name}} />
        <CuacaTime props={{time: 'Malam', data: malam.name}} />
        <CuacaTime props={{time: 'Dini Hari', data: dini.name}} />
      </View>
    </View>
  );
}
