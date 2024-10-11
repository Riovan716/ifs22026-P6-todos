import { useRef } from "react";
import PropTypes from "prop-types";
import { formatDate } from "../utils/tools";
import { FaUpload } from "react-icons/fa6";

// The UserDetail component handles displaying user details and allows for profile picture updates
function UserDetail({ authLogin, onUserChangePhoto }) {
  // Use a ref to reference the hidden file input
  const fileInputRef = useRef(null);

  // Function to handle when a file is selected for profile picture update
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Perform extra validation on file selection (e.g., file size, type, etc.)
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      const maxSize = 5 * 1024 * 1024; // 5 MB

      if (!allowedTypes.includes(file.type)) {
        alert("Only image files (jpg, png, gif) are allowed!");
      } else if (file.size > maxSize) {
        alert("File size must be less than 5MB!");
      } else {
        onUserChangePhoto({ photoFile: file });
      }
    } else {
      alert("No file selected.");
    }
  };

  // Function to simulate clicking the hidden file input
  const handleUploadClick = () => {
    fileInputRef.current.click(); // Trigger the file input click
  };

  return (
    <div id={`user-${authLogin.id}`} className="card">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-12">
            <div className="d-flex">
              <div>
                <img
                  className="rounded-circle"
                  width={76}
                  height={76}
                  src={authLogin.photo}
                  alt={`${authLogin.name}'s profile`}
                />
              </div>
              <div className="ms-3">
                <h3 className="text-primary">{authLogin.name}</h3>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={handleUploadClick}
                >
                  <FaUpload /> Ubah Photo Profile
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="d-none"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <small className="text-muted d-block mt-2">
                  Only JPG, PNG, and GIF files allowed. Max size: 5MB.
                </small>
              </div>
            </div>
            <hr />
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th>Nama</th>
                  <td>{authLogin.name}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{authLogin.email}</td>
                </tr>
                <tr>
                  <th>Bergabung sejak</th>
                  <td>{formatDate(authLogin.created_at)}</td>
                </tr>
                <tr>
                  <th>Last Updated</th>
                  <td>{formatDate(authLogin.updated_at)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Define the shape of the authLogin prop, requiring valid fields
const authLoginShape = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired, // Added to format the join date
  updated_at: PropTypes.string.isRequired, // Added to format the last updated date
};

UserDetail.propTypes = {
  authLogin: PropTypes.shape(authLoginShape).isRequired,
  onUserChangePhoto: PropTypes.func.isRequired,
};

export { authLoginShape };
export default UserDetail;
