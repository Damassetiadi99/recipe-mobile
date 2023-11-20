const initialState = {
    data: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
  };
  
  const getSearchReducer = (state = initialState, {type, payload}) => {
    switch (type) {
      case 'GET_SEARCHRECIPE_PENDING':
        return {
          ...state,
          isLoading: true,
          isError: false,
          isSuccess: false,
        };
      case 'GET_SEARCHRECIPE_SUCCESS':
        return {
          ...state,
          data: payload,
          isLoading: false,
          isError: false,
          isSuccess: true,
        };
      case 'GET_SEARCHRECIPE_ERROR':
        return {
          ...state,
          data: payload,
          isLoading: false,
          isError: true,
          isSuccess: false,
        };
      case 'DELETE_STORE_TOKEN':
        return {
          ...state,
          data: null,
          isLoading: false,
          isError: false,
          isSuccess: true,
        };
      default:
        return state;
    }
  };
  
  export default getSearchReducer;
  