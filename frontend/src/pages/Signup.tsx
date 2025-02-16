import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5200/api/auth/signup", formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log("Success:", res.data);
        navigate("/login"); // Redirect to login after signup
      })
      .catch((err) => {
        setError(
          err.response
            ? err.response.data.message
            : "An unexpected error occurred"
        );
      });
  };

  return (
    <div className="flex flex-col sm:my-0 my-12 items-center justify-center gap-[1rem] py-10 px-1 md:px-20 lg:px-32">
      {/* Header */}
      <div className="text-center">
        <h2 className="md:text-[3rem] text-[4rem] uppercase text-center garamond">- Sign Up -</h2>
        <p className="text-gray-500 text-xl mt-2">Create your account below</p>
      </div>
      {/* Form Wrapper */}
      <div className="w-full max-w-xl bg-white p-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-14">
          {/* Username Input */}
          <div className="flex flex-col">
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

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

          {/* Error Message */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-6 text-xl"
          >
            Sign Up
          </Button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-5">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="font-semibold hover:underline"
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
