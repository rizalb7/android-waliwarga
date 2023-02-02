import {View, Text} from 'react-native';
import React from 'react';

export default function ShalatTime({props}) {
  return (
    <View>
      <Text
        style={{
          width: 60,
          textAlign: 'center',
          alignContent: 'center',
          color: 'darkgreen',
          flexWrap: 'wrap',
          textDecorationLine: 'underline',
        }}>
        {props.time}
      </Text>
      <Text
        style={{
          width: 60,
          textAlign: 'center',
          alignContent: 'center',
          color: 'darkgreen',
          flexWrap: 'wrap',
          fontSize: 12,
        }}>
        {props.data}
        <Text style={{fontSize: 10}}> WIB</Text>
      </Text>
    </View>
  );
}
