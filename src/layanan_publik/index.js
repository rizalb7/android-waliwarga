import {View, Text, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Card} from 'react-native-paper';
import axios from 'axios';
import {REACT_APP_MIPP_API_URL} from '@env';
import LayananCard from './LayananCard';

export default function LayananPublik({navigation}) {
  const [publik, setPublik] = useState([]);
  const getData = async () => {
    await axios
      .get(`${REACT_APP_MIPP_API_URL}/list-web?kategori=2`)
      .then(res => setPublik(res.data.data))
      .catch(error => console.log(error));
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={{marginTop: 20}}>
      <Card style={{backgroundColor: 'seagreen', marginHorizontal: 4}}>
        <Card.Title
          style={{marginTop: -15}}
          titleStyle={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 20,
            marginTop: 8,
          }}
          title="Layanan Publik"
          right={() => (
            <Pressable onPress={() => navigation.navigate('LayananListScreen')}>
              <Text
                style={{paddingRight: 14, color: 'white', fontWeight: '600'}}>
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
            {publik.length ? (
              publik
                .slice(0, 8)
                .map((val, index) => (
                  <LayananCard key={index} props={{val, navigation}} />
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
