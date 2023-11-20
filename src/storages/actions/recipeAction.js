import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const url = `https://rich-blue-scorpion-robe.cyclic.app/`;

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
export const getAllRecipe = (search) => async dispatch => {
  try {
    const token = await getToken();
    dispatch({ type: 'GET_RECIPE_PENDING' });
    const result = await axios.get(`https://rich-blue-scorpion-robe.cyclic.app/recipe`, {headers: {
      'Authorization': `Bearer ${token}`
       },
       params: {
         limit: 100,
         searchBY: 'title',
         searchRecipe: search,
       },});
    console.log(token)
    let res = result.data.data;
    console.log(result.data);
    dispatch({ type: 'GET_RECIPE_SUCCESS', payload: res });
  } catch (error) {
    dispatch({ type: 'GET_RECIPE_ERROR' });
    console.log(error)
  }
};

export const getSearchRecipe = (search) => async dispatch => {

  try {
    const token = await getToken();
    dispatch({ type: 'GET_SEARCHRECIPE_PENDING' });
    const result = await axios.get(`https://rich-blue-scorpion-robe.cyclic.app/recipe/detail/recipe`, {headers: {
      'Authorization': `Bearer ${token}`
       },
       params: {
         limit: 100,
         searchBY: 'title',
         search: search,
       },});
    console.log(search)
    let res = result.data.data;
    dispatch({ type: 'GET_SEARCHRECIPE_SUCCESS', payload: res });
    console.log(result.data);
  } catch (error) {
    dispatch({ type: 'GET_SEARCHRECIPE_ERROR' });
    console.log(error)
  }
};

export const getRecipeByCategory = (search) => async dispatch => {
  try {
    const token = await getToken();
    dispatch({ type: 'GET_RECIPE_CAT_PENDING' });
    const result = await axios.get(
      'https://rich-blue-scorpion-robe.cyclic.app/recipe/' + '?searchBy=categories_id::text' + '&search=' + search,
      {headers: {
        'Authorization': `Bearer ${token}`
         }});
    let res = result.data.data;
    dispatch({ type: 'GET_RECIPE_CAT_SUCCESS', payload: res });
  } catch (error) {
    console.log(search)
    dispatch({ type: 'GET_RECIPE_CAT_ERROR' });
  }
};

export const getMyRecipe = token => async dispatch => {
  const token = await getToken();
  try {
    dispatch({ type: 'GET_MY_RECIPE_PENDING' });
    const result = await axios.get('https://rich-blue-scorpion-robe.cyclic.app/recipe/' + 'myRecipe/coba', {headers: {
      'Authorization': `Bearer ${token}`
       }});
    let res = result.data.data;
    dispatch({ type: 'GET_MY_RECIPE_SUCCESS', payload: res });
  } catch (error) {
    console.log(error)
    // console.log(error.response.data.message)
    dispatch({ type: 'GET_MY_RECIPE_ERROR' , payload: error.response.data.message});
  }
};

export const getDetailRecipe = (token, id) => async dispatch => {
  try {
    const token = await getToken();
    dispatch({ type: 'GET_DETAIL_RECIPE_PENDING' });
    const result = await axios.get('https://rich-blue-scorpion-robe.cyclic.app/recipe/' + id, {headers: {
      'Authorization': `Bearer ${token}`
       }});
    console.log('url: ', url + id);
    let res = result.data.data;
    dispatch({ type: 'GET_DETAIL_RECIPE_SUCCESS', payload: res });
  } catch (error) {
    dispatch({ type: 'GET_DETAIL_RECIPE_ERROR' });
  }
};

export const addRecipe = (token, formData) => async dispatch => {
  try {
    dispatch({ type: 'ADD_RECIPE_PENDING' });
    const result = await axios.post('https://rich-blue-scorpion-robe.cyclic.app/recipe/recipe', formData, {headers: {
      'Content-Type' : 'multipart/form-data',
      'Authorization': `Bearer ${token}`
       }});
    dispatch({ type: 'ADD_RECIPE_SUCCESS', payload : result.data });
  } catch (err) {
    dispatch({ type: 'ADD_RECIPE_FAILED', payload: err.response.data.message });
    // console.log(payload)
    console.log('Error', err);
    // console.log(err);
    console.log('Add Recipe error');
  }
};

export const editRecipe = (token, data, id) => async dispatch => {
  try {
    const token = await getToken();
    dispatch({ type: 'EDIT_RECIPE_PENDING' });
    const result = await axios.put('https://rich-blue-scorpion-robe.cyclic.app/recipe/putRecipe/' + id, data, {headers: {
      'Authorization': `Bearer ${token}`
       }});
    const payload = result.data;
    dispatch({ type: 'EDIT_RECIPE_SUCCESS', payload });
  } catch (err) {
    dispatch({ type: 'EDIT_RECIPE_FAILED', payload: err.response.data.message });
    console.log('Edit Recipe error');
    console.log('data = ', data);
    console.log(err);
  }
};

export const deleteRecipe = (token, id) => async dispatch => {
  try {
    const token = await getToken();
    dispatch({ type: 'DELETE_RECIPE_PENDING' });
    const result = await axios.delete('https://rich-blue-scorpion-robe.cyclic.app/recipe/' + `${id}`, {headers: {
      'Authorization': `Bearer ${token}`
       }});
    const recipe = result.data;
    dispatch({ type: 'DELETE_RECIPE_SUCCESS', payload: recipe });
  } catch (err) {
    dispatch({
      type: 'DELETE_RECIPE_FAILED',
      payload: err.response.data.message,
    });
    console.log('Delete Recipe error');
    console.log(err);
  }
};


const url_cat = `https://rich-blue-scorpion-robe.cyclic.app/Category`;
export const getCategories = (token) => async dispatch => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  try {
    dispatch({ type: 'GET_CATEGORIES_PENDING' });
    const result = await axios.get('https://rich-blue-scorpion-robe.cyclic.app/Category', config);
    console.log(result)
    let res = result.data.data;
    dispatch({ type: 'GET_CATEGORIES_SUCCESS', payload: res });
  } catch (error) {
    dispatch({ type: 'GET_CATEGORIES_ERROR' });
  }
};
