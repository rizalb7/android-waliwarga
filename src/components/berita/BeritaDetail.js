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
import {COL_DARK_PR, REACT_APP_DEMAKKAB_API_URL} from '@env';
import ViewMoreText from 'react-native-view-more-text';
import axios from 'axios';
const {width, height} = Dimensions.get('window');

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function BeritaDetail({route}) {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);
  const data = route.params.data;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Card>
        <Card.Cover
          style={{width, height: 250}}
          source={{
            uri: 'https://demakkab.go.id/' + data.gambar,
          }}
        />
        <Card.Content>
          <Text
            style={{
              color: COL_DARK_PR,
              marginTop: 12,
              lineHeight: 23,
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
            variant="headlineSmall">
            {data.judul}
          </Text>
          <Text variant="bodyMedium">{data.created_at}</Text>
          <Card style={{marginTop: 10, backgroundColor: 'azure'}}>
            <Card.Content>
              <Text variant="bodyMedium">
                {data.content
                  .replace(/<[^>]+>/g, '')
                  .replace(/&quot;/g, '"')
                  .replace(/&ldquo;/g, '"')
                  .replace(/&rdquo;/g, '"')
                  .replace(/&amp;/g, '&')
                  .replace(/&nbsp;/g, ' ')
                  .replace(/&#39;/g, "'")
                  .replace(/&lsquo;/g, "'")
                  .replace(/&rsquo;/g, "'")
                  .replace(/&ndash;/g, '-')
                  .replace(/&lt;/g, '<')
                  .replace(/&gt;/g, '>')}
              </Text>
            </Card.Content>
          </Card>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
