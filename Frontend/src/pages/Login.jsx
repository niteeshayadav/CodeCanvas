import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  //Handle remember me
  const handlerememberMe = () => {
    setLoginData({
      ...loginData,
      rememberMe: !loginData.rememberMe,
    });
  };

  // HANDLE INPUT CHANGE

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE SUBMIT

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await login(loginData);
      toast.success("Login successful");
      navigate("/dashboard");

    } 
    catch (error) {
      toast.error(error.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-base-300 flex items-center justify-center p-4">
      <Toaster />

      <div className="grid lg:grid-cols-2 bg-base-200 rounded-3xl overflow-hidden shadow-2xl border border-base-content/10 max-w-6xl w-full">
        {/* Left Section */}
        <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-neutral to-base-300">
          <h1 className="text-5xl font-bold mb-4">
            Code<span className="text-primary">Canvas</span>
          </h1>

          <p className="text-base-content/70 text-lg mb-8">
            Save snippets. Organize ideas. Build faster.
          </p>

          <div className="mockup-code text-sm">
            <pre data-prefix="$">
              <code>npm run build</code>
            </pre>

            <pre data-prefix=">">
              <code>Build successful 🚀</code>
            </pre>

            <pre data-prefix=">">
              <code>Welcome to Code Canvas</code>
            </pre>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center p-6 md:p-12">
          <div className="card bg-base-100 w-full max-w-md shadow-xl">
            <div className="card-body">
              <div className="mb-6">
                <h2 className="text-3xl font-bold">Welcome Back</h2>

                <p className="text-base-content/60 mt-2">Login to continue</p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="input input-bordered w-full outline-none focus:outline-none"
                    required
                  />
                </div>

                {/* Password */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={loginData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="input input-bordered w-full pr-12 outline-none focus:outline-none"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/60"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Options */}
                <div className="flex items-center justify-between text-sm">
                  {/* Remember Me */}
                  <label className="label cursor-pointer justify-start gap-3">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary checkbox-sm"
                      checked={loginData.rememberMe}
                      onChange={handlerememberMe}
                    />
                    <span className="label-text">Remember me</span>
                  </label>
                </div>

                {/* Login Button */}
                <button
                  className="btn btn-primary w-full"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>

                {/* Signup */}
                <p className="text-center text-sm mt-4">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/register"
                    className="text-primary font-medium hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
