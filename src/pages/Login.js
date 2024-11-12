import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../Authentication/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const { login, googleSignIn, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          return;
        }
        await signup(formData.email, formData.password);
      }
      navigate("/");
    } catch (err) {
      setError(`Failed to ${isLogin ? "login" : "sign up"}: ${err.message}`);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      await googleSignIn();
      navigate("/");
    } catch (err) {
      setError(`Failed to sign in with Google: ${err.message}`);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-900 text-gray-200 px-8">
      <motion.div
        className="w-full max-w-md flex flex-col bg-gray-800 rounded-xl shadow-lg overflow-hidden"
        layout
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Toggle Section */}
        <div className="p-6">
          <div className="flex items-center justify-between relative w-full bg-gray-700 rounded-lg">
            <motion.div
              className={`p-4 z-[1] w-2/4 text-center cursor-pointer ${
                !isLogin ? "text-white" : ""
              }`}
              onClick={() => setIsLogin(false)}
              animate={{ color: !isLogin ? "#fff" : "#9CA3AF" }}
              transition={{ duration: 0.3 }}
            >
              <p className="font-medium">Sign Up</p>
            </motion.div>
            <motion.div
              className={`p-4 z-[1] w-2/4 text-center cursor-pointer ${
                isLogin ? "text-white" : ""
              }`}
              onClick={() => setIsLogin(true)}
              animate={{ color: isLogin ? "#fff" : "#9CA3AF" }}
              transition={{ duration: 0.3 }}
            >
              <p className="font-medium">Log In</p>
            </motion.div>
            <motion.div
              className="absolute bg-green-500 h-full w-2/4 rounded-lg"
              animate={{ x: isLogin ? "100%" : "0%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Form Section */}
        <div className="px-6 pb-6">
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div layout>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-700 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </motion.div>

            <motion.div layout>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-700 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter your password"
                required
              />
            </motion.div>

            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  key="confirm-password-field"
                >
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-700 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    placeholder="Confirm your password"
                    required
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              layout
              type="submit"
              className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium"
              whileTap={{ scale: 0.98 }}
            >
              {isLogin ? "Log In" : "Sign Up"}
            </motion.button>

            <motion.button
              layout
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium mt-4"
              whileTap={{ scale: 0.98 }}
            >
              Sign in with Google
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
