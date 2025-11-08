'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Shield, Database, Blocks, Cloud, Lock } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Technology() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.tech-card', {
        scrollTrigger: {
          trigger: '.tech-grid',
          start: 'top 80%',
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const technologies = [
    {
      icon: Zap,
      name: 'ZKLogin',
      description: 'Google OAuth integration with zero-knowledge proofs',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Shield,
      name: 'Sponsored Transactions',
      description: 'We pay gas fees so you don\'t have to',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Database,
      name: 'Sui Objects',
      description: 'Your data as programmable blockchain objects',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Blocks,
      name: 'Kiosk & PTB',
      description: 'Instant marketplace listing with programmable transactions',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Cloud,
      name: 'Walrus Protocol',
      description: 'Decentralized storage for your data',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      icon: Lock,
      name: 'IPFS Storage',
      description: 'Immutable and distributed file storage',
      color: 'from-red-500 to-orange-500',
    },
  ];

  return (
    <section ref={sectionRef} id="technology" className="section-padding bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-blue-500 opacity-30 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-500 opacity-30 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium">
              ⚡ Technology Stack
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            POWERED BY <span className="text-[#CDFF00]">SUI BLOCKCHAIN</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Best-in-class Web3 tech stack for seamless user experience
          </p>
        </div>

        {/* Tech Grid */}
        <div className="tech-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10, scale: 1.02 }}
              className="tech-card group"
            >
              <div className="bg-[#0A0A0A] border border-gray-800 rounded-2xl p-6 h-full hover:border-gray-700 transition-all relative overflow-hidden">
                {/* Background gradient */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${tech.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />

                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <tech.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{tech.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{tech.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sui Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-block bg-[#1A1A1A] border border-gray-800 rounded-3xl px-12 py-8">
            <p className="text-gray-400 text-sm mb-4">Built on</p>
            <div className="text-6xl font-black">
              <span className="bg-gradient-to-r from-[#CDFF00] via-blue-500 to-purple-500 bg-clip-text text-transparent">
                SUI
              </span>
            </div>
            <p className="text-gray-500 text-xs mt-4">The most developer-friendly blockchain</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}