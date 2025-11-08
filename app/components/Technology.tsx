'use client';

import { motion } from 'framer-motion';
import { Shield, Database, Blocks, FileLock, Key, Cpu } from 'lucide-react';
import Image from 'next/image';

const WalrusIcon = () => (
  <Image
    src="/walrus.logo.png"
    alt="Walrus"
    width={40}
    height={40}
    className="w-full h-full object-contain"
  />
);

const SuiIcon = () => (
  <Image
    src="/suilogo.png"
    alt="Sui"
    width={40}
    height={40}
    className="w-full h-full object-contain"
  />
);

const technologies = [
  {
    icon: Key,
    name: 'ZKLogin',
    description: 'Google OAuth integration with zero-knowledge proofs for seamless authentication',
    color: 'bg-black',
  },
  {
    icon: Shield,
    name: 'Sponsored Transactions',
    description: 'We pay gas fees so you don\'t have to worry about transaction costs',
    color: 'bg-black',
  },
  {
    icon: Database,
    name: 'Sui Objects',
    description: 'Your data as programmable blockchain objects for total control',
    color: 'bg-black',
  },
  {
    icon: Blocks,
    name: 'Kiosk & PTB',
    description: 'Instant marketplace listing with programmable transaction blocks',
    color: 'bg-black',
  },
  {
    icon: WalrusIcon,
    name: 'Walrus Protocol',
    description: 'Decentralized storage for your data with maximum reliability',
    color: 'bg-transparent',
    isLogo: true,
  },
  {
    icon: FileLock,
    name: 'IPFS Storage',
    description: 'Immutable and distributed file storage across the network',
    color: 'bg-black',
  }
];

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

export default function Technology() {
  return (
    <section
      id="technology"
      className="relative w-full overflow-hidden bg-[#F0F0F0] pt-56 sm:pt-64 md:pt-72 pb-32 flex flex-col items-center"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-black blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 translate-x-1/2 rounded-full bg-gray-800 blur-3xl" />
      </div>

      <div className="section-inner relative z-10 flex w-full max-w-6xl flex-col items-center gap-16 px-4">
        {/* Header Section */}
        <div className="text-center flex flex-col items-center gap-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-black/70 backdrop-blur-sm hover:border-black/40 transition-all"
          >
            <Cpu size={16} strokeWidth={2.5} />
            Technology Stack
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black leading-tight tracking-tight"
          >
            POWERED BY
            <br />
            <span className="text-black">SUI BLOCKCHAIN</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="max-w-3xl text-lg sm:text-xl text-gray-700 leading-relaxed font-light"
          >
            Best-in-class Web3 tooling to make data ownership seamless, secure, and lightning fast.
          </motion.p>
        </div>

        {/* Technology Grid */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              variants={cardVariants}
              className="group relative h-full"
            >
              {/* Card Background with Border */}
              <div className="absolute inset-0 bg-white rounded-2xl border border-black/10 transition-all duration-500 group-hover:border-black/30 group-hover:shadow-xl" />
              
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/0 to-black/3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="relative z-10 p-8 h-full flex flex-col">
                {/* Icon Container */}
                <motion.div
                  whileHover={{ scale: 1.12, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  className={`${tech.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${tech.isLogo ? 'shadow-none' : 'shadow-lg'} transition-all duration-500 ${!tech.isLogo && 'group-hover:shadow-2xl'}`}
                >
                  {tech.isLogo ? (
                    <div className="w-12 h-12 flex items-center justify-center">
                      <tech.icon />
                    </div>
                  ) : (
                    <tech.icon size={28} className="text-white" strokeWidth={2} />
                  )}
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-black text-black mb-3 tracking-tight group-hover:text-gray-800 transition-colors duration-300">
                  {tech.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-6 font-light group-hover:text-gray-700 transition-colors duration-300">
                  {tech.description}
                </p>

                {/* Bottom Accent Line */}
                <div className="flex items-center gap-2 pt-5 border-t border-black/8 group-hover:border-black/15 transition-all duration-300">
                  <motion.div
                    className="h-0.5 bg-black/40 group-hover:bg-black/60 transition-colors duration-300"
                    animate={{ width: ['32px', '48px', '32px'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-xs font-black uppercase tracking-widest text-black/50 group-hover:text-black/70 transition-colors duration-300">
                    SUI
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Built on Sui Section - transparent background */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full flex justify-center pt-16 mt-12 border-t border-black/10"
        >
          <motion.div
            whileHover={{ scale: 1.08, y: -4 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="flex flex-col items-center gap-6"
          >
            <span className="text-xs font-black uppercase tracking-widest text-black/60 hover:text-black/80 transition-colors">
              Built on
            </span>
            <div className="w-20 h-20 flex items-center justify-center">
              <Image
                src="/suilogo.png"
                alt="Sui"
                width={80}
                height={80}
                className="h-16 w-auto object-contain"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}