import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";

const Footer = () => {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const location = useLocation();

  // Routes where the footer should not be displayed
  const noFooterRoutes = ["/orders", "/cart", "/place-order", "/profile"];

  // Check if the current route matches any route in the list
  const shouldHideFooter = noFooterRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  // If the current route is in the list, do not render the footer
  if (shouldHideFooter) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) {
      alert("Please fill in all fields!");
      return;
    }
    alert("Inquiry sent successfully!"); // Replace with actual backend call
    setFormData({ email: "", message: "" });
  };

  return (
    <footer className="bg-slate-50 mt-[5rem] text-gray-800 pt-10 pb-5 md:px-10 px-5">
      <div className="flex md:flex-rorw flex-col gap-20 justify-between">
        {/* Brand Info */}
        <div className="">
          <h2 className="text-xl font-bold">SuitsSphere</h2>
          <p className="mt-2 text-sm">
            Your premium destination for elegant, stylish clothing that complements your unique personality.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-5">
          <h3 className="text-xl font-semibold">Social Media</h3>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/hassan524"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 flex items-center justify-center border border-slate-500 rounded-full hover:bg-slate-500 hover:text-white transition"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/hassan-rehan-075849283/"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 flex items-center justify-center border border-slate-500 rounded-full hover:bg-blue-500 hover:text-white transition"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a
              href="https://www.instagram.com/hassan_mughal73"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 flex items-center justify-center border border-slate-500 rounded-full hover:bg-pink-500 hover:text-white transition"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="flex flex-col gap-5">
          <h3 className="text-xl font-semibold">Contact Us</h3>
          <p className="text-sm">
            For inquiries, email us at hrehan752@gmail.com
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 h-20"
            />
            <Button
              type="submit"
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
            >
              Send Inquiry
            </Button>
          </form>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} SuitsSphere. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
