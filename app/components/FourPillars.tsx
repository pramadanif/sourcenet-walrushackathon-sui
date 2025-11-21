'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Zap, Upload, Shield, ShoppingCart } from 'lucide-react';

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const pillarsListVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const pillarCardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
  hover: {
    y: -6,
    scale: 1.02,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const accentMap: Record<string, { text: string; halo: string; ring: string; icon: string }> = {
  "#919191": {
    text: "linear-gradient(135deg, #ffffff 0%, #cfcfcf 100%)",
    halo: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18), rgba(255,255,255,0))",
    ring: "rgba(255,255,255,0.28)",
    icon: "linear-gradient(135deg, rgba(255,255,255,0.55), rgba(180,180,180,0.28))",
  },
  "#474747": {
    text: "linear-gradient(135deg, #f3f3f3 0%, #a7a7a7 100%)",
    halo: "radial-gradient(circle at 80% 20%, rgba(220,220,220,0.2), rgba(220,220,220,0))",
    ring: "rgba(200,200,200,0.24)",
    icon: "linear-gradient(135deg, rgba(230,230,230,0.45), rgba(120,120,120,0.25))",
  },
  "#CECECE": {
    text: "linear-gradient(135deg, #ffffff 0%, #d9d9d9 100%)",
    halo: "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.22), rgba(255,255,255,0))",
    ring: "rgba(255,255,255,0.35)",
    icon: "linear-gradient(135deg, rgba(255,255,255,0.6), rgba(200,200,200,0.3))",
  },
  "#353535": {
    text: "linear-gradient(135deg, #f8f8f8 0%, #b4b4b4 100%)",
    halo: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.18), rgba(255,255,255,0))",
    ring: "rgba(180,180,180,0.26)",
    icon: "linear-gradient(135deg, rgba(255,255,255,0.5), rgba(140,140,140,0.28))",
  },
};

export default function FourPillars() {
  const headingControls = useAnimation();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.55 });

  useEffect(() => {
    if (headingInView) {
      headingControls.start({
        opacity: 1,
        y: 0,
        textShadow: [
          '0 0 0px rgba(255,255,255,0)',
          '0 0 24px rgba(255,255,255,0.85)',
          '0 0 0px rgba(255,255,255,0)'
        ],
        transition: {
          duration: 0.7,
          delay: 0.2,
          textShadow: { duration: 1.6, ease: 'easeInOut' },
        },
      });
    }
  }, [headingControls, headingInView]);

  const pillars = [
    {
      number: '1',
      title: 'Onboarding (ZKLogin)',
      icon: Zap,
      features: [
        'Login with Google via ZKLogin',
        'No wallet or seed phrase needed',
        'Ephemeral wallet auto-created',
      ],
      color: '#919191',
      direction: 'left',
    },
    {
      number: '2',
      title: 'Data Production (Sponsored Tx)',
      icon: Upload,
      features: [
        'Upload data from Google Takeout or Steam',
        'Sponsored Transactions - we pay gas fees',
        'One-click to monetize',
      ],
      color: '#474747',
      direction: 'right',
    },
    {
      number: '3',
      title: 'On-chain Assets (Object + Kiosk)',
      icon: Shield,
      features: [
        'Data minted as Sui Object (DataPod)',
        'Metadata + IPFS hash on-chain',
        'Privacy preserved with encryption',
      ],
      color: '#CECECE',
      direction: 'left',
    },
    {
      number: '4',
      title: 'Instant Marketplace (PTB + Kiosk)',
      icon: ShoppingCart,
      features: [
        'Instant listing via PTB + Kiosk',
        'Automated payments',
        'Global buyer access 24/7',
      ],
      color: '#353535',
      direction: 'right',
    },
  ];

  return (
    <section
      id="features"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#171717] to-[#252525] pt-32 sm:pt-40 md:pt-48 py-20 sm:py-24 md:py-32 lg:py-40 flex flex-col items-center"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1C1C1C] via-[#222222] to-[#2A2A2A]" />

      {/* Subtle Glow Orbs */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#A8A8A8] opacity-25 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#5A5A5A] opacity-2 blur-[150px] rounded-full" />
      </div>

      <div className="section-inner relative z-10 flex flex-col items-center max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto mb-16 sm:mb-20 flex w-full max-w-4xl flex-col items-center gap-5 text-center sm:gap-6"
        >
          <motion.span
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.38em] text-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white/90 shadow-inner shadow-white/30">
              <Zap size={16} />
            </span>
            DATA JOURNEY REIMAGINED
          </motion.span>
          <motion.h2
            ref={headingRef}
            className="w-full text-balance text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 14, textShadow: '0 0 0px rgba(255,255,255,0)' }}
            animate={headingControls}
          >
            <span className="bg-gradient-to-r from-white via-white/85 to-[#d8d8d8] bg-clip-text text-transparent drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
              SourceNet:
            </span>{" "}
            <span className="bg-gradient-to-r from-[#f5f5f5] via-[#dcdcdc] to-[#bfbfbf] bg-clip-text text-transparent">
              Simple, Gasless, Anonymous
            </span>
          </motion.h2>
          <motion.p
            className="max-w-3xl text-pretty text-center text-base text-white/75 sm:text-lg md:text-xl lg:text-[1.35rem]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Empowering every data creator with effortless onboarding, automated monetization, and privacy-first control.
          </motion.p>
        </motion.div>

        <motion.div
          variants={pillarsListVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="pillars-grid mx-auto grid w-full grid-cols-1 gap-8 md:grid-cols-2 max-w-5xl"
        >
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              variants={pillarCardVariants}
              whileHover="hover"
              className="pillar-card group relative h-full"
            >
              <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#474747] bg-[#0A0A0A] p-8 sm:p-12 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-[#919191] hover:shadow-[0_15px_40px_rgba(0,0,0,0.7)]">
                {/* Hover Accent */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{
                  background: `radial-gradient(circle at ${pillar.direction === 'left' ? '25%' : '75%'} 20%, rgba(255,255,255,0.1), transparent 60%)`,
                }} />

                {/* Number & Icon Row */}
                <div className="relative z-10 mb-8 flex items-start justify-between">
                  <div className="text-7xl font-black text-[#E0E0E0] sm:text-8xl">
                    {pillar.number}
                  </div>
                  <div className="pillar-icon flex h-14 w-14 items-center justify-center rounded-2xl bg-[#353535] shadow-inner shadow-[#919191]/20 sm:h-16 sm:w-16 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#474747]">
                    <pillar.icon size={28} className="text-white" />
                  </div>
                </div>

                {/* Title & Features */}
                <div className="relative z-10 flex-1 space-y-6 text-white">
                  <h3 className="text-2xl font-bold !text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] transition-colors duration-300 sm:text-3xl mb-3">
                    {pillar.title}
                  </h3>
                  <ul className="space-y-5">
                    {pillar.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/80" />
                        <span className="text-sm text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)] sm:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Padding Bottom for Smooth Transition */}
        <div className="h-12 sm:h-16 md:h-20 lg:h-24"></div>
      </div>
    </section>
  );
}