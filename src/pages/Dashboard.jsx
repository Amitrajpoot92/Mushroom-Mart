import { useAuth } from "../context/AuthContext";
import { User, ShoppingBag, Settings, Sun } from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  // Get the current user from the AuthContext
  const { user } = useAuth();

  // A fallback for the user's photo URL
  const userPhoto =
    user?.photoURL ||
    `https://api.dicebear.com/8.x/initials/svg?seed=${
      user?.displayName || user?.email
    }`;

  if (!user) {
    // This should ideally be handled by a protected route,
    // but it's a good fallback.
    return (
      <div className="text-center text-white py-20">
        <p>You need to be logged in to view this page.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#fdfbe9] text-gray-900 min-h-screen p-4 sm:p-8 font-serif">
      <div className="max-w-4xl mx-auto">
        {/* --- Header Section --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-6 mb-12"
        >
          <img
            src={userPhoto}
            alt="User Profile"
            className="w-24 h-24 rounded-full border-4 border-yellow-400 object-cover shadow-lg"
          />
          <div>
            <h1
              className="text-3xl sm:text-4xl font-bold text-gray-800"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              Welcome back,
            </h1>
            <p className="text-2xl text-green-700 font-semibold">
              {user.displayName || user.email}!
            </p>
          </div>
        </motion.div>

        {/* --- Dashboard Widgets --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* My Farm Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-200"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Sun className="text-green-600" size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-800">My Farm</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Manage your mushroom cultivation projects and track their growth.
            </p>
            <button className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition">
              View Farm Stats
            </button>
          </motion.div>

          {/* My Orders Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-200"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <ShoppingBag className="text-yellow-600" size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-800">My Orders</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Check the status of your recent mushroom and supply purchases.
            </p>
            <button className="w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600 transition">
              Track Orders
            </button>
          </motion.div>

          {/* Profile Settings Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-200"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Settings className="text-blue-600" size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Profile Settings
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Update your personal information, address, and preferences.
            </p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
              Edit Profile
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
