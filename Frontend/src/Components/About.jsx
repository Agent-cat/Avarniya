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
            year: 2024,
            title: "A Global Showcase of Talent and Culture",
            description: "In 2024, the festival saw an astounding 20,000 students from all corners of the world, including a growing number of international participants, making it one of the largest and most inclusive cultural events in India. The sheer scale and global participation reflect the fest's expanding reach and its significance as a major platform for young talent.",
            image: "https://res.cloudinary.com/ds18h1q0k/image/upload/v1735379758/2024i_b6r9hy.jpg",
        },
        {
            year: 2023,
            title: "A Global Celebration of Talent and Culture",
            description:
                "In 2023, Surabhi reached new heights with over 15,000 students participating, including a significant number of international students from various countries. This made Surabhi not only one of the largest cultural fests in India but also a truly global celebration of youth, talent, and diversity.",
            image: "https://res.cloudinary.com/ds18h1q0k/image/upload/v1735379758/2023i_dp6r0u.jpg",
        },
        {
            year: 2022,
            title: "A National Celebration of Talent and Culture",
            description:
                "In 2022, Surabhi witnessed a remarkable participation of over 14,000 students, making it one of the largest and most anticipated cultural fests in the country.",
            image: "https://res.cloudinary.com/ds18h1q0k/image/upload/v1735379758/2022i_ihzcmw.jpg",
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
                                To establish Surabhi as the premier global cultural festival that transcends boundaries, challenges artistic limits, and creates lasting impact. We envision a future where our festival serves as a catalyst for cultural exchange, artistic innovation, and the development of a worldwide community united by creativity and passion.
                            </p>
                        </div>
                    </motion.div>

                    {/* Mission Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="grid md:grid-cols-2 gap-12"
                    >
                        <div className="flex flex-col justify-center">
                            <h3 className="text-3xl font-poppins font-bold text-white mb-6">Our Mission</h3>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                To create a vibrant platform that celebrates cultural diversity, nurtures artistic talent, and fosters meaningful connections among students across the globe. Through Surabhi, we aim to provide an immersive experience that transforms passionate individuals into cultural ambassadors and future leaders in the arts.
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
                </div>

                {/* Timeline Section */}
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

                {/* Our Clubs Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mt-32"
                >
                    <h2 className="text-5xl md:text-7xl font-poppins text-center text-white bg-clip-text text-transparent mb-16">
                        Our Clubs
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-black backdrop-blur-sm p-6 rounded-3xl border transition-all duration-300"
                        >
                            <img
                                src="https://res.cloudinary.com/ds18h1q0k/image/upload/v1735379758/club1.jpg"
                                alt="Dance Club"
                                className="w-full h-48 object-cover rounded-2xl mb-4"
                            />
                            <h3 className="text-xl font-poppins font-bold text-gray-400 mb-2">Dance Club</h3>
                            <p className="text-gray-300 mb-4">Experience the rhythm and grace of various dance forms.</p>
                            <button className="bg-gray-600 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition-all">
                                View us
                            </button>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-black backdrop-blur-sm p-6 rounded-3xl border transition-all duration-300"
                        >
                            <img
                                src="https://res.cloudinary.com/ds18h1q0k/image/upload/v1735379758/club2.jpg"
                                alt="Music Club"
                                className="w-full h-48 object-cover rounded-2xl mb-4"
                            />
                            <h3 className="text-xl font-poppins font-bold text-gray-400 mb-2">Music Club</h3>
                            <p className="text-gray-300 mb-4">Discover your musical talents with our diverse music programs.</p>
                            <button className="bg-gray-600 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition-all">
                                View us
                            </button>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-black backdrop-blur-sm p-6 rounded-3xl border transition-all duration-300"
                        >
                            <img
                                src="https://res.cloudinary.com/ds18h1q0k/image/upload/v1735379758/club3.jpg"
                                alt="Drama Club"
                                className="w-full h-48 object-cover rounded-2xl mb-4"
                            />
                            <h3 className="text-xl font-poppins font-bold text-gray-400 mb-2">Drama Club</h3>
                            <p className="text-gray-300 mb-4">Express yourself through the art of theater and performance.</p>
                            <button className="bg-gray-600 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition-all">
                                View us
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;