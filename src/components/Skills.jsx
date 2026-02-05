import React from 'react';
import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaVuejs, FaSass, FaGitAlt, FaFigma } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiWebpack, SiVite } from 'react-icons/si';

const Skills = () => {
    const skillCategories = [
        {
            title: 'Languages',
            skills: [
                { name: 'HTML5', icon: <FaHtml5 color="#E34F26" /> },
                { name: 'CSS3', icon: <FaCss3Alt color="#1572B6" /> },
                { name: 'JavaScript', icon: <FaJs color="#F7DF1E" /> },
            ]
        },
        {
            title: 'Frameworks',
            skills: [
                { name: 'React', icon: <FaReact color="#61DAFB" /> },
                { name: 'Next.js', icon: <SiNextdotjs color="#000000" /> },
                { name: 'Vue.js', icon: <FaVuejs color="#4FC08D" /> },
            ]
        },
        {
            title: 'Styling',
            skills: [
                { name: 'Tailwind CSS', icon: <SiTailwindcss color="#06B6D4" /> },
                { name: 'Sass', icon: <FaSass color="#CC6699" /> },
                { name: 'CSS Modules', icon: <FaCss3Alt color="#2965f1" /> }, // Reusing CSS icon or generic
            ]
        },
        {
            title: 'Tools',
            skills: [
                { name: 'Git', icon: <FaGitAlt color="#F05032" /> },
                { name: 'Figma', icon: <FaFigma color="#F24E1E" /> },
                { name: 'Vite', icon: <SiVite color="#646CFF" /> },
                { name: 'Webpack', icon: <SiWebpack color="#8DD6F9" /> },
            ]
        }
    ];

    return (
        <section id="skills" className="section skills-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">Technical Skills</h2>
                    <div className="skills-grid">
                        {skillCategories.map((category, idx) => (
                            <motion.div
                                key={idx}
                                className="skill-card"
                                whileHover={{ y: -5 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <h3 className="skill-category-title">{category.title}</h3>
                                <ul className="skill-list">
                                    {category.skills.map((skill, index) => (
                                        <li key={index} className="skill-item">
                                            <span className="skill-icon">{skill.icon}</span>
                                            <span className="skill-name">{skill.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
