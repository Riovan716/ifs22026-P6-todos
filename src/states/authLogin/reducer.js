import { ActionType } from "./action";

// Reducer function to manage the authentication state in the Redux store
function authLoginReducer(authLogin = null, action = {}) {
  switch (action.type) {
    // Handle the action to set the authenticated user in the state
    case ActionType.SET_AUTH_LOGIN:
      return action.payload.authLogin; // Update the state with the authenticated user's data

    // Handle the action to unset the authenticated user in the state
    case ActionType.UNSET_AUTH_LOGIN:
      return null; // Clear the authenticated user's data from the state

    // Return the current state by default if the action type does not match
    default:
      return authLogin; // Keep the state unchanged if no relevant action is found
  }
}

export default authLoginReducer;
