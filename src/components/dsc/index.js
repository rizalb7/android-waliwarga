import {View, Text, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Card} from 'react-native-paper';
import axios from 'axios';
import {REACT_APP_DSC_URL, REACT_APP_DSC_API_URL} from '@env';
import CatCard from './CatCard';

export default function Dsc({navigation}) {
  const [cat, setCat] = useState([]);
  const getData = async () => {
    await axios
      .get(`${REACT_APP_DSC_API_URL}/category/offset/0/limit/8`)
      .then(res => setCat(res.data.data))
      .catch(error => console.log(error));
  };
  useEffect(() => {
    getData();
    // console.log(cat);
  }, []);
  return (
    <View style={{marginVertical: 12}}>
      <Card style={{backgroundColor: 'seagreen', marginHorizontal: 4}}>
        <Card.Title
          style={{marginTop: -15}}
          titleStyle={{
            color: 'lightgreen',
            fontWeight: 'bold',
            fontSize: 18,
          }}
          title="Lokasi"
          right={() => (
            <Pressable onPress={() => navigation.navigate('DscCatScreen')}>
              <Text
                style={{paddingRight: 14, color: 'white', fontWeight: 'bold'}}>
                Lihat Semua
              </Text>
            </Pressable>
          )}
        />
        <Card.Content style={{marginTop: -16}}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
            {cat.length ? (
              cat.map((val, index) => (
                <CatCard key={index} props={{val, navigation}} />
              ))
            ) : (
              <Text></Text>
            )}
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}
