const initialState = {
  data: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
};

const verifyReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'VERIFY_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    case 'VERIFY_SUCCESS':
      return {
        ...state,
        data: payload,
        isLoading: false,
        isError: false,
        isSuccess: true,
      };
    case 'VERIFY_ERROR':
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

export default verifyReducer;
