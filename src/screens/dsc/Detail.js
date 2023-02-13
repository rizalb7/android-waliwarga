import React, {useState, useEffect, useCallback} from 'react';
import {
  Dimensions,
  Image,
  Linking,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {Avatar, Badge, Button, Card, Paragraph, Text} from 'react-native-paper';
import {REACT_APP_DSC_URL, REACT_APP_DSC_API_URL, COL_DARK_PR} from '@env';
import ViewMoreText from 'react-native-view-more-text';
import axios from 'axios';
const {width, height} = Dimensions.get('window');

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function Detail({route}) {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      getGallery();
      setRefreshing(false);
    });
  }, []);
  const data = route.params.data;
  const renderViewMore = onPress => {
    return (
      <Badge
        onPress={onPress}
        size={22}
        style={{
          marginTop: 4,
          backgroundColor: 'rgba(255,255,255,0.6)',
          color: 'black',
          alignSelf: 'flex-start',
        }}>
        Tampil Semua
      </Badge>
    );
  };
  const renderViewLess = onPress => {
    return (
      <Badge
        onPress={onPress}
        size={22}
        style={{
          marginTop: 4,
          backgroundColor: 'rgba(255,255,255,0.6)',
          color: 'black',
          alignSelf: 'flex-start',
        }}>
        Tampil Sedikit
      </Badge>
    );
  };

  const linkMap =
    'https://www.google.com/maps/dir/?api=1&origin=&destination=' +
    data.place_map_latitude +
    ',' +
    data.place_map_longitude;

  const [gallery, setGallery] = useState([]);
  const getGallery = async () => {
    await axios
      .get(`${REACT_APP_DSC_API_URL}/places/gallery/${data.p_id}`)
      .then(res => {
        setGallery(res.data.data);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    getGallery();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Card>
        <Card.Cover
          style={{width, height: 250}}
          source={{
            uri: REACT_APP_DSC_API_URL + '/images/' + data.place_image,
          }}
        />
        <Card.Content>
          <Text
            style={{
              color: 'seagreen',
              marginTop: 12,
              lineHeight: 23,
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
            variant="headlineSmall">
            {data.place_name}
          </Text>
          <Text variant="bodySmall">Kategori: {data.category_name}</Text>
          {data.place_description && (
            <Card style={{marginTop: 10, backgroundColor: 'azure'}}>
              <Card.Title titleVariant="titleMedium" title="Deskripsi" />
              <Card.Content style={{marginTop: -20}}>
                <ViewMoreText
                  numberOfLines={4}
                  renderViewMore={renderViewMore}
                  renderViewLess={renderViewLess}>
                  <Text variant="bodyMedium">
                    {data.place_description
                      .replace(/<[^>]+>/g, '')
                      .replace(/&quot;/g, '"')
                      .replace(/&amp;/g, '&')
                      .replace(/&nbsp;/g, ' ')
                      .replace(/&#39;/g, "'")
                      .replace(/&lt;/g, '<')
                      .replace(/&gt;/g, '>')}
                  </Text>
                </ViewMoreText>
              </Card.Content>
            </Card>
          )}
          <Card style={{marginTop: 10, backgroundColor: 'azure'}}>
            <Card.Content>
              {data.place_address && (
                <View
                  style={{
                    flexDirection: 'row',
                    // marginTop: 20,
                    width: '90%',
                  }}>
                  <Avatar.Icon
                    style={{
                      alignSelf: 'center',
                      backgroundColor: COL_DARK_PR,
                    }}
                    size={24}
                    icon="map-marker"
                  />
                  <Text
                    style={{alignSelf: 'center', marginLeft: 10}}
                    variant="bodySmall">
                    {data.place_address}
                  </Text>
                </View>
              )}
              {data.place_email && (
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    width: '90%',
                  }}>
                  <Avatar.Icon
                    style={{
                      alignSelf: 'center',
                      backgroundColor: COL_DARK_PR,
                    }}
                    size={24}
                    icon="email"
                  />
                  <Text
                    style={{alignSelf: 'center', marginLeft: 10}}
                    variant="bodySmall">
                    {data.place_email}
                  </Text>
                </View>
              )}
              {data.place_phone && (
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    width: '90%',
                  }}>
                  <Avatar.Icon
                    style={{
                      alignSelf: 'center',
                      backgroundColor: COL_DARK_PR,
                    }}
                    size={24}
                    icon="phone"
                  />
                  <Text
                    style={{alignSelf: 'center', marginLeft: 10}}
                    variant="bodySmall">
                    {data.place_phone}
                  </Text>
                </View>
              )}
            </Card.Content>
          </Card>
          {data.place_website || data.place_video || data.place_map_latitude ? (
            <Card style={{marginTop: 10, backgroundColor: 'azure'}}>
              <Card.Content>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}>
                  {data.place_website && (
                    <Button
                      icon="web"
                      buttonColor={COL_DARK_PR}
                      style={{margin: 4}}
                      contentStyle={{
                        marginHorizontal: -9,
                      }}
                      labelStyle={{fontSize: 24}}
                      mode="contained"
                      onPress={useCallback(
                        async () => await Linking.openURL(data.place_website),
                        [data.place_website],
                      )}>
                      <Text style={{color: 'white'}} variant="titleMedium">
                        Website
                      </Text>
                    </Button>
                  )}
                  {data.place_video && (
                    <Button
                      icon="video"
                      buttonColor={COL_DARK_PR}
                      style={{margin: 4}}
                      contentStyle={{
                        marginHorizontal: -9,
                      }}
                      labelStyle={{fontSize: 24}}
                      mode="contained"
                      onPress={useCallback(
                        async () => await Linking.openURL(data.place_video),
                        [data.place_video],
                      )}>
                      <Text style={{color: 'white'}} variant="titleMedium">
                        Video
                      </Text>
                    </Button>
                  )}
                  {data.place_map_latitude && (
                    <Button
                      icon="map-marker-radius"
                      buttonColor={COL_DARK_PR}
                      style={{margin: 4}}
                      contentStyle={{
                        marginHorizontal: -9,
                      }}
                      labelStyle={{fontSize: 24}}
                      mode="contained"
                      onPress={useCallback(
                        async () => await Linking.openURL(linkMap),
                        [linkMap],
                      )}>
                      <Text style={{color: 'white'}} variant="titleMedium">
                        Map
                      </Text>
                    </Button>
                  )}
                </View>
              </Card.Content>
            </Card>
          ) : (
            <View></View>
          )}
          {gallery.length ? (
            <Card style={{marginTop: 10, backgroundColor: 'azure'}}>
              <Card.Title titleVariant="titleMedium" title="Gallery" />
              <Card.Content style={{marginTop: -10}}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {gallery.map((val, index) => (
                    <Card.Cover
                      key={index}
                      style={{
                        width: width - 100,
                        height: 200,
                        marginHorizontal: 8,
                      }}
                      source={{
                        uri:
                          REACT_APP_DSC_API_URL +
                          '/images/gallery/' +
                          val.image_name,
                      }}
                    />
                  ))}
                </ScrollView>
              </Card.Content>
            </Card>
          ) : (
            <View></View>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
