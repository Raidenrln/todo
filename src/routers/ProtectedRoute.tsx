import { Navigate, Outlet } from "react-router-dom";

// ProtectedRoute is a component that checks
// whether the user has a token before allowing
// them to see a protected page.
const ProtectedRoute = () => {

  // Get the JWT token that was saved in localStorage.
  //
  // When the user logs in successfully, you probably
  // do something like:
  //
  // localStorage.setItem("token", token);
  //
  // If the token doesn't exist, getItem() returns null.
  const token = localStorage.getItem("token");


  // If there is NO token...
  if (!token) {

    // Send the user to the login page.
    //
    // replace means the current page is replaced
    // in browser history instead of adding another
    // history entry.
    return <Navigate to="/login" replace />;
  }


  // If a token exists, display the protected route.
  //
  // <Outlet /> represents the child route
  // that is being protected.
  return <Outlet />;
};


// Export the component so it can be used
// in your React Router configuration.
export default ProtectedRoute;