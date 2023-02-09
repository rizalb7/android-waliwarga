import {View, Text, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import {Card} from 'react-native-paper';
import {REACT_APP_DSC_URL, REACT_APP_DSC_API_URL} from '@env';

export default function CatCard({props}) {
  return (
    <View>
      <Pressable
        onPress={() =>
          props.navigation.navigate('DscCatListScreen', {
            catId: props.val.cid,
            name: props.val.category_name,
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
              uri:
                REACT_APP_DSC_API_URL + '/images/' + props.val.category_image,
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
              {props.val.category_name}
            </Text>
          </Card.Content>
        </Card>
      </Pressable>
    </View>
  );
}
