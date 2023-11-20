/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import SweetAlert from 'react-native-sweet-alert';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {MainStyle} from '../../AppStyles';
import {useDispatch, useSelector} from 'react-redux';
import {getDetailRecipe} from '../../storages/actions/recipeAction';

export default function DetailView({route, navigation}) {
  const {itemId} = route.params;
  const id = JSON.stringify(itemId);
  console.log(id)
  const token = useSelector(state => state.auth.data.users.token);
  const userID = useSelector(state => state.auth.data.users.id);
  const data = useSelector(state => state.detail);
  // const [like,setLike] = useState(null)
  // const [isLiked, setIsLiked] = useState(false);
  // const [bookmark,setBookmark] = useState(null)
  // const [isBookmarked, setIsBookmarked] = useState(false);
  const isFocused = useIsFocused();
  
  console.log(data)

  const inputData = {
    ResepID: id,
    UserID: userID,
}
  const dispatch = useDispatch();

  // const getLike = () => {
    // axios.get(`https://busy-sun-hat-deer.cyclic.app/LikeAndBookmark/like/${id}?UserID=${userID}&ResepID=${id}`, {
//         headers: {
//             Authorization : `Bearer ${token}`
//         }
//     })
//         .then((res) => {
//             console.log(res)
//             setLike(res.data.data[0])
//             if (res.data.data.length > 0) {
//               setIsLiked(true); // Resep telah disukai
//             } else {
//               setIsLiked(false); // Resep belum disukai
//             }
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// }

//     const getBookmark = () => {
//       axios.get(`https://busy-sun-hat-deer.cyclic.app/LikeAndBookmark/bookmark/${id}?UserID=${userID}&ResepID=${id}`, {
//         headers: {
//             Authorization : `Bearer ${token}`
//         }
//     })
//         .then((res) => {
//             console.log(res)
//             setBookmark(res.data.data[0])
//             if (res.data.data.length > 0) {
//               setIsBookmarked(true);
//             } else {
//               setIsBookmarked(false);
//             }


//         })
//         .catch((err) => {
//             console.log(err)
//         })
// }

  useEffect(() => {
    if (isFocused) {
      dispatch(getDetailRecipe(token, id));
      // getLike()
      // getBookmark()
    }
  }, [isFocused]);
  if (data.isLoading === true) {
    return (
      <View style={MainStyle.container}>
        <View style={MainStyle.main}>
          <ActivityIndicator
            size={'large'}
            color={'#EFC81A'}
            style={{alignSelf: 'center'}}
          />
        </View>
      </View>
    );
  }
  if (data.data === null) {
    return (
      <View style={MainStyle.container}>
        <View style={MainStyle.main}>
          <Text>null</Text>
        </View>
      </View>
    );
  }

  // const postLike = () => {
//     axios.post(`https://busy-sun-hat-deer.cyclic.app/LikeAndBookmark/like?UserID=${userID}`,inputData, {
//         headers: {
//             Authorization : `Bearer ${token}`
//         }
//     })
//         .then((res) => {
//             console.log(res);
//             setIsLiked(true)
//             SweetAlert.showAlertWithOptions({
//               title: 'Success',
//               subTitle: 'Success liked this recipe.',
//               confirmButtonTitle: 'OK',
//               confirmButtonColor: '#EFC81A',
//             })
//             // setTimeout(() => {
//             //     window.location.reload();
//             // }, 1000);
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// }

// const deleteLike = () => {
//     axios.delete(`https://busy-sun-hat-deer.cyclic.app/LikeAndBookmark/like?UserID=${userID}&ResepID=${id}`, {
//         headers: {
//             Authorization : `Bearer ${token}`
//         }
//     })
//         .then((res) => {
//             console.log(res);
//             setIsLiked(false)
//             SweetAlert.showAlertWithOptions({
//               title: 'Success',
//               subTitle: 'Success unliked this recipe.',
//               confirmButtonTitle: 'OK',
//               confirmButtonColor: '#EFC81A',
//             })
//             // setTimeout(() => {
//             //     window.location.reload();
//             // }, 1000);
//         })
//         .catch((err) => {
//             console.log(err)
//             toast.error(`${err}`)
//         })
// }

// const postBookmark = () => {
//     axios.post(`https://busy-sun-hat-deer.cyclic.app/LikeAndBookmark/bookmark?UserID=${userID}`,inputData, {
//         headers: {
//             Authorization : `Bearer ${token}`
//         }
//     })
//         .then((res) => {
//             console.log(res);
//             setIsBookmarked(true)
//             SweetAlert.showAlertWithOptions({
//               title: 'Success',
//               subTitle: 'Success saved this recipe.',
//               confirmButtonTitle: 'OK',
//               confirmButtonColor: '#EFC81A',
//             })
//             // setTimeout(() => {
//             //     window.location.reload();
//             // }, 1000);
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// }

// const deleteBookmark = () => {
//     axios.delete(`https://busy-sun-hat-deer.cyclic.app/LikeAndBookmark/bookmark?UserID=${userID}&ResepID=${id}`, {
//         headers: {
//             Authorization : `Bearer ${token}`
//         }
//     })
//         .then((res) => {
//             console.log(res);
//             setIsBookmarked(false)
//             SweetAlert.showAlertWithOptions({
//               title: 'Success',
//               subTitle: 'Success unsaved this recipe.',
//               confirmButtonTitle: 'OK',
//               confirmButtonColor: '#EFC81A',
//             })
//             // setTimeout(() => {
//             //     window.location.reload();
//             // }, 1000);
//         })
//         .catch((err) => {
//             console.log(err)
//             // toast.error(`${err}`)
//         })
// }
  
  const recipe = data.data;
  return (
    <View style={MainStyle.container}>
      <ImageBackground
        style={styles.main}
        source={{
          uri: recipe.photo,
        }}
      />
      <View style={styles.titlebox}>
        <View
          style={{
            width: 240,
            maxHeight: 64,
          }}>
          <View>
          
            <Text style={styles.title}>{recipe.title}</Text>
          </View>
          
          <Text style={styles.subtitle}>By {recipe.author}</Text>
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            maxHeight: 64,
            alignItems: 'center',
            marginStart: 16,
          }}>
            {isBookmarked ? (
          <TouchableOpacity style={styles.btn} onPress={deleteBookmark}>
            <Icon name="bookmark" size={23} color="#E9E9E8" />
          </TouchableOpacity>
            ):(
          <TouchableOpacity style={styles.btn2} onPress={postBookmark}>
            <Icon name="bookmark" size={23} color="black" />
          </TouchableOpacity>
            )}
            {isLiked ? (
          <TouchableOpacity style={styles.btn} onPress={deleteLike}>
            <Icon name="thumbs-up" size={23} color="#E9E9E8" />
          </TouchableOpacity> 
            ):(
          <TouchableOpacity style={styles.btn2} onPress={postLike}>
            <Icon name="thumbs-up" size={23} color="black" />
          </TouchableOpacity>
            )}
        </View> */}
      </View>
      <View style={styles.card}>
        <View
          style={{
            padding: 10,
            justifyContent: 'flex-start',
            alignSelf: 'flex-start',
          }}>
          <Text style={{marginTop: 10, color: 'black', fontSize: 26}}>Ingredients: </Text>
          <Text style={{marginTop: 10, color: 'black', fontSize: 16}}>{recipe.ingredients}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: 300,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  card: {
    zIndex: 1,
    marginTop: -10,
    marginHorizontal: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#ffffff',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width * 0.9,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 15,
  },
  namelabel: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    color: 'white',
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 60,
  },
  titlebox: {
    zIndex: 2,
    marginTop: -85,
    marginBottom: 40,
    marginLeft: 16,
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 48,
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 18,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
    backgroundColor: '#EFC81A',
    height: 36,
    width: 36,
    borderRadius: 16,
  },
  btn2: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
    backgroundColor: 'white',
    height: 36,
    width: 36,
    borderRadius: 16,
  },
});
