'use client';

import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Zap, Upload, Shield, ShoppingCart } from 'lucide-react';

export default function FourPillars() {
  const containerRef = useRef(null);
  // Hook ini optional jika ingin parallax, dibiarkan untuk extensibility
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pillars = [
    {
      number: '01',
      title: 'Frictionless Onboarding',
      subtitle: 'The Invisible Web3',
      desc: 'We replaced wallets with Sui ZKLogin. Users sign in with Google, and a non-custodial wallet is created instantly in the background. No extensions, no seed phrases, no crypto knowledge needed.',
      icon: Zap,
      features: ['Google OAuth Sign-In', 'ZKLogin Technology', 'Auto-Generated Wallet', 'Zero Setup Required'],
    },
    {
      number: '02',
      title: 'Gasless Experience',
      subtitle: 'We Pay the Gas',
      desc: 'Through Sponsored Transactions, we cover all blockchain fees. Sellers can upload, mint, and list their data without ever owning a single SUI token. Start earning immediately, zero costs.',
      icon: Upload,
      features: ['Sponsored Transactions', 'Zero Gas Fees', 'No Crypto Required', 'Instant Upload & Mint'],
    },
    {
      number: '03',
      title: 'Sovereign & Private',
      subtitle: 'You Own It, You Control It',
      desc: 'Data isn\'t just uploaded—it\'s minted as a dynamic Sui Object (DataPod) and stored on Walrus Protocol. Fully encrypted with AES-256. You retain absolute ownership and can revoke access or resell at will.',
      icon: Shield,
      features: ['Sui Objects (DataPods)', 'Walrus Protocol Storage', 'AES-256 Encryption', 'Full Control & Ownership'],
    },
    {
      number: '04',
      title: 'Instant Monetization',
      subtitle: 'AI-Powered Pricing',
      desc: 'By integrating OpenAI AI for data valuation and metadata tagging, we help you price your data correctly. List via Sui Kiosk and connect with buyers instantly. Automated payments, 24/7 global access.',
      icon: ShoppingCart,
      features: ['OpenAI AI Valuation', 'Smart Pricing', 'Kiosk Listing', 'Automated Payouts'],
    },
  ];

  return (
    <section
      id="features"
      ref={containerRef}
      // BACKGROUND: Light Grey Aluminium (#F0F2F5)
      className="relative w-full bg-[#F0F2F5] pt-32 pb-24 overflow-hidden"
    >
      {/* Background Texture / Ambient Light (Subtle Grey Gradient) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-white blur-[120px] rounded-full pointer-events-none opacity-60" />

      <div className="section-inner relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 lg:px-24">

        {/* Header */}
        <div className="mb-16 sm:mb-20 md:mb-24 lg:mb-28 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl lg:text-8xl xl:text-9xl font-black text-neutral-900 tracking-tighter mb-12 sm:mb-16 leading-tight drop-shadow-sm"
          >
            THE <span className="text-neutral-400">PILLARS</span>
          </motion.h2>
        </div>

        {/* The Monoliths - Alternating Layout */}
        <div className="flex flex-col gap-16 sm:gap-20 md:gap-24 lg:gap-28">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 100,
                scale: 0.85,
                rotateY: index % 2 === 0 ? -15 : 15,
                filter: 'blur(20px)'
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotateY: 0,
                filter: 'blur(0px)'
              }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 1.2,
                type: 'spring',
                stiffness: 80,
                damping: 20,
                delay: index * 0.2
              }}
              className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-32 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Visual Side */}
              <motion.div
                className="w-full lg:w-1/2 relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* CARD BOX dengan animasi */}
                <motion.div
                  className="relative aspect-square sm:aspect-[4/3] overflow-hidden rounded-[3rem] bg-white border border-neutral-300 shadow-xl shadow-neutral-200/50"
                  initial={{ boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  whileInView={{
                    boxShadow: [
                      '0 10px 30px rgba(0,0,0,0.1)',
                      '0 20px 60px rgba(0,0,0,0.2)',
                      '0 10px 30px rgba(0,0,0,0.1)'
                    ]
                  }}
                  transition={{ duration: 2, delay: index * 0.2 }}
                >

                  {/* Particle burst effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 2] }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                  />

                  {/* Spotlight Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Giant Number dengan glitch effect */}
                  <motion.div
                    className="absolute -bottom-20 -right-20 text-[20rem] font-black text-neutral-100 leading-none select-none"
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                    whileHover={{
                      scale: 1.1,
                      textShadow: '2px 2px 0 rgba(0,0,0,0.1), -2px -2px 0 rgba(0,0,0,0.1)',
                      transition: { duration: 0.3 }
                    }}
                  >
                    {pillar.number}
                  </motion.div>

                  {/* Icon Center dengan animasi 3D */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 200,
                      damping: 15,
                      delay: index * 0.2 + 0.5
                    }}
                  >
                    <motion.div
                      className="w-32 h-32 rounded-3xl bg-[#F5F5F5] border border-neutral-200 flex items-center justify-center text-neutral-900 shadow-lg"
                      whileHover={{
                        scale: 1.15,
                        rotate: [0, -5, 5, 0],
                        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <pillar.icon size={64} strokeWidth={1.5} />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2">
                <div className="flex flex-col gap-6 sm:gap-8">
                  <div className="space-y-4 sm:space-y-5">
                    <span className="block text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-neutral-400">
                      {pillar.subtitle}
                    </span>
                    {/* Title Color Fix: Dark Grey/Black */}
                    <h3 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-base sm:text-lg lg:text-xl text-neutral-600 leading-relaxed font-light max-w-xl">
                      {pillar.desc}
                    </p>
                  </div>

                  {/* Separator Line: Metallic Grey */}
                  <div className="h-px w-full bg-neutral-300" />

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {pillar.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 sm:gap-3 text-neutral-700 font-medium">
                        {/* Bullet Point: Black */}
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-900 flex-shrink-0 mt-2" />
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