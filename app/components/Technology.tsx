'use client';

import { motion } from 'framer-motion';
import { Shield, Database, Blocks, FileLock, Key } from 'lucide-react';

// Walrus and Sui icons as SVG paths
const WalrusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13.5v5.25l4.5 2.67-.75 1.23L9 13V6.5h2z" fill="currentColor"/>
  </svg>
);

const SuiIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const technologies = [
  {
    icon: Key,
    name: 'ZKLogin',
    description: 'Google OAuth integration with zero-knowledge proofs',
    color: 'from-gray-700 to-gray-900',
  },
  {
    icon: Shield,
    name: 'Sponsored Transactions',
    description: 'We pay gas fees so you don\'t have to',
    color: 'from-gray-700 to-gray-900',
  },
  {
    icon: Database,
    name: 'Sui Objects',
    description: 'Your data as programmable blockchain objects',
    color: 'from-gray-700 to-gray-900',
  },
  {
    icon: Blocks,
    name: 'Kiosk & PTB',
    description: 'Instant marketplace listing with programmable transactions',
    color: 'from-gray-700 to-gray-900',
  },
  {
    icon: WalrusIcon,
    name: 'Walrus Protocol',
    description: 'Decentralized storage for your data',
    color: 'from-gray-700 to-gray-900',
  },
  {
    icon: FileLock,
    name: 'IPFS Storage',
    description: 'Immutable and distributed file storage',
    color: 'from-gray-700 to-gray-900',
  },
];

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function Technology() {
  return (
    <section
      id="technology"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#f4f4f4] to-[#dedede] pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-24 sm:pb-28 md:pb-32 lg:pb-36 flex flex-col items-center"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-1/4 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#c3c3c3] blur-[180px]" />
        <div className="absolute bottom-1/3 right-1/4 h-[360px] w-[360px] translate-x-1/3 rounded-full bg-[#9f9f9f] blur-[160px]" />
      </div>

      <div className="section-inner relative z-10 flex w-full max-w-6xl flex-col items-center gap-16">
        <div className="text-center flex flex-col items-center gap-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#2f2f2f]/20 bg-white/60 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#2b2b2b] sm:text-sm">
            ⚡ Technology Stack
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-balance text-3xl font-black leading-tight text-[#121212] sm:text-4xl md:text-5xl lg:text-6xl"
          >
            POWERED BY <span className="text-[#2f2f2f]">SUI BLOCKCHAIN</span>
          </motion.h2>
          <p className="max-w-3xl text-pretty text-sm text-[#3f3f3f] sm:text-base md:text-lg">
            Best-in-class Web3 tooling to make data ownership seamless, secure, and lightning fast.
          </p>
        </div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {technologies.map((tech) => (
            <motion.div
              key={tech.name}
              variants={cardVariants}
              className="group flex h-full flex-col rounded-3xl border border-[#1f1f1f]/15 bg-gradient-to-br from-[#f8f8f8] via-[#e4e4e4] to-[#d1d1d1] p-6 text-left shadow-[0_14px_32px_rgba(23,23,23,0.12)] transition-all duration-300 hover:-translate-y-2 hover:border-[#1f1f1f]/30 hover:shadow-[0_18px_42px_rgba(23,23,23,0.16)]"
            >
              <div className={`mb-5 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${tech.color} flex items-center justify-center text-white shadow-inner shadow-white/40 transition-transform duration-300 group-hover:scale-110`}>
                {tech.icon === WalrusIcon || tech.icon === SuiIcon ? (
                  <tech.icon />
                ) : (
                  <tech.icon size={22} className="text-white" />
                )}
              </div>
              <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">{tech.name}</h3>
              <p className="text-sm leading-relaxed text-[#2f2f2f] flex-1">
                {tech.description}
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.28em] text-[#4e4e4e]">
                <span className="h-[2px] w-8 bg-[#4e4e4e]/60" />
                SUI ECOSYSTEM
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-3xl border border-[#1f1f1f]/15 bg-white/80 px-8 py-5 shadow-[0_12px_30px_rgba(23,23,23,0.08)]">
            <SuiIcon />
            <div className="text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#4a4a4a]">Built on</p>
              <p className="text-2xl font-black text-[#121212] leading-tight">Sui — developer-first blockchain</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}