'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, Upload, Shield, ShoppingCart } from 'lucide-react';

export default function FourPillars() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pillars = [
    {
      number: '01',
      title: 'Onboarding',
      subtitle: 'Zero Friction',
      desc: 'Forget wallets and seed phrases. Login with Google via ZKLogin. An ephemeral wallet is created instantly in the background.',
      icon: Zap,
      features: ['Google Login', 'No Seed Phrases', 'Instant Setup'],
    },
    {
      number: '02',
      title: 'Production',
      subtitle: 'Zero Cost',
      desc: 'Upload data directly from your digital life. We sponsor the gas fees, so you never have to buy crypto to start earning.',
      icon: Upload,
      features: ['Sponsored Tx', 'Gasless', 'One-Click'],
    },
    {
      number: '03',
      title: 'Ownership',
      subtitle: 'Encrypted & Minted',
      desc: 'Your data is minted as a unique Sui Object (DataPod). It lives on-chain, encrypted, and fully under your control.',
      icon: Shield,
      features: ['Sui Objects', 'IPFS Storage', 'AES Encryption'],
    },
    {
      number: '04',
      title: 'Marketplace',
      subtitle: 'Global Access',
      desc: 'List your DataPod instantly via Kiosk. Buyers from around the world can purchase access 24/7 with automated payments.',
      icon: ShoppingCart,
      features: ['Kiosk Listing', 'Automated Payouts', '24/7 Trading'],
    },
  ];

  return (
    <section
      id="features"
      ref={containerRef}
      className="relative w-full bg-[#050505] py-32 sm:py-48 lg:py-64 overflow-visible"
    >
      {/* Ambient Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-white/[0.02] blur-[200px] rounded-full pointer-events-none" />

      <div className="section-inner relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
        
        {/* Header */}
        <div className="mb-24 sm:mb-40 md:mb-48 lg:mb-64 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl lg:text-8xl xl:text-9xl font-black text-white tracking-tighter mb-6 sm:mb-8 leading-tight"
          >
            THE <span className="text-white/20">PILLARS</span>
          </motion.h2>
          <p className="text-base sm:text-lg md:text-xl text-white/40 font-medium max-w-2xl mx-auto leading-relaxed">
            Four core technologies powering the next generation of data ownership.
          </p>
        </div>

        {/* The Monoliths - Alternating Layout */}
        <div className="flex flex-col gap-16 sm:gap-24 md:gap-40 lg:gap-48 xl:gap-64">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-32 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Visual Side */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="relative aspect-square sm:aspect-[4/3] overflow-hidden rounded-[3rem] bg-[#111] border border-white/5">
                  {/* Spotlight */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Giant Number */}
                  <div className="absolute -bottom-20 -right-20 text-[20rem] font-black text-white/[0.02] leading-none select-none transition-transform duration-1000 group-hover:scale-110 group-hover:text-white/[0.04]">
                    {pillar.number}
                  </div>

                  {/* Icon Center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white shadow-[0_0_50px_-10px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-500">
                      <pillar.icon size={64} strokeWidth={1} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2">
                <div className="flex flex-col gap-6 sm:gap-8">
                  <div className="space-y-4 sm:space-y-5">
                    <span className="block text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-white/40">
                      {pillar.subtitle}
                    </span>
                    <h3 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-base sm:text-lg lg:text-xl text-white/60 leading-relaxed font-light max-w-xl">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="h-px w-full bg-white/10" />

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {pillar.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 sm:gap-3 text-white/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0 mt-1" />
                        <span className="text-base sm:text-lg leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}