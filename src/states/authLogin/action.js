import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { showErrorDialog } from "../../utils/tools";

// Action types for authentication
const ActionType = {
  SET_AUTH_LOGIN: "SET_AUTH_LOGIN", // Action type for setting authenticated login
  UNSET_AUTH_LOGIN: "UNSET_AUTH_LOGIN", // Action type for unsetting authenticated login
};

// Action creator to set the authenticated user in the state
function setAuthLoginActionCreator(authLogin) {
  return {
    type: ActionType.SET_AUTH_LOGIN,
    payload: {
      authLogin, // Payload contains the authenticated user's data
    },
  };
}

// Action creator to unset the authenticated user in the state
function unsetAuthLoginActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_LOGIN,
    payload: {
      authLogin: null, // Payload sets authLogin to null when user logs out
    },
  };
}

// Asynchronous action to handle user login
function asyncSetAuthLogin({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading()); // Show the loading indicator
    try {
      // API call to authenticate the user and get the token
      const token = await api.postAuthLogin({ email, password });
      api.putAccessToken(token); // Store the access token for future API requests
      const authLogin = await api.getMe(); // Fetch the authenticated user's data
      dispatch(setAuthLoginActionCreator(authLogin)); // Update the state with the user's data
    } catch (error) {
      showErrorDialog(error.message); // Show an error dialog if authentication fails
    }
    dispatch(hideLoading()); // Hide the loading indicator
  };
}

// Asynchronous action to handle user logout
function asyncUnsetAuthLogin() {
  return (dispatch) => {
    dispatch(showLoading()); // Show the loading indicator
    dispatch(unsetAuthLoginActionCreator()); // Clear the authenticated user's data from the state
    api.putAccessToken(""); // Clear the access token from storage
    dispatch(hideLoading()); // Hide the loading indicator
  };
}

// Exporting action types and action creators for use in other parts of the application
export {
  ActionType,
  setAuthLoginActionCreator,
  unsetAuthLoginActionCreator,
  asyncSetAuthLogin,
  asyncUnsetAuthLogin,
};
