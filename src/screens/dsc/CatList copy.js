import {ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar, Card, Text} from 'react-native-paper';
import {REACT_APP_DSC_URL, REACT_APP_DSC_API_URL, COL_DARK_PR} from '@env';
import axios from 'axios';

export default function CatList({route, navigation}) {
  const [place, setPlace] = useState([]);
  const getPlace = async () => {
    await axios
      .get(`${REACT_APP_DSC_API_URL}/places/cat/${route.params.catId}`)
      .then(res => setPlace(res.data.data))
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getPlace();
  }, []);

  return (
    <ScrollView style={{backgroundColor: COL_DARK_PR}}>
      {place.length ? (
        place.map((val, index) => (
          <Card key={index} style={{marginHorizontal: 10, marginVertical: 3}}>
            <Card.Content style={{flexDirection: 'row', margin: -10}}>
              <Card.Cover
                style={{height: 80, width: 120}}
                source={{
                  uri: REACT_APP_DSC_API_URL + '/images/' + val.place_image,
                }}
              />
              <Text
                variant="titleMedium"
                style={{
                  flexWrap: 'wrap',
                  width: '62%',
                  color: 'black',
                  marginHorizontal: 12,
                  lineHeight: 18,
                }}
                numberOfLines={3}>
                {val.place_name}
              </Text>
            </Card.Content>
          </Card>
        ))
      ) : (
        <Text></Text>
      )}
    </ScrollView>
  );
}
