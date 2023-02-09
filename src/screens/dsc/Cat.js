import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {REACT_APP_DSC_URL, REACT_APP_DSC_API_URL, COL_DARK_PR} from '@env';
import CatCard from '../../components/dsc/CatCard';
import {ActivityIndicator, TextInput} from 'react-native-paper';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function Cat({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setSearchTerm('');
      getData();
      setRefreshing(false);
    });
  }, []);

  const [cat, setCat] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    await axios
      .get(`${REACT_APP_DSC_API_URL}/category/all`)
      .then(res => {
        setCat(res.data.data);
        setLoading(false);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    getData();
    // console.log(cat);
  }, []);

  const filteredCat = cat.filter(post =>
    post.category_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <View style={styles.container}>
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
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
            {filteredCat.map((val, index) => (
              <CatCard key={index} props={{val, navigation}} />
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COL_DARK_PR,
  },
});
