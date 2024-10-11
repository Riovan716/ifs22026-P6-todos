import { hideLoading, showLoading } from "react-redux-loading-bar"; // Import actions to show and hide loading indicators
import api from "../../utils/api"; // Import API utility for making HTTP requests
import { asyncPreloadProcess } from "../isPreload/action"; // Import preload process to refresh user data after photo change
import { showErrorDialog } from "../../utils/tools"; // Import utility for displaying error dialogs

// Define action type for user photo change state
const ActionType = {
  SET_IS_USER_CHANGE_PHOTO: "SET_IS_USER_CHANGE_PHOTO", // Action type to set the state for user photo change
};

// Action creator to set the user photo change state
function setIsUserChangePhotoActionCreator(isUserChangePhoto) {
  return {
    type: ActionType.SET_IS_USER_CHANGE_PHOTO,
    payload: { isUserChangePhoto }, // Payload containing the state of user photo change (true/false)
  };
}

// Asynchronous function to handle user photo change
function asyncSetIsUserChangePhoto({ photoFile }) {
  return async (dispatch) => {
    dispatch(showLoading()); // Dispatch action to show loading indicator
    try {
      // Attempt to change the user's profile photo
      await api.postChangePhotoProfile({ photoFile }); // Send the new photo file to the API
      dispatch(setIsUserChangePhotoActionCreator(true)); // Dispatch action to indicate photo change was successful
      dispatch(asyncPreloadProcess()); // Trigger preload process to refresh user data
    } catch (error) {
      // Handle error if photo change fails
      showErrorDialog(error.message); // Display error dialog with the error message
      dispatch(setIsUserChangePhotoActionCreator(false)); // Dispatch action to indicate photo change failed
    }
    dispatch(hideLoading()); // Dispatch action to hide loading indicator
  };
}

// Export action types and action creators for use in other parts of the application
export {
  ActionType,
  setIsUserChangePhotoActionCreator,
  asyncSetIsUserChangePhoto,
};
