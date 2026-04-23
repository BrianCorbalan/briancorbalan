import React from "react";
import "./Contact.css";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import Footer from './Footer';

export default function Contact() {
  return (
    <>
      <Navbar forceVisible={true} smallLogo={true} />

      
        <section className="contact-page">
          <div className="contact-container">
            <h1>Let's work together</h1>

            <p>
              Tell me about your project and I’ll get back to you as soon as possible.
            </p>
            <motion.div
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
            >
            <form className="contact-form">
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Your name" />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="your@email.com" />
              </div>

              <div className="form-group">
                <label>Project Type</label>
                <select>
                  <option>Branding</option>
                  <option>Motion</option>
                  <option>Video Editing</option>
                  <option>Web Design</option>
                </select>
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  placeholder="Tell me about your project..."
                  rows="5"
                />
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
            </motion.div>
            <div className="contact-alt">
              <p>Prefer a quick chat?</p>
              <a
                href="https://wa.me/1168532481"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>
        <div id="footer" style={{  padding: "0% 10%", background: "#000",}}>
                <Footer />
        </div>
      
    </>
  );
}