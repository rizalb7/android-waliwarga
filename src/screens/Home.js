import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {BannerData} from '../components/banner/BannerData';
import Banner from '../components/banner/Banner';
import GeoLocation from '../components/geoLocation';
import Shalat from '../components/shalat';
import Cuaca from '../components/cuaca';
import Dsc from '../components/dsc';
import Berita from '../components/berita';

export default function Home({navigation}) {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Banner data={BannerData} />
          {/* <GeoLocation /> */}
          <ScrollView horizontal={true}>
            <View style={{flexDirection: 'row'}}>
              <Shalat />
              <Cuaca />
            </View>
          </ScrollView>
          <Dsc navigation={navigation} />
          <Berita navigation={navigation} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
});
