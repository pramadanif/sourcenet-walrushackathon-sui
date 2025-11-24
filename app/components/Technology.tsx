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

const DeepSeekIcon = () => (
  <Image
    src="/DeepSeek-Logo.png"
    alt="DeepSeek AI"
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
  },
  {
    icon: DeepSeekIcon,
    name: 'DeepSeek AI Integration',
    description: 'Advanced AI capabilities powered by DeepSeek for intelligent interactions',
    color: 'bg-transparent',
    isLogo: true,
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
      className="relative w-full overflow-hidden bg-[#F0F0F0] pt-80 sm:pt-96 md:pt-[120px] pb-32 flex flex-col items-center"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-black blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 translate-x-1/2 rounded-full bg-gray-800 blur-3xl" />
      </div>

      <div className="section-inner relative z-10 flex w-full max-w-6xl flex-col items-center gap-16 px-4">
        {/* Header Section */}
        <div className="text-center flex flex-col items-center gap-6 w-full pt-20">
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
          className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {technologies.map((tech, index) => {
            const isLastItem = index === technologies.length - 1;
            return (
              <motion.div
                key={tech.name}
                variants={cardVariants}
                className={`group ${isLastItem ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : ''}`}
              >
                {/* Card Container */}
                <div className="bg-white rounded-2xl border border-black/10 transition-all duration-500 group-hover:border-black/30 group-hover:shadow-xl h-full flex flex-col p-8">

                  {/* Icon Container - Centered */}
                  <motion.div
                    whileHover={{ scale: 1.12, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className="flex justify-center mb-8"
                  >
                    <div className={`${tech.color} ${tech.isLogo && tech.name.includes('DeepSeek') ? 'w-24 h-24' : 'w-16 h-16'} rounded-xl flex items-center justify-center ${tech.isLogo ? 'shadow-none' : 'shadow-lg'} transition-all duration-500 ${!tech.isLogo && 'group-hover:shadow-2xl'}`}>
                      {tech.isLogo ? (
                        <div className={`${tech.name.includes('DeepSeek') ? 'w-20 h-20' : 'w-12 h-12'} flex items-center justify-center`}>
                          <tech.icon />
                        </div>
                      ) : (
                        <tech.icon size={28} className="text-white" strokeWidth={2} />
                      )}
                    </div>
                  </motion.div>

                  {/* Title - Centered */}
                  <h3 className="text-xl font-black text-black mb-3 tracking-tight group-hover:text-gray-800 transition-colors duration-300 text-center">
                    {tech.name}
                  </h3>

                  {/* Description - Centered */}
                  <p className="text-sm text-gray-600 leading-relaxed text-center flex-1 mb-8 font-light group-hover:text-gray-700 transition-colors duration-300">
                    {tech.description}
                  </p>

                  {/* Bottom Accent Line */}
                  <div className="pt-6 border-t border-black/8 group-hover:border-black/15 transition-all duration-300" />
                </div>
              </motion.div>
            );
          })}
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