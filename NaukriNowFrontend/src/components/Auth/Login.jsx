import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Redirect priority:
  // 1) ProtectedRoute se aya hai to state.from pe wapas bhejo
  // 2) ?redirect=... query param diya gaya hai to wahan bhejo
  // 3) warna naye/returning user ko role selection pe bhejo
  const getRedirectPath = () => {
    const fromProtectedRoute = location.state?.from?.pathname;
    if (fromProtectedRoute) return fromProtectedRoute;

    const params = new URLSearchParams(location.search);
    const redirectParam = params.get("redirect");
    if (redirectParam) return redirectParam;

    return "/select-role";
  };

  // Normal Email/Password Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
          method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate(getRedirectPath(), { replace: true });
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Google Login Success
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/google`, {
          credential: credentialResponse.credential,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate(getRedirectPath(), { replace: true });
    } catch (err) {
      console.error("Google login failed", err);
      setError("Google login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="text-indigo-600 font-bold text-2xl">
              NaukriNow
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/signup" className="text-gray-600 hover:text-indigo-600 text-sm">
                Post your CV
              </Link>
              <Link
                to="/signup"
                className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-50 text-sm"
              >
                Create account
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Login Form */}
      <main className="max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sign in</h1>
          <p className="mt-2 text-gray-600">
            Access your account to see your job recommendations
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow rounded-lg border border-gray-200">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />{" "}
                Remember me
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Google Login */}
          <div className="mt-6 flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError("Google Login Failed")}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Create one
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;