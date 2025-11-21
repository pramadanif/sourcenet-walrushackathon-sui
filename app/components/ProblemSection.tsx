'use client';

import { motion } from "framer-motion";
import { Lock, Coins, Settings2, XCircle } from "lucide-react";

const ProblemIcons = {
  lock: Lock,
  money: Coins,
  gear: Settings2,
  cross: XCircle,
};

const problems = [
  {
    id: 1,
    title: "Data Locked Away",
    desc: "Your data is trapped in Web2 silos.",
    icon: ProblemIcons.lock,
  },
  {
    id: 2,
    title: "Companies Profit, You Don't",
    desc: "Big tech monetizes your data for billions while you see zero compensation.",
    icon: ProblemIcons.money,
  },
  {
    id: 3,
    title: "Web3 Too Complex",
    desc: "Existing Web3 marketplaces require wallets, gas fees, and technical knowledge.",
    icon: ProblemIcons.gear,
  },
  {
    id: 4,
    title: "No Easy Access",
    desc: "Selling your data should be simple, but current solutions make it impossible.",
    icon: ProblemIcons.cross,
  },
];

const headerVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.25,
    },
  },
};

export default function ProblemSection() {
  return (
    <section
      id="problem"
      className="relative z-10 w-full pt-40 sm:pt-48 md:pt-56 lg:pt-64 pb-28 sm:pb-32 md:pb-36 lg:pb-40 bg-[#CECECE] text-[#474747] overflow-hidden flex flex-col items-center"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#CECECE] via-white to-[#CECECE]" />
      
      {/* Multiple glow effects for depth */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#919191]/20 blur-[150px] rounded-full animate-pulse" 
           style={{ animationDuration: "4s" }} />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#474747]/10 blur-[120px] rounded-full animate-pulse" 
           style={{ animationDuration: "6s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#353535]/5 blur-[180px] rounded-full" />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(71, 71, 71, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(71, 71, 71, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="section-inner relative z-10 flex flex-col items-center gap-20">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="header-content mx-auto flex w-full max-w-4xl flex-col items-center text-center gap-5 sm:gap-6 lg:gap-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#4b4b4b]/30 bg-[#919191]/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#353535] sm:text-sm">
            The Problem
          </span>
          <h2 className="w-full text-balance text-3xl font-black leading-tight text-[#161616] sm:text-4xl md:text-5xl lg:text-6xl">
            Your Data is <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2f2f2f] via-[#111111] to-[#3d3d3d]">Locked</span>
            <br className="hidden sm:block" />
            and Monetized by <span className="text-[#202020]">Big Web2</span>
          </h2>
          <p className="text-pretty text-center text-sm text-[#4f4f4f] sm:text-base md:text-lg lg:text-xl">
            Your browsing history, game history, and personal data are <span className="font-semibold text-[#282828]">locked by companies.</span>
            <span className="mt-1 block">Existing Web3 marketplaces are too complex: wallets, gas fees, and setup.</span>
          </p>
        </motion.div>

        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="cards-grid mx-auto mt-12 grid w-full max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-4"
        >
          {problems.map((problem) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={problem.id}
                variants={cardVariants}
                className="group relative flex h-full min-h-[240px] flex-col gap-6 overflow-hidden rounded-3xl border border-[#2e2e2e]/15 bg-gradient-to-br from-[#f3f3f3] via-[#dcdcdc] to-[#c6c6c6] p-7 shadow-[0_20px_50px_rgba(38,38,38,0.12)] backdrop-blur-sm transition-all duration-300 hover:border-[#2e2e2e]/35 hover:shadow-[0_26px_60px_rgba(38,38,38,0.18)]"
                whileHover={{ y: -6 }}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-40" style={{ background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.4), transparent 60%)" }} />

                <div className="relative z-10 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/45 text-[#1e1e1e] shadow-inner shadow-white/60">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.4} />
                  </div>
                  <h3 className="text-xl font-semibold text-[#111] sm:text-2xl">
                    {problem.title}
                  </h3>
                </div>

                <p className="relative z-10 text-base text-[#2f2f2f] leading-relaxed">
                  {problem.desc}
                </p>

                <div className="relative z-10 mt-auto h-[2px] w-0 bg-gradient-to-r from-[#1b1b1b] via-[#000000] to-transparent transition-all duration-500 group-hover:w-full" />
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-24 sm:mt-28 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full
                        border border-[#353535]/25 bg-white/80 backdrop-blur-md shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[#353535] animate-pulse" />
            <span className="text-[#474747] text-sm md:text-base">
              <span className="text-[#353535] font-bold">SourceNet</span> makes data ownership simple and profitable
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}