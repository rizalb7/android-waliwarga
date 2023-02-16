import {View, Text, TouchableOpacity, Linking, Dimensions} from 'react-native';
import React, {useCallback, useState} from 'react';
import WebView from 'react-native-webview';
import {Modal, Portal, Provider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {REACT_APP_MIPP_API_URL, COL_DARK_PR} from '@env';
const {width, height} = Dimensions.get('window');

export default function LayananShow({route, navigation}) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <Provider>
      <WebView
        source={{uri: route.params.link}}
        originWhitelist={['*']}
        scalesPageToFit={true}
        startInLoadingState={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        ignoreSslError={true}
        onError={toggleModal}
        // onError={() => {navigation.goBack()}}
        // style={{ marginTop: 20 }}
      />
      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: COL_DARK_PR,
            padding: 20,
            height,
          }}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}>
              Mohon Maaf
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'italic',
                textAlign: 'center',
                marginTop: 15,
                marginBottom: 50,
              }}>
              Website ini tidak bisa diakses melalui Aplikasi
            </Text>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Icon name={'arrow-undo-outline'} size={30} color={'white'} />
                <Text
                  style={{
                    color: 'white',
                    marginTop: 4,
                    fontSize: 20,
                    textDecorationLine: 'underline',
                  }}>
                  Kembali
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={useCallback(
                  async () => await Linking.openURL(route.params.link),
                  [route.params.link],
                )}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: 120,
                }}>
                <Text
                  numberOfLines={2}
                  style={{
                    color: 'white',
                    marginTop: -10,
                    marginRight: -16,
                    fontSize: 20,
                    width: 90,
                    textDecorationLine: 'underline',
                  }}>
                  Buka di Browser
                </Text>
                <Icon name={'arrow-redo-outline'} size={30} color={'white'} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
}
