'use client';

import { motion } from "framer-motion";
import { Lock, Coins, Settings2, XCircle } from "lucide-react";

// --- Types & Data ---
interface Problem {
  id: number;
  title: string;
  desc: string;
  icon: React.ElementType;
}

const ProblemIcons = {
  lock: Lock,
  money: Coins,
  gear: Settings2,
  cross: XCircle,
};

const problems: Problem[] = [
  {
    id: 1,
    title: "Data Locked in Silos",
    desc: "Your digital life is fragmented across platforms (Google, Meta, Amazon). It's impossible to aggregate and sell your 'digital identity' as a single asset.",
    icon: ProblemIcons.lock,
  },
  {
    id: 2,
    title: "Big Tech Profits, You Don't",
    desc: "You generate terabytes of digital footprint yearly. Silicon Valley giants monetize it for billions while you earn exactly $0.00.",
    icon: ProblemIcons.money,
  },
  {
    id: 3,
    title: "Web3 UX Nightmare",
    desc: "Existing decentralized marketplaces require MetaMask installs, seed phrase management, and buying crypto for gas before uploading your first file.",
    icon: ProblemIcons.gear,
  },
  {
    id: 4,
    title: "The Data Serfdom Crisis",
    desc: "We live in a broken data economy. Users create the value, Big Tech keeps the profit. It's time to change the equation permanently.",
    icon: ProblemIcons.cross,
  },
];

// --- Animation Variants ---
const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.8,
    rotateX: -15,
    filter: 'blur(10px)'
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      mass: 1,
      duration: 0.8,
    },
  },
};

const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

export default function ProblemSection() {
  return (
    <section
      id="problem"
      className="relative z-10 w-full pt-12 sm:pt-14 md:pt-16 lg:pt-20 pb-12 sm:pb-14 md:pb-16 lg:pb-20 bg-[#CECECE] text-[#474747] overflow-hidden flex flex-col items-center"
    >
      {/* Animated gradient background - Keeping the same palette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#CECECE] via-[#dcdcdc] to-[#CECECE]" />

      {/* Subtle Glow effects for depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-white/20 blur-[120px] rounded-[100%] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(#333 1px, transparent 1px),
            linear-gradient(90deg, #333 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Container Inner */}
      <div className="section-inner relative z-10 flex flex-col items-center gap-12 lg:gap-16 w-full px-6 max-w-7xl mx-auto">

        {/* Header Section */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="header-content mx-auto flex w-full max-w-3xl flex-col items-center text-center gap-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-black/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#333]">
            THE PROBLEM
          </span>
          <h2 className="w-full text-4xl sm:text-5xl md:text-6xl font-black leading-[0.95] text-[#161616] tracking-tight mb-2">
            The <span className="opacity-40">Data Serfdom</span>
            <br />
            Crisis is <span className="opacity-40">Real.</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#555] max-w-2xl leading-relaxed mt-2">
            We are living in a broken data economy.
            <br className="hidden sm:block" />
            Users generate the value. Big Tech keeps the profit.
          </p>
        </motion.div>

        {/* Clean Icon Grid */}
        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 lg:gap-x-12"
        >
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={problem.id}
                variants={itemVariants}
                className="group flex flex-col items-center text-center"
              >
                {/* Icon Container dengan animasi Web3 */}
                <motion.div
                  className="relative mb-6 group-hover:-translate-y-2 transition-transform duration-500 ease-out"
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  {/* Particle effect background */}
                  <motion.div
                    className="absolute inset-0 bg-white/60 blur-2xl rounded-full scale-150 z-0"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: [0, 1, 0], scale: [0, 1.5, 2] }}
                    transition={{ duration: 1.2, delay: index * 0.2 }}
                  />

                  {/* Circle Background */}
                  <motion.div
                    className="w-24 h-24 rounded-full bg-[#E5E5E5] border border-white/40 shadow-inner flex items-center justify-center relative z-10"
                    whileHover={{ boxShadow: '0 0 30px rgba(255,255,255,0.6)' }}
                  >
                    <Icon className="h-9 w-9 text-[#222]" strokeWidth={1.5} />
                  </motion.div>

                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-white/40 blur-xl rounded-full scale-150 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>

                {/* Text Content */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#111] mb-3 leading-tight tracking-tight">
                  {problem.title}
                </h3>

                <p className="text-[16px] leading-relaxed text-[#555] max-w-[280px]">
                  {problem.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA / Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-8 h-px w-full max-w-xs bg-gradient-to-r from-transparent via-black/10 to-transparent"
        />

      </div>
    </section>
  );
}