import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { AppProvider } from './context/context';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Product from './pages/Product';
import LoginLayout from './layouts/LoginLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import axios from "axios";
import { useEffect } from 'react';
import { useContext } from 'react';
import AppContext from './context/context';
import Profile from './pages/Profile';

const App = () => {
  const { loginUser } = useContext(AppContext); 


  useEffect(() => {
    axios.get("http://localhost:5200/api/auth/authcheck", { withCredentials: true })
      .then(res => {
        loginUser(res.data.user);  
      })
      .catch(err => console.error("AuthCheck Error:", err.response?.data || err.message));
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

// Now wrap your App component with AppProvider at a higher level (index.tsx or App.tsx entry point)
export default App;
