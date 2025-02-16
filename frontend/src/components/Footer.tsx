import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";

const Footer = () => {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const location = useLocation();

  const noFooterRoutes = ["/orders", "/cart", "/place-order", "/profile", "/login", "/signup"];

  const shouldHideFooter = noFooterRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  if (shouldHideFooter) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message) {
      alert("Please fill in all fields!");
      return;
    }
    alert("Inquiry sent successfully!");
    setFormData({ email: "", message: "" });
  };

  return (
    <footer className="bg-gradient-to-b from-white to-gray-200 shadow-lg mt-[5rem] text-gray-800 py-10 px-5 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">SuitsSphere</h2>
          <p className="text-sm text-gray-600">
            Your premium destination for elegant, stylish clothing that complements your unique personality.
          </p>
        </div>

        <div className="space-y-4 ">
          <h3 className="text-xl font-semibold">Follow Us</h3>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/hassan524"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 flex items-center justify-center border border-gray-400 rounded-full hover:bg-gray-800 hover:text-white transition"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/hassan-rehan-075849283/"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 flex items-center justify-center border border-gray-400 rounded-full hover:bg-blue-600 hover:text-white transition"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a
              href="https://www.instagram.com/hassan_mughal73"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 flex items-center justify-center border border-gray-400 rounded-full hover:bg-pink-500 hover:text-white transition"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Contact Us</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-transparent border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-transparent border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none h-24"
            />
            <Button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition"
            >
              Send Inquiry
            </Button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} SuitsSphere. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
