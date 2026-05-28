import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  
  const [registerData, setRegisterData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    rememberMe: false
  });
  
  //Handle remember me
  const handlerememberMe = () => {
    setRegisterData((prev) => ({
      ...prev,
      rememberMe: !prev.rememberMe,
    }));
  };

  //Handle input change

  const handleChange = (e) => {
    setRegisterData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  //Handle submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (registerData.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    try{
       await register(registerData);
       toast.success("Registration successful");
       navigate("/dashboard");
    }
    catch(error){
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-base-300 flex items-center justify-center p-4">
      <Toaster />
      <div className="grid lg:grid-cols-2 bg-base-200 rounded-3xl overflow-hidden shadow-2xl border border-base-content/10 max-w-6xl w-full">
        {/* Left Section */}
        <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-neutral to-base-300">
          <h1 className="text-5xl font-bold mb-4">
            Dev<span className="text-primary">Notes</span>
          </h1>

          <p className="text-base-content/70 text-lg mb-8">
            Create your developer workspace and save everything important.
          </p>

          <div className="mockup-code text-sm">
            <pre data-prefix="$">
              <code>git commit -m "Build DevNotes"</code>
            </pre>

            <pre data-prefix=">">
              <code>Code saved successfully 🚀</code>
            </pre>

            <pre data-prefix=">">
              <code>Welcome developer 👨‍💻</code>
            </pre>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center p-6 md:p-12">
          <div className="card bg-base-100 w-full max-w-md shadow-xl">
            <div className="card-body">
              <div className="mb-6">
                <h2 className="text-3xl font-bold">Create Account</h2>

                <p className="text-base-content/60 mt-2">Join DevNotes today</p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Username */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text ">Username</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your username"
                    name="username"
                    value={registerData.username}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Full Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text ">Full Name</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your username"
                    name="fullname"
                    value={registerData.fullname}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={registerData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="input input-bordered w-full"
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
                      value={registerData.password}
                      onChange={handleChange}
                      placeholder="Create password"
                      className="input input-bordered w-full pr-12"
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

                {/* Remember Me */}
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary checkbox-sm"
                    checked={registerData.rememberMe}
                    onChange={handlerememberMe}
                  />
                  <span className="label-text">Remember me</span>
                </label>

                {/* Register Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full"
                >
                  Create Account
                </button>

                {/* Login Link */}
                <p className="text-center text-sm mt-4">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary font-medium cursor-pointer hover:underline"
                  >
                    Login
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
