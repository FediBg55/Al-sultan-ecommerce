import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    const education = [
        {
            date: '2023 - 2026',
            degree: 'Engineering in Software Engineering (Génie Logiciel)',
            institution: 'EPI Sousse',
            description: 'Advanced studies in software architecture, full-stack development, and system design.'
        },
        {
            date: '2020 - 2023',
            degree: 'Preparatory Cycle (Cycle Préparatoire)',
            institution: 'Monastir',
            description: 'Intensive foundation in Mathematics, Physics, and Computer Science fundamentals.'
        }
    ];

    return (
        <section id="about" className="section about-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">About Me</h2>

                    <div className="about-grid">
                        <div className="about-text">
                            <p>
                                Hello! I'm <strong>Med Ali Ferid</strong>, a 23-year-old Web Development Engineer based in <strong>Sousse, Tunisia</strong>.
                            </p>
                            <p>
                                I am passionate about building modern, responsive web applications that solve real-world problems. With a strong academic background in software engineering and hands-on experience in modern frontend technologies, I strive to create intuitive and performant user interfaces.
                            </p>
                            <p>
                                Whether I'm debugging complex code or exploring the latest web trends, I bring energy and precision to every project.
                            </p>
                        </div>

                        <div className="education-timeline">
                            <h3>Education</h3>
                            <div className="timeline">
                                {education.map((item, index) => (
                                    <div key={index} className="timeline-item">
                                        <span className="timeline-date">{item.date}</span>
                                        <h4 className="timeline-degree">{item.degree}</h4>
                                        <span className="timeline-inst">{item.institution}</span>
                                        <p className="timeline-desc">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
