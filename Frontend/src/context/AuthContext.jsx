import React, { createContext, useContext, useState } from "react";

// Create Context
const AuthContext = createContext();

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Simulated login
  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      const foundUser = storedUsers.find(
        (u) => u.email === email && u.password === password
      );
      setTimeout(() => {
        if (foundUser) {
          localStorage.setItem("user", JSON.stringify(foundUser));
          setUser(foundUser);
          resolve(foundUser);
        } else {
          reject({ response: { data: { message: "Invalid credentials." } } });
        }
      }, 1000);
    });
  };

  // Simulated Google login
  const handleGoogleLogin = async () => {
    return new Promise((resolve) => {
      const googleUser = {
        name: "Google User",
        email: "googleuser@example.com",
      };
      localStorage.setItem("user", JSON.stringify(googleUser));
      setUser(googleUser);
      resolve(googleUser);
    });
  };

  // Simulated sending OTP
  const sendOtp = async (email) => {
    return new Promise((resolve, reject) => {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      const existingUser = storedUsers.find((u) => u.email === email);
      setTimeout(() => {
        if (existingUser) {
          reject({ response: { data: { message: "Email already exists." } } });
        } else {
          // Store OTP in sessionStorage
          const otp = Math.floor(100000 + Math.random() * 900000).toString();
          sessionStorage.setItem("otp_" + email, otp);
          console.log("Simulated OTP for", email, ":", otp); // For testing
          resolve();
        }
      }, 1000);
    });
  };

  // Simulated verify OTP & register
  const verifyOtpAndRegister = async (name, email, password, otp) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const storedOtp = sessionStorage.getItem("otp_" + email);
        if (storedOtp === otp) {
          const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
          const newUser = { name, email, password };
          storedUsers.push(newUser);
          localStorage.setItem("users", JSON.stringify(storedUsers));
          localStorage.setItem("user", JSON.stringify(newUser));
          setUser(newUser);
          sessionStorage.removeItem("otp_" + email);
          resolve(newUser);
        } else {
          reject({ response: { data: { message: "Invalid OTP." } } });
        }
      }, 1000);
    });
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        sendOtp,
        verifyOtpAndRegister,
        handleGoogleLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
