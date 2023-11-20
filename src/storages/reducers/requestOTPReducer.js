const initialState = {
  data: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
};

const requestOTPReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'REQUEST_OTP_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    case 'REQUEST_OTP_SUCCESS':
      return {
        ...state,
        data: payload,
        isLoading: false,
        isError: false,
        isSuccess: true,
      };
    case 'REQUEST_OTP_ERROR':
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

export default requestOTPReducer;
