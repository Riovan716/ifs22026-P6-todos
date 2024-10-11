// Functional component to render a Not Found page
function NotFoundPage() {
  return (
    <div className="container pt-2">
      {/* Container for the Not Found message */}
      <div className="text-center text-danger">
        {/* Centered text with red color to indicate an error */}
        <h1>404</h1> {/* Display the HTTP status code for Not Found */}
        <h3>Halaman Tidak Ditemukan</h3>{" "}
        {/* Display a message indicating the page is not found */}
      </div>
    </div>
  );
}

export default NotFoundPage; // Export the NotFoundPage component for use in other parts of the application
