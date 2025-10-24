import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the REAL hook
import { Toaster, toast } from "react-hot-toast"; // <-- Import Toaster

// --- Google Icon SVG Component ---
// Replaces the import from 'react-icons/fc'
const FcGoogle = (props) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    version="1.1"
    x="0px"
    y="0px"
    viewBox="0 0 48 48"
    enableBackground="new 0 0 48 48"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
  c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
  s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    ></path>
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
  C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    ></path>
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
  c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    ></path>
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574
  c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    ></path>
  </svg>
);
// --- END of SVG Component ---

const AuthModal = ({ type, isOpen, onClose }) => {
  const navigate = useNavigate();
  // --- UPDATED: Import new functions ---
  const {
    login,
    signup,
    handleGoogleLogin,
    forgotPassword,
    resendVerificationEmail,
  } = useAuth();

  const [isLogin, setIsLogin] = useState(type === "login");
  const [mode, setMode] = useState("form"); // 'form' or 'forgot'
  const [showResend, setShowResend] = useState(false); // For verification button

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Reset form state when modal opens or type changes
  useEffect(() => {
    if (isOpen) {
      setIsLogin(type === "login");
      setError("");
      setMode("form"); // Reset to form
      setShowResend(false); // Hide resend button
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [isOpen, type]);

  // Also reset errors when switching login/signup
  useEffect(() => {
    setError("");
    setMode("form");
    setShowResend(false);
  }, [isLogin]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // --- UPDATED: Signup handler ---
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await signup(form.name, form.email, form.password);

      // --- NEW FLOW: Switch to login tab instead of closing ---
      // AuthContext ab "Account created! Please verify..." ka toast dikhayega.
      setIsLogin(true);

      // Form clear karein, lekin email rakhein taaki user login kar sake.
      setForm({
        name: "",
        email: form.email, // Email rakhein
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else {
        setError(err.message || "Failed to create account.");
      }
    } finally {
      setLoading(false);
    }
  };

  // --- Login handler (checks verification) ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setShowResend(false); // Hide resend button on new login attempt
    setLoading(true);

    try {
      const userCredential = await login(form.email, form.password);

      // --- VERIFICATION CHECK ---
      if (userCredential.user && !userCredential.user.emailVerified) {
        setError(
          "Your email is not verified. Please check your inbox for the verification link."
        );
        setShowResend(true); // Show the "Resend" button
        setLoading(false);
        // DO NOT close modal or navigate
        return;
      }

      // If verified, proceed
      onClose();
      navigate("/", { replace: true });
    } catch (err) {
      if (err.code === "auth/invalid-credential") {
        setError("Invalid email or password.");
      } else {
        setError(err.message || "Invalid credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Google login handler
  const handleGoogleAuth = async () => {
    setError("");
    setLoading(true);
    try {
      await handleGoogleLogin();
      onClose();
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Google login failed.");
    } finally {
      setLoading(false);
    }
  };

  // --- Forgot Password Handler ---
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await forgotPassword(form.email);
      setMode("form"); // Go back to login form after link is sent
    } catch (err) {
      setError(err.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  // --- Resend Verification Handler ---
  const handleResendVerification = async () => {
    setLoading(true);
    try {
      // We must be logged in to resend, which we are after handleLogin
      await resendVerificationEmail();
      // AuthContext mein toast message dikhega
    } catch (err) {
      // AuthContext error toast dikhayega
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* --- ADDED: Toaster for notifications --- */}
      <Toaster position="top-center" reverseOrder={false} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-green-900/40 backdrop-blur-sm z-[998]"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: -50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: -50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-0 z-[999] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-gray-900 relative border border-green-200"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors"
            onClick={onClose}
          >
            <X size={24} />
          </button>

          <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-lime-500 to-yellow-500">
            {mode === "forgot"
              ? "Reset Password"
              : isLogin
              ? "Welcome Back"
              : "Create Account"}
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 text-center p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          {/* --- FORGOT PASSWORD FORM --- */}
          {mode === "forgot" ? (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <p className="text-gray-600 text-sm text-center">
                Enter your email and we'll send you a link to reset your
                password.
              </p>
              <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-lg focus-within:ring-2 ring-green-500">
                <Mail className="text-green-600" size={20} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="bg-transparent outline-none flex-1"
                  value={form.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-lg font-semibold hover:scale-105 transition-transform disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
              <p className="text-gray-600 text-sm text-center mt-4">
                Remembered your password?{" "}
                <span
                  className="text-green-600 cursor-pointer hover:underline font-semibold"
                  onClick={() => setMode("form")}
                >
                  Back to Login
                </span>
              </p>
            </form>
          ) : (
            /* --- LOGIN/SIGNUP FORM --- */
            <>
              <form
                onSubmit={isLogin ? handleLogin : handleSignup}
                className="space-y-4"
              >
                {!isLogin && (
                  <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-lg focus-within:ring-2 ring-green-500">
                    <User className="text-green-600" size={20} />
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      className="bg-transparent outline-none flex-1"
                      value={form.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )}

                <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-lg focus-within:ring-2 ring-green-500">
                  <Mail className="text-green-600" size={20} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="bg-transparent outline-none flex-1"
                    value={form.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-lg relative focus-within:ring-2 ring-green-500">
                  <Lock className="text-green-600" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="bg-transparent outline-none flex-1"
                    value={form.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 hover:text-gray-900"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {!isLogin && (
                  <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-lg relative focus-within:ring-2 ring-green-500">
                    <Lock className="text-green-600" size={20} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      className="bg-transparent outline-none flex-1"
                      value={form.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="text-gray-500 hover:text-gray-900"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                )}

                {/* --- FORGOT PASSWORD & RESEND LINKS --- */}
                {isLogin && (
                  <div className="text-right">
                    <span
                      className="text-sm text-green-600 hover:underline cursor-pointer"
                      onClick={() => setMode("forgot")}
                    >
                      Forgot Password?
                    </span>
                  </div>
                )}

                {/* --- RESEND VERIFICATION BUTTON --- */}
                {showResend && (
                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleResendVerification}
                    className="w-full bg-yellow-500 text-black py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Resend Verification Email"}
                  </button>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-500 via-lime-400 to-yellow-400 text-white py-3 rounded-lg font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? "Processing..."
                    : isLogin
                    ? "Login"
                    : "Create Account"}
                </button>
              </form>

              <div className="flex items-center my-4">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="px-2 text-gray-500 text-sm">OR</span>
                <div className="flex-1 h-px bg-gray-300" />
              </div>

              <button
                onClick={handleGoogleAuth}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 border-2 border-green-600 text-green-700 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-colors disabled:opacity-50"
              >
                <FcGoogle size={22} />{" "}
                {isLogin ? "Log in with Google" : "Sign up with Google"}
              </button>

              <p className="text-gray-600 text-sm text-center mt-4">
                {isLogin
                  ? "Don’t have an account? "
                  : "Already have an account? "}
                <span
                  className="text-green-600 cursor-pointer hover:underline font-semibold"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Sign Up" : "Login"}
                </span>
              </p>
            </>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default AuthModal;
