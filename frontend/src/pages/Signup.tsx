import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

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
        toast.success("Account created successfully! Redirecting to login...");
        navigate("/login"); // Redirect to login after signup
      })
      .catch((err) => {
        const errorMessage = err.response ? err.response.data.message : "An unexpected error occurred";
        setError(errorMessage);
        toast.error(errorMessage);
      });
  };

  return (
    <div className="flex flex-col sm:my-0 my-12 items-center justify-center gap-[1rem] py-10 px-1 md:px-20 lg:px-32">
      <div className="text-center px-1">
        <h2 className="md:text-[3rem] text-[3.5rem] uppercase text-center garamond">- Sign Up -</h2>
        <p className="text-gray-500 text-xl mt-2">Create your account below</p>
      </div>
      <div className="w-full sm:max-w-xl max-w-2xl bg-white p-6">
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-10">
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

          {error && <p className="text-red-500 text-center">{error}</p>}

          <Button
            type="submit"
            className="w-full py-6 text-xl"
          >
            Sign Up
          </Button>
        </form>

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
