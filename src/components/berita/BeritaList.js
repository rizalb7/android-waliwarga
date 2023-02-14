import {
  Dimensions,
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Avatar,
  Card,
  Searchbar,
  Text,
  TextInput,
} from 'react-native-paper';
import {COL_DARK_PR, REACT_APP_DEMAKKAB_API_URL} from '@env';
import axios from 'axios';
import RenderFooter from '../../components/layouts/RenderFooter';
const {width, height} = Dimensions.get('window');

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function BeritaList({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setIsListEnd(false);
      setSearchTerm('');
      getBerita();
      setRefreshing(false);
    });
  }, []);

  const [loading, setLoading] = useState(true);
  const [isListEnd, setIsListEnd] = useState(false);
  const [berita, setBerita] = useState([]);
  const [filteredBerita, setFilteredBerita] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const getBerita = async () => {
    if (!isListEnd) {
      await axios
        .get(`${REACT_APP_DEMAKKAB_API_URL}/allberita`)
        .then(res => {
          setBerita([...berita, ...res.data]);
          setFilteredBerita([...filteredBerita, ...res.data]);
          setLoading(false);
        })
        .catch(err => console.log(err));
    }
  };

  useEffect(() => {
    getBerita();
  }, [page]);

  useEffect(() => {
    setFilteredBerita(
      berita.filter(post => {
        const postDate = new Date(post.updated_at);
        return post.judul.toLowerCase().includes(searchTerm.toLowerCase());
      }),
    );
  }, [searchTerm, berita]);

  const handleLoadMore = () => {
    setIsListEnd(true);
    setPage(page + 1);
  };

  const ItemView = ({item, index}) => {
    return (
      <View>
        <Pressable
          onPress={() =>
            navigation.navigate('BeritaDetailScreen', {
              name: item.judul,
              data: item,
            })
          }>
          <Card key={index} style={{marginHorizontal: 10, marginVertical: 3}}>
            <Card.Content style={{flexDirection: 'row', margin: -10}}>
              <Card.Cover
                style={{height: 80, width: 120}}
                source={{
                  uri: 'https://demakkab.go.id/' + item.gambar,
                }}
              />
              <View style={{flexDirection: 'column', width: '68%'}}>
                <Text
                  variant="bodySmall"
                  style={{
                    color: 'black',
                    marginHorizontal: 12,
                    lineHeight: 18,
                  }}
                  numberOfLines={1}>
                  {item.created_at.replace(/\\/g, '')}
                </Text>
                <Text
                  variant="titleMedium"
                  style={{
                    flexWrap: 'wrap',
                    color: 'black',
                    marginHorizontal: 12,
                    lineHeight: 18,
                  }}
                  numberOfLines={3}>
                  {item.judul.replace(/\\/g, '')}
                </Text>
              </View>
            </Card.Content>
          </Card>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={{height: height, backgroundColor: COL_DARK_PR}}>
      <TextInput
        label="Pencarian"
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={{
          backgroundColor: 'azure',
          marginBottom: 5,
          borderTopRightRadius: 0,
          borderTopStartRadius: 0,
        }}
      />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={filteredBerita}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
          ListFooterComponent={<RenderFooter props={{loading}} />}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}
