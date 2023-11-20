/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import {MainStyle} from '../../AppStyles';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

export default function MyLikeRecipe({navigation}) {
  const token = useSelector(state => state.auth.data.data.token);
  const id = useSelector(state => state.auth.data.data[0].id);
  const [data, setData] = useState(null);
//   console.log(data)
//   const deleteState = useSelector(state => state.del);
  const [refresh, setRefresh] = useState(false);
  const isFocused = useIsFocused();
//   const dispatch = useDispatch();

const getLike = () => {
    axios.get(`https://busy-sun-hat-deer.cyclic.app/LikeAndBookmark/like?UserID=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
        console.log(res)
        setData(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
}
  useEffect(() => {
    if (isFocused) {
        getLike();
      }
    }, [isFocused]);

  const refreshHandler = () => {
    setRefresh(true);
    setTimeout(() => {
        // Jalankan hanya ketika halaman dalam fokus
        if (isFocused) {
          getLike();
        }
        setRefresh(false);
      }, 1000);
  };

  return (
    <View style={MainStyle.container}>
      <View style={MainStyle.main}>
        <Text style={MainStyle.headerText}>Liked Recipes</Text>
        {data?.isLoading && (
          <View style={{ marginVertical: 16 }}>
            <View>
              <ActivityIndicator size={'large'} color={'#EFC81A'} style={{ alignSelf: 'center' }} />
            </View>
          </View>
        )}
        {console.log(data)}
        {data?.message === "recipe not found" ? (
          <Text style={{color: 'black' , fontSize: 16, fontWeight: '500', marginTop: 20 }}>Recipe not found</Text>
        ) : (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={refreshHandler} />
          }
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          data={data?.data}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                navigation.navigate('Detail', {
                  itemId: item.id,
                })
              }>
              <Image
                style={styles.img}
                source={{
                  uri: item.photo,
                }}
              />
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.title}>{item.category}</Text>
              </View>
            </TouchableOpacity>
          )}
        /> )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#EFEFEF',
    borderRadius: 15,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 319,
    height: 50,
    fontSize: 14,
    fontWeight: '500',
  },
  item: {
    marginTop: 16,
    paddingLeft: 10,
    width: 343,
    height: 96,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    elevation: 3,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 15,
  },
  title: {
    marginHorizontal: 10,
    marginTop: 5,
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 6,
    marginLeft: 10,
    height: 32,
    width: 64,
    borderRadius: 6,
  },
  btntext: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    color: 'white',
  },
});
