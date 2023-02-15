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
import DatePicker from 'react-native-date-picker';
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
      setIsDate(false);
      setSelectedDate(new Date());
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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isDate, setIsDate] = useState(false);

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
        // console.log(selectedDate.toLocaleDateString());
        if (!isDate) {
          return post.judul.toLowerCase().includes(searchTerm.toLowerCase());
        } else {
          return postDate
            .toLocaleDateString()
            .includes(selectedDate.toLocaleDateString());
        }
      }),
    );
  }, [searchTerm, selectedDate, berita]);

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
      <View style={{flexDirection: 'row'}}>
        <TextInput
          label="Pencarian"
          value={searchTerm}
          onChangeText={text => {
            setSearchTerm(text);
            setIsDate(false);
          }}
          style={{
            width: '70%',
            backgroundColor: 'azure',
            marginBottom: 5,
            borderTopRightRadius: 0,
            borderTopStartRadius: 0,
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: 'azure',
            width: '30%',
            height: 55,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setIsDatePickerVisible(true)}>
          <Text style={{fontSize: 15, fontWeight: '400'}}>Pilih Tanggal</Text>
        </TouchableOpacity>
      </View>
      <DatePicker
        modal
        open={isDatePickerVisible}
        date={selectedDate}
        mode="date"
        onConfirm={date => {
          setIsDate(true);
          setIsDatePickerVisible(false);
          setSelectedDate(date);
        }}
        onCancel={() => {
          setIsDatePickerVisible(false);
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
