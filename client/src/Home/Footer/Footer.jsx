import { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks for subscribing with email: ${email}`);
    setEmail("");
  };

  return (
    <footer className="bg-black text-gray-400">
      <div className="container mx-auto max-w-screen-xl px-4 lg:px-8 py-12">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div>
            <h5 className="text-lg font-semibold text-gray-100 mb-4">Quick Links</h5>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="flex items-center gap-2 hover:text-gray-100">
                  <span className="material-icons">home</span> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center gap-2 hover:text-gray-100">
                  <span className="material-icons">info</span> About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="flex items-center gap-2 hover:text-gray-100">
                  <span className="material-icons">build</span> Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center gap-2 hover:text-gray-100">
                  <span className="material-icons">contact_mail</span> Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="text-lg font-semibold text-gray-100 mb-4">Contact Us</h5>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="material-icons text-indigo-500">location_on</span>
                AT samarthnagar Aurangabad Maharashtra
              </li>
              <li className="flex items-center gap-2">
                <span className="material-icons text-indigo-500">phone</span>
                8767482793
              </li>
              <li className="flex items-center gap-2">
                <span className="material-icons text-indigo-500">email</span>
                ghugegaurav43@gmail.com
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h5 className="text-lg font-semibold text-gray-100 mb-4">Newsletter</h5>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get the latest updates and offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded bg-gray-800 text-gray-300 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Social Media Links */}
          <div>
            <h5 className="text-lg font-semibold text-gray-100 mb-4">Follow Us</h5>
            <div className="flex space-x-4">
              
              
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-500"
                aria-label="Facebook"
              >
                <FaFacebookF size={24} />
               
              </a>
              <a
                href="https://twitter.com/gauravghuge737 "
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-500"
                aria-label="Twitter"
              >
                 <FaTwitter size={24} />
               
              </a>
              <a
                href="https://instagram.com/garry_7038?igshid=OGY3MTU3OGY1MW=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-500"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              
              </a>
              <a
                href="https://www.linkedin.com/in/gaurav-ghuge-530651226/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-500"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
               
              </a>
              <a
                href="https://youtube.com/@gauravghuge848?si=VYV40173wD1Q0eOT"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-500"
                aria-label="YouTube"
              >
                <FaYoutube size={24} />
                
              </a>
              <a
                href="https://github.com/gauravghuge7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-500"
                aria-label="GitHub"
              >
                <FaGithub size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-500">© 2025 Eventify. All rights reserved.</p>
            <div className="mt-4 md:mt-0 space-x-4">
              <Link to="/privacy-policy" className="text-sm hover:text-indigo-500">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-sm hover:text-indigo-500">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-sm hover:text-indigo-500">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
