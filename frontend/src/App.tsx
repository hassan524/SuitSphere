import { Routes, Route } from "react-router-dom";
import { useEffect, useContext } from "react";
import axios from "axios";
import AppContext from "./context/context";

import MainLayout from "./layouts/MainLayout";
import LoginLayout from "./layouts/LoginLayout";

import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

const App = () => {
  const { loginUser, SetCarts } = useContext(AppContext);

  useEffect(() => {
    axios
      .get("http://localhost:5200/api/auth/authcheck", { withCredentials: true })
      .then((res) => {
        loginUser(res.data.user);

        return axios.get("http://localhost:5200/api/cart/getProduct", {
          withCredentials: true,
        });
      })
      .then((res) => {
        SetCarts(res.data.products)
      })
      .catch((err) => {
        console.error("Error:", err.response?.data || err.message);
      });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/mens" element={<Home />} />
        <Route path="/womens" element={<Home />} />
        <Route path=":Gender/Collection/:Type" element={<Collection />} />
        <Route path=":Gender/:Category/:id" element={<Product />} />
        <Route path="/profile" element={<Profile />} />
        <Route element={<LoginLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
