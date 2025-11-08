"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const problems = [
  {
    id: 1,
    title: "Data Locked Away",
    desc: "Your browsing history, game stats, and personal data are trapped in Web2 silos.",
    icon: "🔐",
  },
  {
    id: 2,
    title: "Companies Profit, You Don't",
    desc: "Big tech monetizes your data for billions while you see zero compensation.",
    icon: "💰",
  },
  {
    id: 3,
    title: "Web3 Too Complex",
    desc: "Existing Web3 marketplaces require wallets, gas fees, and technical knowledge.",
    icon: "⚙️",
  },
  {
    id: 4,
    title: "No Easy Access",
    desc: "Selling your data should be simple, but current solutions make it impossible.",
    icon: "🚫",
  },
];

const LOCK_PARTICLES = Array.from({ length: 15 }, (_, i) => ({
  left: `${(5 + i * 13) % 100}%`,
  top: `${(18 + i * 19) % 100}%`,
  amplitude: 25 + (i % 3) * 10,
  delay: (i % 7) * 0.4,
  rotation: (i % 4 === 0 ? 12 : i % 4 === 1 ? -15 : 8),
}));

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const header = el.querySelector<HTMLElement>(".header-content");
      if (header) {
        gsap.fromTo(
          header,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
            },
          }
        );
      }

      const cards = cardsRef.current.filter(
        (card): card is HTMLDivElement => Boolean(card)
      );

      if (cards.length) {
        gsap.fromTo(
          cards,
          { y: 100, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.15,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el.querySelector(".cards-grid") ?? el,
              start: "top 80%",
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 min-h-screen py-32 px-6 md:px-12 lg:px-20 bg-[#CECECE] text-[#474747] overflow-hidden"
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

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="header-content text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-4 px-6 py-2 rounded-full border border-[#474747]/30 bg-[#919191]/30 backdrop-blur-sm"
          >
            <span className="text-[#353535] text-sm font-semibold tracking-wider uppercase">
              The Problem
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-8"
          >
            Your Data is{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#353535] to-[#000000]">
              Locked
            </span>
            <br />
            and Monetized by{" "}
            <span className="text-[#353535]">
              Big Web2
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-[#474747]/80 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed"
          >
            Your browsing history, game history, and personal data are{" "}
            <span className="text-[#353535] font-semibold">locked by companies</span>. Existing Web3 marketplaces are too complex: wallets, gas fees, and setup.
          </motion.p>
        </div>

        {/* Problem Cards Grid */}
        <div className="cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {problems.map((problem, index) => (
            <div
              key={problem.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="group relative"
            >
              {/* Card glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#919191]/0 via-[#919191]/0 to-[#919191]/0 
                            group-hover:from-[#919191]/20 group-hover:via-[#919191]/30 group-hover:to-[#919191]/20 
                            rounded-3xl blur-xl transition-all duration-700" />
              
              {/* Card */}
              <div
                className="relative h-full border border-[#474747]/20 rounded-3xl p-8 
                          bg-gradient-to-br from-white via-[#CECECE] to-white
                          group-hover:border-[#474747]/50 group-hover:shadow-[0_0_60px_rgba(71,71,71,0.2)]
                          transition-all duration-700 backdrop-blur-sm overflow-hidden"
              >
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#919191]/30 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" />
                
                {/* Header with Number Badge */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl opacity-25 group-hover:opacity-40 transition-opacity duration-500">
                      {problem.icon}
                    </div>
                  </div>
                  <div className="text-[#3b82f6] text-base font-bold px-4 py-2 rounded-full 
                                border-2 border-[#3b82f6]/30 bg-[#3b82f6]/10
                                group-hover:bg-[#3b82f6]/20 group-hover:scale-105 
                                transition-all duration-500">
                    0{index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-5">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#000000] leading-tight 
                               group-hover:text-[#3b82f6] transition-colors duration-500">
                    {problem.title}
                  </h3>
                  <p className="text-[#474747] text-base md:text-lg leading-relaxed 
                              font-medium transition-colors duration-500">
                    {problem.desc}
                  </p>
                </div>

                {/* Bottom line indicator */}
                <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-gradient-to-r from-[#3b82f6] to-transparent 
                              group-hover:w-full transition-all duration-700 rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full 
                        border border-[#474747]/30 bg-gradient-to-r from-[#919191]/30 to-transparent 
                        backdrop-blur-md">
            <div className="w-2 h-2 rounded-full bg-[#353535] animate-pulse" />
            <span className="text-[#474747] text-sm md:text-base">
              <span className="text-[#353535] font-bold">SourceNet</span> makes data ownership simple and profitable
            </span>
          </div>
        </motion.div>
      </div>

      {/* Floating locked chain particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {LOCK_PARTICLES.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            style={{ left: particle.left, top: particle.top }}
            animate={{
              y: [0, -particle.amplitude, 0],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, particle.rotation, -particle.rotation, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          >
            🔒
          </motion.div>
        ))}
      </div>
    </section>
  );
}