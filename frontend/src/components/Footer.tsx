import { useState } from "react";

const Footer = () => {
  const [formData, setFormData] = useState({ email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return alert("Please fill in all fields!");
    alert("Inquiry sent successfully!"); // Replace with actual backend call
    setFormData({ email: "", message: "" });
  };

  return (
    <footer className="bg-slate-50 mt-[5rem] text-gray-800 py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-bold">SuitsSphere</h2>
          <p className="mt-2 text-sm">
            Your premium destination for elegant, stylish clothing that complements your unique personality.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li><a href="/shop" className="hover:underline">Shop</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Contact Form */}
        <div>
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <p className="text-sm mt-2">For inquiries, email us at <span className="font-semibold">hrehan752@gmail.com</span></p>
          <form onSubmit={handleSubmit} className="mt-4 space-y-2">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 h-20"
            />
            <button type="submit" className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition">
              Send Inquiry
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-600">© {new Date().getFullYear()} SuitsSphere. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
