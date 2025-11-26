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
      title: 'Onboarding',
      subtitle: 'Zero Friction Entry',
      desc: 'Forget complicated wallets and seed phrases forever. Simply login with your Google account via ZKLogin technology. An ephemeral wallet is created instantly in the background, ready to use.',
      icon: Zap,
      features: ['Google OAuth Login', 'No Seed Phrases Required', 'Instant Wallet Setup', 'ZKLogin Technology'],
    },
    {
      number: '02',
      title: 'Production',
      subtitle: 'Zero Cost Upload',
      desc: 'Upload your data directly from your digital life with just a few clicks. We sponsor all the gas fees, so you never have to buy crypto or worry about transaction costs to start earning.',
      icon: Upload,
      features: ['Sponsored Transactions', 'Gasless Operations', 'One-Click Upload', 'Free to Start'],
    },
    {
      number: '03',
      title: 'Ownership',
      subtitle: 'Encrypted & Minted On-Chain',
      desc: 'Your data is minted as a unique Sui Object called a DataPod. It lives permanently on-chain, fully encrypted with AES-256, and completely under your control. You own it, you control it.',
      icon: Shield,
      features: ['Sui Objects (DataPods)', 'IPFS & Walrus Storage', 'AES-256 Encryption', 'Full Ownership'],
    },
    {
      number: '04',
      title: 'Marketplace',
      subtitle: 'Global Access 24/7',
      desc: 'List your DataPod instantly via Sui Kiosk protocol. Buyers from around the world can discover and purchase access to your data 24/7 with automated smart contract payments and instant delivery.',
      icon: ShoppingCart,
      features: ['Kiosk Listing Protocol', 'Automated Payouts', '24/7 Global Trading', 'Smart Contract Escrow'],
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
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-32 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Visual Side */}
              <div className="w-full lg:w-1/2 relative group">
                {/* CARD BOX: White background with metallic border */}
                <div className="relative aspect-square sm:aspect-[4/3] overflow-hidden rounded-[3rem] bg-white border border-neutral-300 shadow-xl shadow-neutral-200/50">

                  {/* Spotlight Effect (Darker on hover) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Giant Number (Watermark style) */}
                  <div className="absolute -bottom-20 -right-20 text-[20rem] font-black text-neutral-100 leading-none select-none transition-transform duration-1000 group-hover:scale-110 group-hover:text-neutral-200">
                    {pillar.number}
                  </div>

                  {/* Icon Center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-3xl bg-[#F5F5F5] border border-neutral-200 flex items-center justify-center text-neutral-900 shadow-lg group-hover:scale-110 transition-transform duration-500">
                      <pillar.icon size={64} strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </div>

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

      {/* === FORCE SPACING HACK === */}
      {/* Ini adalah 'blank text' block yang diminta untuk memaksa jarak bawah */}
      <div className="w-full h-48 md:h-64 flex items-center justify-center select-none pointer-events-none opacity-0" aria-hidden="true">
        SPACER BLOCK - DO NOT REMOVE
      </div>

    </section>
  );
}