import axios from 'axios';

export const registerUser = data => async dispatch => {
      try {
        dispatch({type: 'USER_REGISTER_PENDING'});
        const result = await axios.post(`https://rich-blue-scorpion-robe.cyclic.app/users/register`, data);
        // const user = result.data.data;
        dispatch({type: 'USER_REGISTER_SUCCESS', payload: result.data});
        console.log('User Register success');
      } catch (err) {
        console.log('User Register failed');
        console.log(err);
        dispatch({type: 'USER_REGISTER_ERROR'});
      }
    };