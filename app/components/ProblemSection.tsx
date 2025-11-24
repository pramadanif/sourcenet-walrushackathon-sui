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
    title: "Data Locked Away",
    desc: "Your digital life is trapped in Web2 silos. You generate value, but they keep it trapped.",
    icon: ProblemIcons.lock,
  },
  {
    id: 2,
    title: "Companies Profit, You Don't",
    desc: "Big tech monetizes your data for billions while you see exactly $0.00 in return.",
    icon: ProblemIcons.money,
  },
  {
    id: 3,
    title: "Web2 Too Complex",
    desc: "Existing marketplaces are impossible to use: wallets, seed phrases, and gas fees.",
    icon: ProblemIcons.gear,
  },
  {
    id: 4,
    title: "No Easy Access",
    desc: "Selling your data should be as easy as browsing. Currently, it is virtually impossible.",
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
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export default function ProblemSection() {
  return (
    <section
      id="problem"
      // UPDATED: Increased padding-top (pt) significantly to push content down from Hero
      className="relative z-10 w-full pt-32 sm:pt-40 md:pt-52 lg:pt-64 pb-32 sm:pb-40 md:pb-48 lg:pb-56 bg-[#CECECE] text-[#474747] overflow-hidden flex flex-col items-center"
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
      <div className="section-inner relative z-10 flex flex-col items-center gap-24 lg:gap-32 w-full px-6 max-w-7xl mx-auto mt-12 sm:mt-20">

        {/* Header Section */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="header-content mx-auto flex w-full max-w-3xl flex-col items-center text-center gap-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-black/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#333]">
            
          </span>
          <h2 className="w-full text-4xl sm:text-5xl md:text-6xl font-black leading-[0.95] text-[#161616] tracking-tight mb-2">
            Your Data is <span className="opacity-40">Locked.</span>
            <br />
            Big Tech <span className="opacity-40">Profits.</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#555] max-w-2xl leading-relaxed mt-2">
            The internet is broken. You create the value, they capture it.
            <br className="hidden sm:block" />
            SourceNet changes the equation permanently.
          </p>
        </motion.div>

        {/* Clean Icon Grid */}
        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24 lg:gap-x-16"
        >
          {problems.map((problem) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={problem.id}
                variants={itemVariants}
                className="group flex flex-col items-center text-center"
              >
                {/* Icon Container - Increased margin bottom (mb-10 -> mb-14) for more space before title */}
                <div className="relative mb-14 group-hover:-translate-y-2 transition-transform duration-500 ease-out">
                  {/* Circle Background */}
                  <div className="w-24 h-24 rounded-full bg-[#E5E5E5] border border-white/40 shadow-inner flex items-center justify-center relative z-10">
                    <Icon className="h-9 w-9 text-[#222]" strokeWidth={1.5} />
                  </div>

                  {/* Subtle Shadow/Glow under icon */}
                  <div className="absolute inset-0 bg-white/40 blur-xl rounded-full scale-150 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Text Content - Increased margin bottom (mb-5 -> mb-6) */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#111] mb-6 leading-tight tracking-tight">
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
          className="mt-16 h-px w-full max-w-xs bg-gradient-to-r from-transparent via-black/10 to-transparent"
        />

      </div>
    </section>
  );
}