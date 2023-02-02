import {View, Text, Image} from 'react-native';
import React from 'react';

export default function CuacaTime({props}) {
  let icon;
  if (props.data == 'Berawan Tebal') {
    icon =
      'https://www.bmkg.go.id/asset/img/weather_icon/ID/berawan%20tebal-am.png';
  } else if (props.data == 'Cerah') {
    icon = 'https://www.bmkg.go.id/asset/img/weather_icon/ID/cerah-am.png';
  } else if (props.data == 'Cerah Berawan') {
    icon =
      'https://www.bmkg.go.id/asset/img/weather_icon/ID/cerah%20berawan-am.png';
  } else if (props.data == 'Hujan Ringan') {
    icon =
      'https://www.bmkg.go.id/asset/img/weather_icon/ID/hujan%20ringan-am.png';
  } else if (props.data == 'Hujan Sedang') {
    icon =
      'https://www.bmkg.go.id/asset/img/weather_icon/ID/hujan%20sedang-am.png';
  } else if (props.data == 'Hujan Petir') {
    icon =
      'https://www.bmkg.go.id/asset/img/weather_icon/ID/hujan%20petir-am.png';
  } else if (props.data == 'Kabut') {
    icon = 'https://www.bmkg.go.id/asset/img/weather_icon/ID/kabut-am.png';
  } else {
    icon = 'https://www.bmkg.go.id/asset/img/weather_icon/ID/berawan-am.png';
  }
  return (
    <View style={{width: 90}}>
      <Text
        style={{
          textAlign: 'center',
          alignContent: 'center',
          color: 'darkgreen',
          flexWrap: 'wrap',
          textDecorationLine: 'underline',
        }}>
        {props.time}
      </Text>
      <View
        style={{
          width: 40,
          height: 30,
          marginVertical: 2,
          alignSelf: 'center',
          marginTop: -1,
        }}>
        <Image
          style={{
            width: 30,
            height: 28,
            alignSelf: 'center',
          }}
          source={{
            uri: icon,
          }}
        />
      </View>
      <Text
        style={{
          textAlign: 'center',
          alignContent: 'center',
          color: 'darkgreen',
          flexWrap: 'wrap',
          fontSize: 10,
          marginTop: -6,
        }}>
        {props.data}
      </Text>
    </View>
  );
}
