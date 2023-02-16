import {View, Text, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import {Card} from 'react-native-paper';

export default function LayananCard({props}) {
  return (
    <View>
      <Pressable
        onPress={() =>
          props.navigation.navigate('LayananShowScreen', {
            link: props.val.link,
            name: props.val.nama_web,
          })
        }>
        <Card
          style={{
            width: 75,
            height: 102,
            margin: 6,
          }}>
          <Card.Cover
            style={{
              width: 75,
              height: 75,
            }}
            source={{
              uri: 'https://mipp.demakkab.go.id/storage/' + props.val.icon,
            }}
          />
          <Card.Content>
            <Text
              style={{
                fontSize: 11,
                lineHeight: 11,
                fontWeight: '500',
                color: 'black',
                marginHorizontal: -10,
                marginTop: 3,
                marginBottom: 10,
                alignSelf: 'center',
                textAlign: 'center',
              }}
              numberOfLines={2}>
              {props.val.nama_web}
            </Text>
          </Card.Content>
        </Card>
      </Pressable>
    </View>
  );
}
