// authService.js
export const getLoggedInUserId = () => {
  // Retrieve the user data from localStorage or sessionStorage
  const user = JSON.parse(localStorage.getItem('user'));  // Assuming user data is stored in localStorage
  return user ? user.id : null; // Return user ID if logged in, else return null
};
