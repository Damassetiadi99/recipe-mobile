export const logoutUser = () => {
    return (dispatch, getState) => {
      dispatch({type: 'DELETE_STORE_TOKEN'});
    };
  };