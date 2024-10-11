import { hideLoading, showLoading } from "react-redux-loading-bar"; // Import loading actions for displaying loading indicators
import api from "../../utils/api"; // Import API utility for making requests
import { setAuthLoginActionCreator } from "../authLogin/action"; // Import action creator for setting authentication login

// Define action types for preload state management
const ActionType = {
  SET_IS_PRELOAD: "SET_IS_PRELOAD", // Action type to set preload state
};

// Action creator to set the preload state
function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload, // Payload containing the preload state (true/false)
    },
  };
}

// Asynchronous function to handle the preload process
function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading()); // Dispatch action to show loading indicator
    try {
      // Attempt to preload user data
      const authUser = await api.getMe(); // Fetch the authenticated user data
      dispatch(setAuthLoginActionCreator(authUser)); // Dispatch action to set authenticated user data
    } catch (error) {
      // Handle error if the preload process fails
      console.error(error); // Log the error to the console
      dispatch(setAuthLoginActionCreator(null)); // Dispatch action to unset authentication (user is not logged in)
    } finally {
      // Ensure the preload process is marked as complete
      dispatch(setIsPreloadActionCreator(false)); // Dispatch action to set preload state to false
    }
    dispatch(hideLoading()); // Dispatch action to hide loading indicator
  };
}

// Export action types and action creators for use in other parts of the application
export { ActionType, setIsPreloadActionCreator, asyncPreloadProcess };
