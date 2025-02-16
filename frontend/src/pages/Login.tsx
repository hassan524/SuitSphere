import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import AppContext from "@/context/context";
import { toast } from "sonner";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { loginUser } = useContext(AppContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5200/api/auth/login", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        loginUser(res.data.user);
        toast.success(res.data.message || "Login successful!");
        setTimeout(() => navigate("/"), 1500); // Delay navigation to show toast
      })
      .catch((err) => {
        console.error("Error response:", err.response);
        toast.error(
          err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : "An unexpected error occurred"
        );
      });
  };

  return (
    <div className="flex flex-col sm:my-0 my-12 items-center justify-center gap-[1rem] py-10 px-1 md:px-20 lg:px-32">
      {/* Header */}
      <div className="text-center">
        <h2 className="md:text-[3rem] text-[4rem] uppercase text-center garamond">- Login -</h2>
        <p className="text-gray-500 text-xl mt-2">Access your account below</p>
      </div>
      {/* Form Wrapper */}
      <div className="w-full max-w-lg bg-white p-8">

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:gap-14 gap-10">
          {/* Email Input */}
          <div className="flex flex-col">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
          >
            Login
          </Button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-gray-600 mt-5">
          Don’t have an account?{" "}
          <NavLink
            to="/signup"
            className="font-semibold hover:underline"
          >
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
