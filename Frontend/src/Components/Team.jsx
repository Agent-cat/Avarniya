import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Team = () => {
  const [selectedYear, setSelectedYear] = useState("Y23");

  const FacultyIncharge = [
    {
      name: "Dr. V S V Prabhakar (HOD)",
      role: "HOD(Dept of AI&DS)",
      image: "https://res.cloudinary.com/dqcogelsh/image/upload/v1754405994/WhatsApp_Image_2025-08-05_at_19.57.24_113a9172_zelamj.jpg"
    },
    {
      name: "Mr.V.Joe Nithin",
      role: "Club Advisor",
      image: "https://res.cloudinary.com/vishnu2005/image/upload/f_auto,q_auto/mj9ituycvqfaij7yop67"
    },
  ];

  // You can define Y22 members if you want:
  const TeamMembersY22 = [
    {
      "name": "A Siva",
      "role": "Founder & President",
      "image": "https://res.cloudinary.com/dqcogelsh/image/upload/v1754587771/Siva_juqhgs.jpg",
      
    },
    {
      "name": "A Aravind",
      "role": "Co-Founder",
      "image": "https://res.cloudinary.com/dqcogelsh/image/upload/v1754587770/aravind_lkxcl2.jpg",
      
    },
    {
      "name": "V Hari Sankar",
      "role": "Director Of Technology",
      "image": "https://res.cloudinary.com/dqcogelsh/image/upload/v1754587770/hari_d7r5wv.jpg",
     
    },
    {
      "name": "T Vishnu",
      "role": "Vice President",
      "image": "https://res.cloudinary.com/dqcogelsh/image/upload/v1754587772/vishnu_rnulit.jpg",
     
    },     
    {
      "name": "N Vijay",
      "role": "Co-Founder & Director Of Internal Relations",
      "image": "https://res.cloudinary.com/dqcogelsh/image/upload/v1754587772/vijay_abqbqi.jpg",
      
    },
    {
      "name": "M Teja",
      "role": "Director Of External Relations",
      "image": "https://res.cloudinary.com/dqcogelsh/image/upload/v1754587771/teja_dobzfl.jpg",
      
    },
      {
      "name": "V Venkat",
      "role": "Director Of Designing",
      "image": "https://res.cloudinary.com/dqcogelsh/image/upload/v1754587772/venkat_v6q11w.jpg",
      
    },
    {
      "name": "M Surya",
      "role": "Director Of Planning",
      "image": "https://res.cloudinary.com/dqcogelsh/image/upload/v1754587772/surya_daubqn.jpg",
      
    },
    {
      "name": "T Deekshitha",
      "role": "Technical Chair",
      "image": "https://res.cloudinary.com/dqcogelsh/image/upload/v1754587770/deekshitha_w7s0cz.png",
      
    },
    {
      "name": "Sk Thajuddin",
      "role": "Technical Chair",
      "image": "https://res.cloudinary.com/dqcogelsh/image/upload/v1754587772/Thajuddin_yc28xp.jpg",
      
    },
    {
      "name": "J Bhavan",
      "role": "Research Chair",
      "image": "https://res.cloudinary.com/dqcogelsh/image/upload/v1754587770/bhavan_hfmivz.jpg",
      
    },
    {
      "name": "P Prudhvi",
      "role": "Project Management Chair",
      "image": "https://res.cloudinary.com/dqcogelsh/image/upload/v1754587771/prudhvi_eonrz9.jpg",
      
    },
    {
      "name": "V Ajay",
      "role": "Project Management Chair",
      "image": "https://res.cloudinary.com/dqcogelsh/image/upload/v1754587770/ajay_tmplif.jpg",
      
    },
    {
      "name": "T Mahi",
      "role": "Professional Development Chair",
      "image": "https://res.cloudinary.com/dqcogelsh/image/upload/v1754587771/mahi_q0adxl.png",
      
    },
    {
      "name": "V Basaweswar",
      "role": "Professional Development Chair",
      "image": "https://res.cloudinary.com/dqcogelsh/image/upload/v1754587770/basava_ncg1k4.jpg",
      
    },
    {
      "name": "Ch Adithya",
      "role": "Marketing Chair",
      "image": "https://res.cloudinary.com/dqcogelsh/image/upload/v1754587769/adithya_fpcxjr.jpg",
      
    },
    {
      "name": "M Sai Chand",
      "role": "Marketing Chair",
      "image": "https://res.cloudinary.com/dqcogelsh/image/upload/v1754587771/sai_chand_q2z9bk.jpg",
      
    }
    // Add more if needed
  ];

  const TeamMembersY23 = [/* ...your existing TeamMembers array... */
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
  ];

  const TeamMembers = selectedYear === "Y23" ? TeamMembersY23 : TeamMembersY22;

  const renderCard = (member, index) => (
    <motion.div
      key={member.name}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-[#0A0C33] text-white rounded-xl overflow-hidden border border-gray-600 shadow-md hover:scale-105 transition-transform duration-300 max-w-xs mx-auto flex flex-col"
      style={{ height: "360px" }}
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-64 h-48 object-cover rounded-t-xl"
      />
      <div className="flex-grow flex flex-col justify-center items-center text-center px-4 py-3">
        <h3 className="text-lg font-bold">{member.name}</h3>
        <p className="text-sm mt-1">{member.role}</p>
      </div>
    </motion.div>
  );

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
        <h1 className="text-3xl font-bold text-center text-white mb-12">Faculty Coordinators</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-20">
          {FacultyIncharge.map(renderCard)}
        </div>

        {/* Year Switch Buttons */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setSelectedYear("Y22")}
            className={`px-6 py-2 rounded-md font-semibold ${
              selectedYear === "Y22" ? "bg-white text-black" : "bg-gray-800 text-white"
            }`}
          >
            Alumini Y22
          </button>
          <button
            onClick={() => setSelectedYear("Y23")}
            className={`px-6 py-2 rounded-md font-semibold ${
              selectedYear === "Y23" ? "bg-white text-black" : "bg-gray-800 text-white"
            }`}
          >
            Y23
          </button>
        </div>

        <h1 className="text-3xl font-bold text-center text-white mb-12">
          Team Members ({selectedYear})
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {TeamMembers.map(renderCard)}
        </div>
      </div>
    </div>
  );
};

export default Team;
