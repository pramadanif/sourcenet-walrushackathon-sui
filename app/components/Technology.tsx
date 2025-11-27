'use client';

import { motion } from 'framer-motion';
import { Shield, Database, Blocks, FileLock, Key, Cpu } from 'lucide-react';
import Image from 'next/image';

const OpenAIIcon = () => (
  <Image
    src="/OpenAI_Logo.png"
    alt="OpenAI"
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

const WalrusIcon = () => (
  <Image
    src="/walrus.logo.png"
    alt="Walrus"
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
    isLogo: false,
  },
  {
    icon: Shield,
    name: 'Sponsored Transactions',
    description: 'We pay gas fees so you don\'t have to worry about transaction costs',
    color: 'bg-black',
    isLogo: false,
  },
  {
    icon: Database,
    name: 'Sui Objects',
    description: 'Your data as programmable blockchain objects for total control',
    color: 'bg-black',
    isLogo: false,
  },
  {
    icon: Blocks,
    name: 'Kiosk & PTB',
    description: 'Instant marketplace listing with programmable transaction blocks',
    color: 'bg-black',
    isLogo: false,
  },
  {
    icon: WalrusIcon,
    name: 'Walrus Protocol',
    description: 'Decentralized storage for your encrypted data with maximum reliability and permanent availability',
    color: 'bg-black',
    isLogo: false,
  },
  {
    icon: OpenAIIcon,
    name: 'OpenAI Integration',
    description: 'AI-powered data valuation and metadata tagging to help you price your data correctly and connect with buyers',
    color: 'bg-white',
    isLogo: true,
  },
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
      className="relative w-full overflow-hidden bg-[#F0F0F0] py-20 flex flex-col items-center"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-black blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 translate-x-1/2 rounded-full bg-gray-800 blur-3xl" />
      </div>

      <div className="section-inner relative z-10 flex w-full max-w-7xl flex-col items-center gap-16 px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center flex flex-col items-center gap-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-black/70 backdrop-blur-sm hover:border-black/40 transition-all"
          >
            TECHNOLOGY STACK
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
          className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {technologies.map((tech, index) => {
            return (
              <motion.div
                key={tech.name}
                variants={cardVariants}
                className="group flex flex-col items-center text-center cursor-pointer p-6"
              >
                {/* Icon Container */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  className="mb-6"
                >
                  <div className={`w-20 h-20 rounded-2xl ${tech.color} shadow-lg group-hover:shadow-2xl transition-all duration-500 flex items-center justify-center group-hover:scale-110`}>
                    {tech.isLogo ? (
                      <div className="w-12 h-12 flex items-center justify-center">
                        <tech.icon />
                      </div>
                    ) : (
                      <tech.icon size={36} className="text-white" strokeWidth={1.8} />
                    )}
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex flex-col gap-3"
                >
                  <h3 className="text-2xl font-black text-black tracking-tight group-hover:text-gray-800 transition-colors duration-300">
                    {tech.name}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed font-light group-hover:text-gray-700 transition-colors duration-300 max-w-xs">
                    {tech.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Built on Sui Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full flex justify-center pt-8 mt-8 border-t border-black/10"
        >
          <motion.div
            whileHover={{ scale: 1.1, y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="flex flex-col items-center gap-4 cursor-pointer"
          >
            <span className="text-xs font-black uppercase tracking-widest text-black/60 hover:text-black/80 transition-colors">
              Built on
            </span>
            <div className="w-16 h-16 flex items-center justify-center">
              <SuiIcon />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}