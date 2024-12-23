"use client";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section className="z-30 relative min-h-screen bg-black overflow-hidden py-20" id="contact">
      {/* Gradient Balls */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #00FF00 0%, rgba(0,255,0,0) 70%)",
          right: "10%",
          top: "20%",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl font-bold mb-4 font-unbounded">
            <span className="text-[#00FF00]">Get in</span> Touch
          </h2>
          <div className="w-24 h-1 bg-[#00FF00] mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <label className="block text-gray-300 mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-black/40 border border-[#00FF00]/20 rounded-lg focus:outline-none focus:border-[#00FF00] text-white"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-black/40 border border-[#00FF00]/20 rounded-lg focus:outline-none focus:border-[#00FF00] text-white"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Message</label>
              <textarea
                className="w-full px-4 py-3 bg-black/40 border border-[#00FF00]/20 rounded-lg focus:outline-none focus:border-[#00FF00] text-white h-32"
                placeholder="Your message..."
              ></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-[#00FF00] text-black font-semibold rounded-lg hover:bg-[#00FF00]/90 transition-colors"
            >
              Send Message
            </motion.button>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-[#00FF00] mb-4">Contact Information</h3>
              <div className="space-y-4">
                {[
                  { icon: "📧", label: "Email", value: "contact@example.com" },
                  { icon: "📱", label: "Phone", value: "+1 (234) 567-8900" },
                  { icon: "📍", label: "Location", value: "New York, NY" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="text-gray-400">{item.label}</p>
                      <p className="text-white">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#00FF00] mb-4">Follow Me</h3>
              <div className="flex gap-4">
                {["GitHub", "LinkedIn", "Twitter", "Instagram"].map((platform, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 bg-black/40 border border-[#00FF00]/20 rounded-full flex items-center justify-center text-white hover:bg-[#00FF00]/10 transition-colors"
                  >
                    {platform[0]}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
