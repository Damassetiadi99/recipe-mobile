const initialState = {
  data: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
};

const changePWReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'CHANGE_PW_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    case 'CHANGE_PW_SUCCESS':
      return {
        ...state,
        data: payload,
        isLoading: false,
        isError: false,
        isSuccess: true,
      };
    case 'CHANGE_PW_ERROR':
      return {
        ...state,
        data: payload,
        isLoading: false,
        isError: true,
        isSuccess: false,
      };
    default:
      return state;
  }
};

export default changePWReducer;
