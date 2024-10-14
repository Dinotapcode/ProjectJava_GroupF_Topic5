import React from "react";
import "./style.scss";
import {
  FaShieldAlt,
  FaPhoneAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <nav className="footer-navbar">
        <ul className="footer-navbar__list">
          <li className="footer-navbar__item">Copyright 2024 Feng Shui KOI</li>
          <li className="footer-navbar__item">
            <a
              href="https://example.com/privacy-policy"
              className="footer-navbar__link"
            >
              <FaShieldAlt />
              Privacy Policy
            </a>
          </li>
          <li className="footer-navbar__item">
            <a href="callto:19008080" className="footer-navbar__link">
              <FaPhoneAlt />
              Contact us
            </a>
          </li>
        </ul>
        <ul className="footer-navbar__social-list">
          <li className="footer-navbar__social-item icon-facebook">
            <span className="footer-navbar__social-tooltip">Facebook</span>
            <a
              href="https://facebook.com"
              className="footer-navbar__social-link"
            >
              <FaFacebookF className="link-icon" />
            </a>
          </li>
          <li className="footer-navbar__social-item icon-twitter">
            <span className="footer-navbar__social-tooltip">Twitter</span>
            <a
              href="https://twitter.com"
              className="footer-navbar__social-link"
            >
              <FaTwitter className="link-icon" />
            </a>
          </li>
          <li className="footer-navbar__social-item icon-instagram">
            <span className="footer-navbar__social-tooltip">Instagram</span>
            <a
              href="https://instagram.com"
              className="footer-navbar__social-link"
            >
              <FaInstagram className="link-icon" />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
