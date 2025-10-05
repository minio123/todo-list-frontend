// src/app/api/auth.js
// Simulated API services for login, logout, register and change password

// Simulate API call for login
const login = async (params) => {
  const response = {
    status: "success",
    message: "Login successful",
    user: {
      email: params.email,
      name: params.name,
      picture: params.picture,
    },
  };
  localStorage.setItem("isLoggedIn", true);
  return response;
};

// Simulate API call for creating account
const register = async (params) => {};

// Simulate API call for changing password
const changePassword = async (params) => {};

export { login, register, changePassword };
