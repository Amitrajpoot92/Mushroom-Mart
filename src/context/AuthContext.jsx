import React, { createContext, useContext, useState, useEffect } from "react";
// Import db from firebase.js
import { auth, db } from "../firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
  sendEmailVerification, // <-- For verification link
  sendPasswordResetEmail, // <-- For forgot password
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; // For database
import toast from "react-hot-toast"; // For notifications

// Create Context
const AuthContext = createContext();

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To check auth state on load

  useEffect(() => {
    // This listener handles all auth state changes from Firebase
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Auth state has been checked, app can now render
    });

    // Cleanup subscription on unmount to prevent memory leaks
    return () => unsubscribe();
  }, []);

  // Standard email/password login
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google login (Updated with Firestore)
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user already exists in Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // New user, create their document in Firestore
        await setDoc(userDocRef, {
          name: user.displayName,
          email: user.email,
        });
        toast.success("Welcome to Mushroom Mart!");
      } else {
        toast.success("Welcome back!");
      }
      return result;
    } catch (error) {
      toast.error(error.message || "Google login failed.");
      throw error;
    }
  };

  /**
   * --- UPDATED SIGNUP FUNCTION ---
   * Creates user, saves to DB, sends verification, and THEN LOGS OUT.
   */
  const signup = async (name, email, password) => {
    try {
      // 1. Create the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      // 2. Update their Firebase profile with the provided name
      await updateProfile(firebaseUser, {
        displayName: name,
      });

      // 3. Save user data to Firestore
      const userDocRef = doc(db, "users", firebaseUser.uid);
      await setDoc(userDocRef, {
        name: name,
        email: email,
      });

      // 4. Send verification email
      await sendEmailVerification(firebaseUser);

      // --- 5. (NEW STEP) Sign the user out immediately ---
      // This forces them to log in after verifying
      await signOut(auth);

      // 6. Update toast message to be clearer
      toast.success(
        "Account created! Please check your email to verify, then log in."
      );

      return userCredential;
    } catch (error) {
      // Re-throw the error so it can be caught and displayed by the AuthModal
      toast.error(error.message || "Signup failed.");
      throw error;
    }
  };

  // --- NEW FUNCTION: Forgot Password (for logged-out users) ---
  const forgotPassword = (email) => {
    if (!email) {
      toast.error("Please enter your email address first.");
      return Promise.reject("No email provided");
    }
    toast.loading("Sending reset link...");
    return sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.dismiss();
        toast.success("Password reset link sent to your email!");
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.message || "Failed to send link.");
        throw error;
      });
  };

  // --- NEW FUNCTION: Send Password Update Link (for logged-in users) ---
  const sendPasswordUpdateLink = () => {
    const currentUser = auth.currentUser;
    if (!currentUser || !currentUser.email) {
      toast.error("Could not find user email.");
      return Promise.reject("No user email found");
    }

    toast.loading("Sending update link...");
    return sendPasswordResetEmail(auth, currentUser.email)
      .then(() => {
        toast.dismiss();
        toast.success(
          "Password update link sent to your email! Please check your inbox."
        );
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.message || "Failed to send link.");
        throw error;
      });
  };

  // --- Resend Verification Email Function ---
  const resendVerificationEmail = () => {
    // This function assumes the user *just* tried to log in
    // and auth.currentUser is set to the unverified user.
    const currentUser = auth.currentUser;
    if (currentUser) {
      toast.loading("Sending verification link...");
      return sendEmailVerification(currentUser)
        .then(() => {
          toast.dismiss();
          toast.success("Verification link sent! Please check your inbox.");
        })
        .catch((error) => {
          toast.dismiss();
          toast.error(error.message);
        });
    } else {
      toast.error("Please log in first to resend verification.");
      return Promise.reject("No user found to resend verification");
    }
  };

  // Logout (Updated with toast)
  const logout = () => {
    toast.success("Logged out successfully.");
    return signOut(auth);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    handleGoogleLogin,
    logout,
    forgotPassword,
    resendVerificationEmail,
    sendPasswordUpdateLink, // <-- Naya function add kiya
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Don't render the rest of the app until auth state is confirmed */}
      {!loading && children}
    </AuthContext.Provider>
  );
};
