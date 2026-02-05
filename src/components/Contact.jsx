import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaFileDownload } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your message! (This is a demo form)');
        setFormData({ name: '', email: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="contact" className="section contact-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-title">Get In Touch</h2>

                    <div className="contact-wrapper">
                        <div className="contact-info">
                            <h3>Let's talk about your project</h3>
                            <p>
                                I'm currently available for freelance projects and full-time opportunities.
                                If you have a question or just want to say hi, I'll try my best to get back to you!
                            </p>

                            <div className="contact-links">
                                <a href="mailto:email@example.com" className="contact-link-item">
                                    <FaEnvelope className="contact-icon" />
                                    <span>email@example.com</span>
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="contact-link-item">
                                    <FaLinkedin className="contact-icon" />
                                    <span>LinkedIn</span>
                                </a>
                                <a href="https://github.com" target="_blank" rel="noreferrer" className="contact-link-item">
                                    <FaGithub className="contact-icon" />
                                    <span>GitHub</span>
                                </a>
                            </div>

                            <a href="/resume.pdf" className="btn btn-outline cv-btn" download>
                                <FaFileDownload /> Download CV
                            </a>
                        </div>

                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="Hello, I'd like to discuss..."
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary submit-btn">Send Message</button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
