import React from 'react'
import { useRef, memo } from "react";
import { motion, useScroll } from "framer-motion";

const About = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const TimelineImage = memo(({ item }) => (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative group"
        >
            <div className="absolute inset-0 bg-black rounded-2xl blur-xl group-hover:blur-2xl opacity-20 transition-all duration-300"></div>
            <img
                src={item.image}
                alt={item.title}
                className="rounded-2xl shadow-2xl scale-75 w-full relative z-10"
            />
        </motion.div>
    ));

    const timelineData = [
        {
            year: 2025,
            title: "Expanding Horizons in AI & ML",
            description: "Building on our 2024 foundation, Intelligentsia Club continues to drive AI and ML innovation in 2025. With advanced projects, interactive workshops, and deeper industry collaborations, we empower students to push boundaries and create impactful solutions for the future",
            image: "https://res.cloudinary.com/vishnu2005/image/upload/f_auto,q_auto/xre0vwmleryhwwthlm1p",
        },
        {
            year: 2024,
            title: "Pioneering the Future of AI & ML ",
            description:
                " In 2024, Intelligentsia Club advanced AI and ML learning through innovation, hands-on projects, and collaboration. This year marked a key step in shaping intelligent systems and real-world solutions.",
            image: "https://res.cloudinary.com/vishnu2005/image/upload/f_auto,q_auto/a6j8qn5ggd6yqcjddti7",
        },

    ];

    return (
        <div className="bg-black min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 bg-black"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-5"></div>

            <div ref={containerRef} className="relative max-w-7xl mx-auto px-4 py-20">
                {/* About Us Section */}
                <div className="mb-32">
                    <motion.h2
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-poppins text-center text-white bg-clip-text text-transparent mb-24"
                    >
                        More About Us
                    </motion.h2>

                    {/* About & Vision Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="grid md:grid-cols-2 gap-12 mb-20"
                    >
                        <div className="relative overflow-hidden rounded-3xl">
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                src="https://res.cloudinary.com/ds18h1q0k/image/upload/v1735379758/about.jpg"
                                alt="About Us"
                                className="w-full h-full object-cover rounded-3xl"
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h3 className="text-3xl font-poppins font-bold text-white mb-6">Our Vision</h3>
                            <p className="text-gray-300 leading-relaxed text-lg">
                            Intelligentsia Club envisions a future where students harness the power of AI and ML to drive innovation and solve real-world challenges. We aim to create a collaborative ecosystem that nurtures creativity, critical thinking, and technical excellence. Through hands-on projects, interactive workshops, and knowledge-sharing, we strive to bridge the gap between academic learning and industry applications. Our goal is to empower the next generation of AI enthusiasts to make meaningful contributions to technology and society.
                            </p>
                        </div>
                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="grid md:grid-cols-2 gap-12"
                    >
                        <div className="flex flex-col justify-center">
                            <h3 className="text-3xl font-poppins font-bold text-white mb-6">Our Mission</h3>
                            <p className="text-gray-300 leading-relaxed text-lg">
                            Intelligentsia Club is committed to fostering a dynamic learning environment for AI and ML enthusiasts. Our mission is to empower students through hands-on projects, interactive workshops, and collaborative initiatives that bridge theory and real-world applications. We strive to cultivate innovation, critical thinking, and technical expertise while encouraging ethical AI development. By providing mentorship, networking opportunities, and industry exposure, we aim to equip our members with the skills needed to shape the future of AI and drive impactful change in society.
                            </p>
                        </div>
                        <div className="relative overflow-hidden rounded-3xl">
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                src="https://res.cloudinary.com/ds18h1q0k/image/upload/v1735379758/mission.jpg"
                                alt="Our Mission"
                                className="w-full h-full object-cover rounded-3xl"
                            />
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="grid md:grid-cols-2 gap-12 mb-20"
                    >
                        <div className="relative overflow-hidden rounded-3xl">
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                src="https://res.cloudinary.com/ds18h1q0k/image/upload/v1735379758/about.jpg"
                                alt="About Us"
                                className="w-full h-full object-cover rounded-3xl"
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h3 className="text-3xl font-poppins font-bold text-white mb-6">What we do</h3>
                            <p className="text-gray-300 leading-relaxed text-lg">
                            <ol>
                              <li>• Hands-on projects: Members work on real-world AI/ML projects, gaining practical experience and building their skills.</li>
                              <li>• Workshops: We conduct workshops on AI/ML topics, covering both theoretical concepts and practical applications.</li>
                              <li>• Collaborative initiatives: We collaborate with other clubs and organizations to tackle complex problems and develop innovative solutions.</li>
                              <li>• Mentorship: We provide mentorship to help members grow their skills and knowledge.</li>
                              <li>• Networking: We connect members with industry professionals and potential employers.</li>
                            </ol>
                            </p>
                        </div>
                    </motion.div>

                </div>

               
                <motion.h2
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-poppins text-center text-white bg-clip-text text-transparent mb-24"
                >
                    Our Legacy
                </motion.h2>

                <div className="relative">
                    <motion.div
                        className="absolute left-[50%] top-0 bottom-0 w-[2px]"
                        style={{
                            background: "linear-gradient(180deg, rgba(192,192,192,0.4) 0%, rgba(192,192,192,0.1) 100%)",
                            scaleY: scrollYProgress,
                            transformOrigin: "top"
                        }}
                    />

                    {timelineData.map((item, index) => (
                        <motion.div
                            key={item.year}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                            className="relative mb-32"
                        >
                            {/* Year marker */}
                            <div className="absolute scale-110 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg ">
                                    <div className="size-12 rounded-full bg-gray-400 flex items-center justify-center">
                                        <span className="text-white text-sm font-bold">{item.year}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${index % 2 === 0 ? 'md:grid-flow-dense' : ''}`}>
                                <div className={`space-y-6 ${index % 2 === 0 ? 'md:col-start-2' : ''}`}>
                                    <TimelineImage item={item} />
                                </div>

                                <div className={`flex items-center ${index % 2 === 0 ? 'md:col-start-1' : ''}`}>
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className="bg-black backdrop-blur-sm p-8 rounded-3xl border transition-all duration-300"
                                    >
                                        <h3 className="text-2xl md:text-3xl font-poppins font-bold mb-4 bg-gray-400 bg-clip-text text-transparent">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                
            </div>
        </div>
    );
};

export default About;