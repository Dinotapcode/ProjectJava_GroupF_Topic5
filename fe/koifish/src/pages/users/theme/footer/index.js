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
            <a href="" className="footer-navbar__link ">
              <FaShieldAlt /> Privacy Policy
            </a>
          </li>
          <li className="footer-navbar__item">
            <a href="" className="footer-navbar__link">
              <FaPhoneAlt /> Contact us
            </a>
          </li>
        </ul>
        <ul className="footer-navbar__social-list">
          <li className="footer-navbar__social-item icon-facebook">
            <span className="footer-navbar__social-tooltip">Facebook</span>
            <a href="" className="footer-navbar__link">
              <FaFacebookF className="footer-navbar__icon" />
            </a>
          </li>
          <li className="footer-navbar__social-item icon-twitter">
            <span className="footer-navbar__social-tooltip">Twitter</span>
            <a href="" className="footer-navbar__link">
              <FaTwitter className="footer-navbar__icon" />
            </a>
          </li>
          <li className="footer-navbar__social-item icon-instagram">
            <span className="footer-navbar__social-tooltip">Instagram</span>
            <a href="" className="footer-navbar__link">
              <FaInstagram className="footer-navbar__icon" />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
