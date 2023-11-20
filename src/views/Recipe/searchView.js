/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Button,
} from 'react-native';
import {MainStyle} from '../../AppStyles';
import {useSelector, useDispatch} from 'react-redux';
import {getSearchRecipe} from '../../storages/actions/recipeAction';
export default function SearchView({navigation}) {
  const data = useSelector(state => state.all);
  console.log(data)
  const data2 = useSelector(state => state.search);
  console.log(data2)
  const [search, setSearch] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const refreshHandler = () => {
    setRefresh(true);
    setCurrentPage(1);
    setTimeout(() => {
      dispatch(getSearchRecipe(search)).then(() => {
        setRefresh(false);
      });
    }, 1000);
  };

  const handleSubmit = () => {
    setCurrentPage(1); 
    dispatch(getSearchRecipe(search));
  };
  
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  // console.log(data2.data.length)
  const totalPages = Math.ceil(data2?.data?.length / itemsPerPage) || 0;
  console.log(totalPages)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSearchRecipe(search));
  }, [dispatch,search]);
  return (
    <View style={MainStyle.container}>
      <View style={MainStyle.main}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for Recipes"
          placeholderTextColor={'#C4C4C4'}
          onChangeText={value => setSearch(value)}
          onSubmitEditing={() => {
            handleSubmit();
          }}
        />
        {data.isLoading && (
          <View style={{marginVertical: 16}}>
            <View>
              <ActivityIndicator
                size={'large'}
                color={'#EFC81A'}
                style={{alignSelf: 'center'}}
              />
            </View>
          </View>
        )}
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={refreshHandler} />
          }
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          data={data2?.data?.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
          )}
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
                <Text style={styles.title}>By {item.author}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.paginationContainer}>
        <TouchableOpacity
        style={[styles.paginationButton, { marginRight: 10 }]}
        onPress={prevPage}
        disabled={currentPage === 1}>
          <Text style={styles.paginationButtonText}>Previous</Text>
          </TouchableOpacity>
          <Text style={styles.pageText}>
            Page {currentPage} of {totalPages}
          </Text>
        <TouchableOpacity
        style={[styles.paginationButton, { marginLeft: 10 }]}
        onPress={nextPage}
        disabled={currentPage === totalPages}
        >
        <Text style={styles.paginationButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: 'black',
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  paginationButton: {
    backgroundColor: '#EFC81A',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  paginationButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  
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
    color: 'black',
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
    marginBottom: 14,
    marginLeft: 50,
    backgroundColor: '#EFC81A',
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
  spinner: {
    flex: 1,
    height: 64,
    marginVertical: 16,
    marginHorizontal: 16,
    alignContent: 'center',
    backgroundColor: 'red',
  },
});
