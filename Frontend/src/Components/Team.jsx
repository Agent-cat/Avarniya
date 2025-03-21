import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Team = () => {
  const [hoveredMember, setHoveredMember] = useState(null);

  const FacultyIncharge = [
    {
      name: "Dr.B.Tripathi Reddy",
      role: "HOD(Dept of AI&DS)",
      image: "https://res.cloudinary.com/vishnu2005/image/upload/f_auto,q_auto/o9i8fnxi0kwm8bosj9rq"
    },
    {
      name: "Ms.P.Swetha", 
      role: "Club Incharge",
      image: "https://res.cloudinary.com/vishnu2005/image/upload/f_auto,q_auto/jbgofwbzetumhfdfopnp"
    },
    {
      name: "Mr.V.Joe Nithin",
      role: "Club Advisor",
      image: "https://res.cloudinary.com/vishnu2005/image/upload/f_auto,q_auto/mj9ituycvqfaij7yop67"
    },
    
  ]

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-7xl font-bold text-center text-white mb-20"
      >
        Our Team
        
      </motion.h2>

      <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-white mb-20">Faculty Coordinators</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          
          {FacultyIncharge.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative border-b-2 p-3 border-gray-500"
            >
              <motion.div
                onHoverStart={() => setHoveredMember(member)}
                onHoverEnd={() => setHoveredMember(null)}
                className="cursor-pointer flex justify-between gap-52"
              >
                <h3 className="text-2xl font-poppins text-white hover:text-gray-400 transition-colors">
                  {member.name}
                </h3>
                <p className="text-gray-500 text-xl mt-1">{member.role}</p>
              </motion.div>

              <AnimatePresence>
                {hoveredMember?.name === member.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                    animate={{ opacity: 1, y: -120, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="absolute left-1/2 transform -translate-x-1/2 z-10"
                  >
                   
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="w-60 h-60 object-cover  shadow-2xl border-2 border-gray-500"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              
            </motion.div>
          ))}
          
        </div>
        <h1 className="text-2xl mt-20 md:text-3xl font-bold text-center text-white mb-20">Team Members</h1>
        <p className="text-center text-xl text-white">Coming Soon...</p>
      </div>
    </div>
  )
}

export default Team