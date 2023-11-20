const initialState = {
  data: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
};

const confirmOTPReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'CONFIRM_OTP_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    case 'CONFIRM_OTP_SUCCESS':
      return {
        ...state,
        data: payload,
        isLoading: false,
        isError: false,
        isSuccess: true,
      };
    case 'CONFIRM_OTP_ERROR':
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

export default confirmOTPReducer;
