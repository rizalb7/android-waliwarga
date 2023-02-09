import {
  Dimensions,
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Avatar, Card, Searchbar, Text, TextInput} from 'react-native-paper';
import {REACT_APP_DSC_URL, REACT_APP_DSC_API_URL, COL_DARK_PR} from '@env';
import axios from 'axios';
import RenderFooter from '../../components/layouts/RenderFooter';
const {width, height} = Dimensions.get('window');

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function CatList({route, navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setIsListEnd(false);
      setSearchTerm('');
      getPlace();
      setRefreshing(false);
    });
  }, []);

  const [loading, setLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);
  const [place, setPlace] = useState([]);
  const [filteredPlace, setFilteredPlace] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const getPlace = async () => {
    if (!loading && !isListEnd) {
      await axios
        .get(`${REACT_APP_DSC_API_URL}/places/cat/${route.params.catId}`)
        .then(res => {
          setPlace([...place, ...res.data.data]);
          setFilteredPlace([...filteredPlace, ...res.data.data]);
          setLoading(false);
        })
        .catch(err => console.log(err));
    }
  };
  useEffect(() => {
    getPlace();
  }, [page]);

  useEffect(() => {
    setFilteredPlace(
      place.filter(post =>
        post.place_name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [searchTerm, place]);

  const handleLoadMore = () => {
    setIsListEnd(true);
    setPage(page + 1);
  };

  const ItemView = ({item, index}) => {
    return (
      <View>
        <Pressable
          onPress={() =>
            navigation.navigate('DscDetailScreen', {
              name: item.place_name,
              data: item,
            })
          }>
          <Card key={index} style={{marginHorizontal: 10, marginVertical: 3}}>
            <Card.Content style={{flexDirection: 'row', margin: -10}}>
              <Card.Cover
                style={{height: 80, width: 120}}
                source={{
                  uri: REACT_APP_DSC_API_URL + '/images/' + item.place_image,
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
                {item.place_name.replace(/\\/g, '')}
              </Text>
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
      <FlatList
        data={filteredPlace}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ItemView}
        ListFooterComponent={<RenderFooter props={{loading}} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}
