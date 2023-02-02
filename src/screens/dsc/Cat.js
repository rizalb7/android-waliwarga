import {View, Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {REACT_APP_DSC_URL, REACT_APP_DSC_API_URL} from '@env';
import CatCard from '../../components/dsc/CatCard';

export default function Cat({navigation}) {
  const [cat, setCat] = useState([]);
  const getData = async () => {
    await axios
      .get(`${REACT_APP_DSC_API_URL}/category/all`)
      .then(res => setCat(res.data.data))
      .catch(error => console.log(error));
  };
  useEffect(() => {
    getData();
    // console.log(cat);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          {cat.length ? (
            cat.map((val, index) => (
              <CatCard key={index} props={{val, navigation}} />
            ))
          ) : (
            <Text></Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'seagreen',
  },
});
