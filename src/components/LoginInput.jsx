import PropTypes from "prop-types";
import useInput from "../hooks/useInput";

// Functional component for the login input form
function LoginInput({ onAuthLogin }) {
  // Using a custom hook to manage the email state and change handler
  const [email, onEmailChange] = useInput("");
  // Using a custom hook to manage the password state and change handler
  const [password, onPasswordChange] = useInput("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default page refresh behavior on form submission
    onAuthLogin({ email, password }); // Calls the function passed via props with email and password
  };

  return (
    // Form element with a submit event handler
    <form onSubmit={handleSubmit}>
      <div className="form px-4">
        <div className="mb-3">
          {/* Label for the email input field */}
          <label htmlFor="inputEmail" className="form-label">
            Email
          </label>
          {/* Email input field */}
          <input
            type="email"
            id="inputEmail"
            value={email} // Controlled input bound to the email state
            onChange={onEmailChange} // Updates email state when input changes
            className="form-control"
            placeholder="email@example.com"
            required // Ensures that the field must be filled out before submitting
          />
        </div>
        <div className="mb-3">
          {/* Label for the password input field */}
          <label htmlFor="inputPassword" className="form-label">
            Password
          </label>
          {/* Password input field */}
          <input
            type="password"
            id="inputPassword"
            value={password} // Controlled input bound to the password state
            onChange={onPasswordChange} // Updates password state when input changes
            className="form-control"
            required // Ensures that the field must be filled out before submitting
          />
        </div>
        <div className="mb-4 text-end">
          {/* Submit button for the form */}
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </div>
    </form>
  );
}

// Defining prop types to ensure that onAuthLogin is a required function
LoginInput.propTypes = {
  onAuthLogin: PropTypes.func.isRequired,
};

export default LoginInput;
