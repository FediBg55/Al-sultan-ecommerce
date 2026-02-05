import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="hero-section">
            <div className="container hero-container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hero-content"
                >
                    <div className="profile-img-container">
                        <img src="/profile.jpg" alt="Med Ali Ferid" className="profile-img" />
                    </div>

                    <span className="subtitle">Web Development Engineer based in Sousse, Tunisia</span>
                    <h1 className="title">
                        I am <span className="highlight">Med Ali Ferid</span>
                    </h1>
                    <p className="description">
                        Front-End Engineer crafting fast, responsive, and user-focused web experiences.
                        Transforming ideas into seamless digital reality.
                    </p>
                    <div className="hero-buttons">
                        <a href="#projects" className="btn btn-primary">View Work</a>
                        <a href="#contact" className="btn btn-outline">Contact Me</a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
