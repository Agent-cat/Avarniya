import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Team = () => {
  const [hoveredMember, setHoveredMember] = useState(null);

    const FacultyIncharge = [
      {
        name: "Dr. V S V Prabhakar (HOD)",
        role: "HOD(Dept of AI&DS)",
        image: "https://res.cloudinary.com/dqcogelsh/image/upload/v1754405994/WhatsApp_Image_2025-08-05_at_19.57.24_113a9172_zelamj.jpg"
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
    const TeamMembers = [
      {
        name: "Kaku Manish Kumar",
        role: "President",
        image: "https://res.cloudinary.com/dqcogelsh/image/upload/v1754403511/manish1_-_Manish_Kaku_yvxswf.jpg"
      },
      {
        name: "Challa Rishi Kumar Reddy",
        role: "Vice President",
        image: "https://res.cloudinary.com/dqcogelsh/image/upload/v1754403895/IMG_20250709_072725_-_RishiKumar_Reddy_Challa_ulvovo.jpg"
      },
      {
        name: "Murthy Sai Krishna",
        role: "Director of Technology",
        image: "https://res.cloudinary.com/dqcogelsh/image/upload/v1754404035/1000072616_-_Sai_Krishna_ybf0he.jpg"
      },
      {
        name: "Karnati Powshitha",
        role: "Director of Designing",
        image: "https://res.cloudinary.com/dqcogelsh/image/upload/v1754406232/gff_1_-_powshitha_k_ecqsip.jpg"
      },
      {
        name: "Lam Sahasra",
        role: "Director of Planning",
        image: "https://res.cloudinary.com/dqcogelsh/image/upload/v1754404231/P_-_SAHASRA_LAM_gtzccx.jpg"
      },
      {
        name: "G V Sushanth ",
        role: "Director of External Relations",
        image: "https://res.cloudinary.com/dqcogelsh/image/upload/v1754404875/1000179650_-_GUNDA_VENKATA_SUSHANTH_yigalf.png"
      },
      {
        name: "Chinthalapudi Vishal ",
        role: "Director of Internal Relations",
        image: "https://res.cloudinary.com/dqcogelsh/image/upload/v1754404916/e2156_-_vishal_chinthalapudi_ub7ic7.jpg"
      },
      {
        name: "Nittala S P L Haripriya ",
        role: "Technical Chair",
        image: "https://res.cloudinary.com/dqcogelsh/image/upload/v1754404965/cbdb234d-bd35-4719-9440-860aa1a57f4e_-_Priya_Nittala_wjd5ct.jpg"
      },
      {
        name: " Rongala Devisree ",
        role: "Technical Chair",
        image: "https://res.cloudinary.com/dqcogelsh/image/upload/v1754405012/1000153939_-_Devisree_Rongala_ekk54y.jpg"
      },
      {
        name: "Karyampudi Bhavana ",
        role: "Technical Chair",
        image: "https://res.cloudinary.com/dqcogelsh/image/upload/v1754405067/Image_Square_-_BHAVANA_KARYAMPUDI_g7fsgt.jpg"
      },
      {
        name: "M . Madhavi  ",
        role: "AI Research Chair",
        image: "https://res.cloudinary.com/dqcogelsh/image/upload/v1754405109/image_-_Madhavi_Munnangi_jxmirg.jpg"
      },
      {
        name: "Md Shuaib Nawaz",
        role: "Broadcasting Chair",
        image: "https://res.cloudinary.com/dqcogelsh/image/upload/v1754405431/PIC_-_SHUAIB_NAWAZ_Muhammad_ambk3m.jpg"
      },
      {
        name: "Janjanam Guna ",
        role: "Broadcasting Chair",
        image: "https://res.cloudinary.com/dqcogelsh/image/upload/v1754405524/1000001345_-_Guna_Rockzz_xesfty.jpg"
      },
      {
        name: "Sudharshan ",
        role: "Project Development Chair",
        image: "https://res.cloudinary.com/dqcogelsh/image/upload/v1754457655/sud_rtewmo.jpg"
      },
      {
        name: "Shashank Vemulapalli",
        role: "Project Development Chair",
        image: "https://res.cloudinary.com/dqcogelsh/image/upload/v1754405590/IMG-20250606-WA0064_-_Shashank_Vemulapalli_ha3iub.jpg"
      },
      {
        name: "Pinnamraju Manoj Varma ",
        role: "Project Development Chair",
        image: "https://res.cloudinary.com/dqcogelsh/image/upload/v1754405660/IMG_1047_-_Manoj_Varma_enhoix.jpg"
      },
      {
        name: "Shaik Sameer",
        role: "Project Development Chair",
        image: "https://res.cloudinary.com/dqcogelsh/image/upload/v1754405732/img2_-_Sameer_Bannu_ubsujf.jpg"
      },
      {
        name: "K Sandeep ",
        role: "Marketing Chair",
        image: "https://res.cloudinary.com/dqcogelsh/image/upload/v1754405772/WhatsApp_Image_2025-07-08_at_21.09.49_16a081ba_-_sandeep_konatham_ejp91w.jpg"
      },
      {
        name: "Talla Dakshayani",
        role: "Marketing Chair",
        image: "https://res.cloudinary.com/dqcogelsh/image/upload/v1754405811/me2_-_Dakshayani_talla_vr5l55.jpg"
      },
      {
        name: "Ponam Varshith",
        role: "Marketing Chair",
        image: "https://res.cloudinary.com/dqcogelsh/image/upload/v1754405869/1000148623_-_Varshith_Ponnam_u4f32i.jpg"
      },
      {
        name: "Kondaveeti Yoshitha",
        role: "Marketing Chair",
        image: "https://res.cloudinary.com/dqcogelsh/image/upload/v1754405911/1000125364_-_kondaveeti_yoshitha_am8cnq.jpg"
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          
          {TeamMembers.map((member, index) => (
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
      </div>
    </div>
  )
}

export default Team
