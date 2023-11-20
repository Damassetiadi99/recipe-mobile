import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `https://rich-blue-scorpion-robe.cyclic.app/users/getUser`;

async function getToken() {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      // Token berhasil diambil dari penyimpanan
      return token;
    } else {
      throw new Error('Token tidak ditemukan dalam penyimpanan.');
    }
  } catch (error) {
    console.error('Gagal mengambil token dari penyimpanan:', error);
    throw error; // Meneruskan kesalahan ke atas
  }
}



export const editProfile = (token, data, id) => async dispatch => {
  try {
    dispatch({type: 'EDIT_PROFILE_PENDING'});
    const result = await axios.put('https://rich-blue-scorpion-robe.cyclic.app/users/putUser' + id, data, {headers: {
      'Authorization': `Bearer ${token}`
       }});
       const payload = result.data;
       console.log(result)
    dispatch({type: 'EDIT_PROFILE_SUCCESS', payload});
  } catch (err) {
    dispatch({type: 'EDIT_PROFILE_FAILED', payload: err.response.data.message});
    console.log('Edit Profile error');
    console.log('data = ', data);
    console.log(err);
    console.log(token)
    console.log(id)
    console.log('url: ', url + id);
  }
};
