import { useDispatch } from "react-redux";
import LoginInput from "../components/LoginInput";
import { asyncSetAuthLogin } from "../states/authLogin/action";

// Functional component for the login page
function LoginPage() {
  const dispatch = useDispatch(); // Hook to dispatch actions to the Redux store

  // Function to handle user login with email and password
  const onAuthLogin = ({ email, password }) => {
    // Dispatch an asynchronous action to authenticate the user
    dispatch(asyncSetAuthLogin({ email, password }));
  };

  return (
    <div className="container pt-2">
      {/* Render the LoginInput component and pass onAuthLogin as a prop */}
      <LoginInput onAuthLogin={onAuthLogin} />
    </div>
  );
}

export default LoginPage;
