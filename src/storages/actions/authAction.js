import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `https://rich-blue-scorpion-robe.cyclic.app/users/login`;
console.log(url);
export const loginUser = data => async dispatch => {
  try {
    dispatch({ type: 'USER_LOGIN_PENDING' });
    const result = await axios.post(`https://rich-blue-scorpion-robe.cyclic.app/users/login`,data);
 
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: result.data });
    const token = result.data.users.token
    console.log(token)
    AsyncStorage.setItem('token', token);

    console.log('User Login success');
  } catch (err) {
    console.log('User Login failed');
    console.log(err);
    console.log(err.response.message);
    dispatch({ type: 'USER_LOGIN_ERROR', payload : err.response.message });
  }
};