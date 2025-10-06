import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- Mock AuthContext ---
// In a real application, you would import this from your AuthContext file.
// This is a placeholder to make the component runnable.
const useAuth = () => ({
  login: async (email, password) => {
    console.log("Attempting login with:", email, password);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (email === "test@example.com" && password === "password") {
      console.log("Login successful");
      return { user: { email } };
    }
    throw new Error("Invalid credentials.");
  },
  sendOtp: async (email) => {
    console.log("Sending OTP to:", email);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("OTP sent successfully.");
    return true;
  },
  verifyOtpAndRegister: async (name, email, password, otp) => {
    console.log("Verifying OTP and registering:", {
      name,
      email,
      password,
      otp,
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (otp === "123456") {
      console.log("Registration successful");
      return { user: { name, email } };
    }
    throw new Error("Invalid OTP.");
  },
  handleGoogleLogin: async () => {
    console.log("Handling Google login...");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Google login successful");
    return { user: { email: "googleuser@example.com" } };
  },
});

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

const AuthModal = ({ type, isOpen, onClose }) => {
  const navigate = useNavigate();
  const { login, sendOtp, verifyOtpAndRegister, handleGoogleLogin } = useAuth();

  const [isLogin, setIsLogin] = useState(type === "login");
  const [step, setStep] = useState("form");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLogin(type === "login");
      setStep("form");
      setError("");
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        otp: "",
      });
    }
  }, [isOpen, type]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (e) => {
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
      await sendOtp(form.email);
      setStep("otp");
    } catch (err) {
      setError(err.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await verifyOtpAndRegister(
        form.name,
        form.email,
        form.password,
        form.otp
      );
      onClose();
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      onClose();
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError("");
    try {
      await handleGoogleLogin();
      onClose();
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Google login failed.");
    }
  };

  if (!isOpen) return null;

  return (
    <>
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
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 text-center p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          {!isLogin && step === "otp" ? (
            <form onSubmit={handleVerifyAndRegister} className="space-y-4">
              <p className="text-center text-gray-600">
                An OTP has been sent to <strong>{form.email}</strong>.
              </p>
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-lg focus-within:ring-2 ring-green-500">
                <Lock className="text-green-600" size={20} />
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter 6-Digit OTP"
                  className="bg-transparent outline-none flex-1 text-center tracking-[8px] text-lg"
                  value={form.otp}
                  onChange={handleInputChange}
                  maxLength={6}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-lg font-semibold hover:scale-105 transition-transform disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify & Create Account"}
              </button>
              <p className="text-center text-gray-500 text-sm">
                Didn't receive it?{" "}
                <button
                  type="button"
                  onClick={() => setStep("form")}
                  className="text-green-600 cursor-pointer hover:underline bg-transparent border-none p-0 font-semibold"
                >
                  Go back
                </button>
              </p>
            </form>
          ) : (
            <>
              <form
                onSubmit={isLogin ? handleLogin : handleSendOtp}
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-500 via-lime-400 to-yellow-400 text-white py-3 rounded-lg font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Processing..." : isLogin ? "Login" : "Send OTP"}
                </button>
              </form>

              <div className="flex items-center my-4">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="px-2 text-gray-500 text-sm">OR</span>
                <div className="flex-1 h-px bg-gray-300" />
              </div>

              <button
                onClick={handleGoogleAuth}
                className="w-full flex items-center justify-center gap-3 border-2 border-green-600 text-green-700 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-colors"
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
