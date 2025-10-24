import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import contactLogo from "../assets/contactlogo.webp";

const Contact = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    if (!form.firstName.trim()) return "First name is required";
    if (!form.lastName.trim()) return "Last name is required";
    if (!form.email.trim()) return "Email is required";
    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(form.email)) return "Enter a valid email";
    if (!form.phone.trim()) return "Phone number is required";
    if (!form.message.trim()) return "Message cannot be empty";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) {
      setStatus({ loading: false, success: null, error: err });
      return;
    }

    setStatus({ loading: true, success: null, error: null });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Network response was not ok");
      setStatus({ loading: false, success: "Message sent successfully!", error: null });
      setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    } catch (error) {
      setStatus({
        loading: false,
        success: null,
        error: "Failed to send message. Try again later.",
      });
    }
  }

  return (
    <div className="min-h-screen bg-[#fdfbe9] flex items-center justify-center px-4 py-16 text-gray-900">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Left Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="p-10 bg-white rounded-3xl shadow-2xl"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-green-700">
            Get in Touch
          </h1>

          <h2 className="text-lg md:text-xl font-medium mb-4 text-gray-700">
            Let’s Chat, Contact with Us
          </h2>

          <p className="text-gray-600 mb-6 text-sm md:text-base">
            Have any questions or feedback? We’re here to help. Send us a message, and we’ll get back to you within 24 hours.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First name"
                className="w-full border border-green-300 rounded-lg p-3 bg-white text-gray-900 focus:ring-2 focus:ring-green-500 transition"
                required
              />
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last name"
                className="w-full border border-green-300 rounded-lg p-3 bg-white text-gray-900 focus:ring-2 focus:ring-green-500 transition"
                required
              />
            </div>

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="yourname@company.com"
              className="w-full border border-green-300 rounded-lg p-3 bg-white text-gray-900 focus:ring-2 focus:ring-green-500 transition"
              required
            />

            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+1 (555) 444-0000"
              className="w-full border border-green-300 rounded-lg p-3 bg-white text-gray-900 focus:ring-2 focus:ring-green-500 transition"
              required
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Type your message"
              rows="4"
              className="w-full border border-green-300 rounded-lg p-3 bg-white text-gray-900 focus:ring-2 focus:ring-green-500 transition"
              required
            />

            <button
              type="submit"
              disabled={status.loading}
              className="w-full bg-gradient-to-r from-green-600 to-lime-400 text-white py-3 rounded-lg font-bold hover:opacity-90 transition disabled:opacity-60"
            >
              {status.loading ? "Sending..." : "Send Message"}
            </button>

            {status.success && <p className="text-green-700 text-sm">{status.success}</p>}
            {status.error && <p className="text-red-500 text-sm">{status.error}</p>}
          </form>
        </motion.div>

        {/* Right Info Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white flex flex-col items-center justify-center p-10 rounded-3xl shadow-2xl space-y-8"
        >
          <div className="w-56 h-56 rounded-2xl overflow-hidden shadow-lg border-2 border-green-500">
            <img
              src={contactLogo}
              alt="Contact Person"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="w-full space-y-5">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 p-5 bg-green-50 rounded-xl shadow">
              <FaEnvelope className="text-green-600 text-xl" />
              <div>
                <p className="font-semibold text-gray-900">Email</p>
                <p className="text-sm text-gray-700">techsupport@yourmail.com</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 p-5 bg-green-50 rounded-xl shadow">
              <FaPhoneAlt className="text-green-600 text-xl" />
              <div>
                <p className="font-semibold text-gray-900">Phone</p>
                <p className="text-sm text-gray-700">(+005) 432 986 450</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 p-5 bg-green-50 rounded-xl shadow">
              <FaMapMarkerAlt className="text-green-600 text-xl" />
              <div>
                <p className="font-semibold text-gray-900">Address</p>
                <p className="text-sm text-gray-700">230 Norman Street, New York, HBR 1A1</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
