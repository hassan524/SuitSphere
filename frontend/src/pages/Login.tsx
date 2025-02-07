import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import AppContext from "@/context/context";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()
  const [error, setError] = useState("");  
  const { loginUser } = useContext(AppContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5200/api/auth/login', formData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
      .then((res) => {
        loginUser(res.data.user);
        navigate('/')
      })
      .catch((err) => {
        console.log(err)
        setError(err.response ? err.response.data.message : "An unexpected error occurred");
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-12 lg:w-full sm:w-[70vw] w-[90vw] text-center items-center justify-center"
    >
      {/* Heading */}
      <h2 className="lg:text-[4rem] text-[3rem] garamond leading-[3rem] font-bold text-gray-800">
        Welcome To Login
      </h2>

      {/* Email & Password Inputs */}
      <div className="flex w-full flex-col justify-center items-center gap-12">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className="py-3 lg:w-[30rem] w-full border-b border-gray-400 bg-transparent outline-none focus:border-blue-600 transition"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          className="lg:w-[30rem] w-full py-3 border-b border-gray-400 bg-transparent outline-none focus:border-blue-600 transition"
        />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Submit Button */}
      <Button type="submit" className="lg:w-[30rem] w-full py-4 text-lg transition">
        Login
      </Button>

      <p className="text-gray-600">
        Don't have an account?{" "}
        <NavLink to="/signup" className="font-semibold ms-2 hover:underline">
          SignUp
        </NavLink>
      </p>
    </form>
  );
};

export default Login;
