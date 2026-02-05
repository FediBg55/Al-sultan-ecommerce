import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <p>&copy; {new Date().getFullYear()} Med Ali Ferid. All rights reserved.</p>
                <div className="footer-socials">
                    <a href="#" aria-label="GitHub"><FaGithub /></a>
                    <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
                    <a href="#" aria-label="Twitter"><FaTwitter /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
