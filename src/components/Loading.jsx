import { useSelector } from "react-redux";

function Loading() {
  // Fetch the loading state from the Redux store, specifically from the 'loadingBar' slice of state.
  const isLoading = useSelector((state) => state.loadingBar.default);

  // Determine whether the loading spinner should be visible or hidden.
  // If the value of 'isLoading' is 0, the class 'd-none' is applied to hide the spinner.
  // Otherwise, the spinner will be visible.
  let loadingClass = "";
  if (isLoading === 0) {
    loadingClass = "d-none"; // Hide the loading spinner if isLoading equals 0.
  } else {
    loadingClass = ""; // Show the spinner for any other values.
  }

  // The 'loader' element will always be present in the DOM, but its visibility is controlled
  // by the CSS class 'd-none', which is conditionally applied based on the loading state.
  return (
    <div className={`loading ${loadingClass}`}>
      <div className="loader"></div>
    </div>
  );
}

export default Loading;
