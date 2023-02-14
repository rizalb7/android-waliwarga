import {View, ScrollView, ImageBackground, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Card, Text} from 'react-native-paper';
import {COL_DARK_PR, REACT_APP_DEMAKKAB_API_URL} from '@env';
import axios from 'axios';

export default function Berita({navigation}) {
  const [berita, setBerita] = useState([]);
  const getBerita = async () => {
    axios
      .get(`${REACT_APP_DEMAKKAB_API_URL}/berita`)
      .then(res => setBerita(res.data.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getBerita();
  }, []);

  return (
    <View>
      {berita.length ? (
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 6,
            }}>
            <Text
              style={{color: COL_DARK_PR, fontWeight: 'bold', marginLeft: 15}}
              variant="titleLarge">
              Berita
            </Text>
            <Pressable
              onPress={() =>
                navigation.navigate('BeritaListScreen', {name: 'Semua Berita'})
              }>
              <Text
                style={{
                  color: COL_DARK_PR,
                  fontWeight: 'bold',
                  marginRight: 20,
                }}
                variant="titleSmall">
                Lihat Semua
              </Text>
            </Pressable>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {berita.map((val, index) => (
              <Card style={{marginHorizontal: 10}} key={index}>
                <Pressable
                  onPress={() =>
                    navigation.navigate('BeritaDetailScreen', {
                      name: val.judul,
                      data: val,
                    })
                  }>
                  <ImageBackground
                    style={{width: 220, height: 140}}
                    imageStyle={{borderRadius: 12}}
                    source={{
                      uri: `https://demakkab.go.id/${val.gambar}`,
                    }}>
                    <View
                      style={{
                        position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // top: 0,
                        left: 0,
                        right: 0,
                        bottom: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'white',
                          // fontWeight: 'bold',
                          textAlign: 'center',
                          // padding: 5,
                          backgroundColor: 'rgba(0,0,0, 0.5)',
                        }}
                        numberOfLines={2}>
                        {val.judul}
                      </Text>
                    </View>
                    <View
                      style={{
                        position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center',
                        top: 0,
                        left: 0,
                        right: 0,
                        // bottom: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: 'white',
                          backgroundColor: 'rgba(0,0,0, 0.7)',
                        }}
                        numberOfLines={2}>
                        {val.created_at}
                      </Text>
                    </View>
                  </ImageBackground>
                </Pressable>
              </Card>
            ))}
          </ScrollView>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}
