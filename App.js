import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {BannerData} from './src/components/banner/BannerData';
import Banner from './src/components/banner/Banner';
import GeoLocation from './src/components/geoLocation';
import Shalat from './src/components/shalat';
import Cuaca from './src/components/cuaca';

export default function App() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Banner data={BannerData} />
          {/* <GeoLocation /> */}
          <Shalat />
          <Cuaca />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
