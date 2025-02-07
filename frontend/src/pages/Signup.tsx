import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5200/api/auth/signup", formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => console.log("Success:", res.data))
      .catch((err) => {
        if (err.response) {
          console.log("Error:", err.response.data.message); 
        } else {
          console.log("Error:", err.message);
        }
      });
  };

  return (
    <form
      className="flex flex-col gap-10 lg:w-full sm:w-[70vw] w-[90vw] text-center items-center justify-center"
      onSubmit={handleSubmit}
    >
      {/* Heading */}
      <h2 className="lg:text-[4rem] text-[3rem] garamond leading-[3rem] font-bold text-gray-800">
        Welcome To Sign Up
      </h2>

      {/* Email & Password Inputs */}
      <div className="flex w-full flex-col justify-center items-center gap-12">
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
          autoComplete="off"
          className="py-3 lg:w-[30rem] w-full border-b border-gray-400 bg-transparent outline-none focus:border-blue-600 transition"
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="off"
          className="py-3 lg:w-[30rem] w-full border-b border-gray-400 bg-transparent outline-none focus:border-blue-600 transition"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="off"
          className="lg:w-[30rem] w-full py-3 border-b border-gray-400 bg-transparent outline-none focus:border-blue-600 transition"
        />
      </div>

      {/* Submit Button */}
      <Button type="submit" className="lg:w-[30rem] w-full py-4 text-lg transition">
        Sign Up
      </Button>

      <p className="text-gray-600">
        Already have an account?{" "}
        <NavLink to="/login" className="font-semibold ms-2 hover:underline">
          Login
        </NavLink>
      </p>
    </form>
  );
};

export default Signup;
