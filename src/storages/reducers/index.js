import {combineReducers} from 'redux';
import authReducer from './authReducer';
import regisReducer from './regisReducer';
import getAllReducer from './getRecipeReducer';
import getMyReducer from './myRecipeReducer';
import detailReducer from './detailRecipeReducer';
import addReducer from './addRecipeReducer';
import deleteReducer from './deleteRecipeReducer';
import editReducer from './editRecipeReducer';
import editProfile from './editProfileReducer';
import verifyReducer from './verifyUserReducer';
import requestOTPReducer from './requestOTPReducer';
import getCategoriesReducer from './getCategoriesReducer';
import getRecipeByCat from './getRecipeByCategoryReducer';
import confirmOTPReducer from './confirmOTPReducer';
import changePWReducer from './changePWReducer';
import getSearchReducer from './getSearchReducer';

const appReducers = combineReducers({
  auth: authReducer,
  regis: regisReducer,
  all: getAllReducer,
  my: getMyReducer,
  detail: detailReducer,
  add: addReducer,
  del: deleteReducer,
  edit: editReducer,
  editprofile: editProfile,
  reqotp: requestOTPReducer,
  verify: verifyReducer,
  categories: getCategoriesReducer,
  getbycat: getRecipeByCat,
  confirmotp: confirmOTPReducer,
  changepw: changePWReducer,
  search: getSearchReducer,
});

export default appReducers;
