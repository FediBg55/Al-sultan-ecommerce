import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
    const projects = [
        {
            title: 'Al-Sultan E-Commerce',
            description: 'A modern e-commerce platform for Al-Sultan brand. Built with React and modern web technologies to provide a seamless shopping experience with product catalog, shopping cart, and checkout features.',
            tech: ['React', 'JavaScript', 'CSS', 'E-Commerce'],
            image: '/alsultan-logo.png',
            liveLink: '#',
            repoLink: 'https://github.com/FediBg55/Al-sultan-ecommerce.git'
        },
        {
            title: 'Task Management App',
            description: 'Collaborative task manager with real-time sync. Implemented drag-and-drop functionality and optimizing render performance for large lists.',
            tech: ['Next.js', 'Firebase', 'dnd-kit'],
            image: 'https://placehold.co/600x400/2563eb/ffffff?text=Task+Manager',
            liveLink: '#',
            repoLink: '#'
        },
        {
            title: 'Weather Visualizer',
            description: 'Interactive weather forecast app. Integrated OpenWeatherMap API and used Canvas API to render dynamic weather particle effects.',
            tech: ['Vue.js', 'Canvas API', 'Sass'],
            image: 'https://placehold.co/600x400/0891b2/ffffff?text=Weather+App',
            liveLink: '#',
            repoLink: '#'
        }
    ];

    return (
        <section id="projects" className="section projects-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-title">Featured Projects</h2>
                    <div className="projects-grid">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                className="project-card"
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="project-image">
                                    <img src={project.image} alt={project.title} />
                                    <div className="project-overlay">
                                        <div className="project-links">
                                            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="icon-btn">
                                                <FaExternalLinkAlt />
                                            </a>
                                            <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="icon-btn">
                                                <FaGithub />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="project-content">
                                    <h3 className="project-title">{project.title}</h3>
                                    <p className="project-desc">{project.description}</p>
                                    <div className="project-tech">
                                        {project.tech.map((t, i) => (
                                            <span key={i} className="tech-tag">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
