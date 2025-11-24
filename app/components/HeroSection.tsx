'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, Variants } from 'framer-motion';
import { ArrowRight, Shield, Users, DollarSign, Lock } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// --- OPTIMIZATION 1: Spline Loading Strategy ---
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />, // Ringan saat loading
});

// Memoized Spline yang BENAR-BENAR Strict
// Kita pastikan dia tidak re-render sama sekali kecuali URL scene berubah
const MemoizedSpline = React.memo(({ scene }: { scene: string }) => (
  <Spline scene={scene} className="pointer-events-auto" />
), (prev, next) => prev.scene === next.scene);
MemoizedSpline.displayName = 'MemoizedSpline';

const getParticleCount = () => {
  if (typeof window === 'undefined') return 8;
  // Kurangi partikel di mobile biar GPU napas
  return window.innerWidth < 768 ? 3 : 6;
};

const HERO_PARTICLES = Array.from({ length: getParticleCount() }, (_, i) => ({
  left: `${(12 + i * 17) % 100}%`,
  top: `${(8 + i * 23) % 100}%`,
  amplitude: 40 + (i % 4) * 15,
  duration: 18 + (i % 5),
  delay: (i % 6) * 0.3,
}));

// --- OPTIMIZATION 2: Sederhanakan Animasi ---
// Hapus 'blur' filter karena itu musuh utama performa di atas WebGL
const EASE_CUSTOM = [0.33, 1, 0.68, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Percepat sedikit
      delayChildren: 0.2,
    }
  }
};

const textRevealVariants: Variants = {
  hidden: { y: "100%", opacity: 0 }, // Hapus rotateX, berat di komposit
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 1.0,
      ease: EASE_CUSTOM
    }
  }
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" } // Pakai standard ease biar ringan
  }
};

export default function SplineHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);

  // Mouse logic tetap sama, ini sudah efisien karena pakai useSpring (bypass React render)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 40, stiffness: 80 });
  const smoothMouseY = useSpring(mouseY, { damping: 40, stiffness: 80 });
  const mouseEventTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x * 20);
      mouseY.set(y * 20);
    }
  }, [mouseX, mouseY]);

  useEffect(() => {
    // Throttle event listener ke ~60fps (16ms)
    const debouncedMouseMove = (e: MouseEvent) => {
      if (mouseEventTimeoutRef.current) clearTimeout(mouseEventTimeoutRef.current);
      mouseEventTimeoutRef.current = setTimeout(() => handleMouseMove(e), 16);
    };
    window.addEventListener('mousemove', debouncedMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', debouncedMouseMove);
      if (mouseEventTimeoutRef.current) clearTimeout(mouseEventTimeoutRef.current);
    };
  }, [handleMouseMove]);

  // Magnetic button logic (Optimized with cancelAnimationFrame)
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;
    let rafId: number | null = null;

    const handleMouseMoveBtn = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const dist = Math.sqrt(x * x + y * y);
        const maxDist = 100; // Kurangi radius deteksi biar gak sering trigger

        if (dist < maxDist) {
          const strength = (maxDist - dist) / maxDist;
          // Gunakan translate3d untuk memaksa GPU rendering
          button.style.transform = `translate3d(${x * strength * 0.3}px, ${y * strength * 0.3}px, 0)`;
        } else {
          button.style.transform = 'translate3d(0, 0, 0)';
        }
      });
    };

    const handleMouseLeaveBtn = () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (button) button.style.transform = 'translate3d(0, 0, 0)';
    };

    window.addEventListener('mousemove', handleMouseMoveBtn, { passive: true });
    button.addEventListener('mouseleave', handleMouseLeaveBtn);
    return () => {
      window.removeEventListener('mousemove', handleMouseMoveBtn);
      button.removeEventListener('mouseleave', handleMouseLeaveBtn);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);
  const subtitles = [
    "Sell your Web2 data anonymously, without gas.",
    "Monetize your digital footprint — no blockchain required.",
    "Your data. Your rules. Your earnings. Instantly.",
    "Turn browsing history into passive income securely.",
    "Profit from online activity — zero technical skills."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubtitleIndex((prev) => (prev + 1) % subtitles.length);
    }, 5000); // Perpanjang durasi biar gak sering ganti (re-paint)
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Lazy load logic
    setTimeout(() => setSplineLoaded(true), 1000);
  }, []);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f5f5f5]"
    >
      {/* Background Grid - Static is better for perf */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(71, 71, 71, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(71, 71, 71, 0.15) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
      </div>

      {/* Orbs - Reduce blur amount or opacity if still laggy */}
      <motion.div
        className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-[#919191] opacity-5 blur-[80px] rounded-full pointer-events-none will-change-transform"
        style={{ x: smoothMouseX, y: smoothMouseY }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-[#474747] opacity-5 blur-[80px] rounded-full pointer-events-none will-change-transform"
        style={{ x: smoothMouseX, y: smoothMouseY }}
      />

      {/* Spline Container - Isolated */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: splineLoaded ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          className="w-full h-full"
        >
          {/* Tambahkan will-change pada container wrapper spline */}
          <div className="relative w-full h-full pointer-events-auto will-change-transform">
            {splineLoaded && (
              <MemoizedSpline scene="https://prod.spline.design/9NmsWPnV9H3h3V0B/scene.splinecode" />
            )}
          </div>
        </motion.div>
      </div>

      <div className="section-inner py-16 sm:py-24 relative z-30 w-full max-w-7xl px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            className="space-y-6 sm:space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge - Removed backdrop-blur if it overlaps 3D heavily */}
            <motion.div variants={fadeUpVariants} className="inline-block">
              <div className="px-4 py-2 bg-white/80 border border-[#3D3D3D]/20 rounded-full text-[#2A2A2A] text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Web3 Frictionless Data Marketplace
              </div>
            </motion.div>

            {/* Main Title - Optimized Masked Reveal */}
            <div className="space-y-1">
              <div className="overflow-hidden">
                <motion.h1
                  variants={textRevealVariants}
                  // will-change membantu browser menyiapkan layer
                  className="font-bold tracking-tight text-[#2A2A2A] leading-[1.1] will-change-transform"
                  style={{ fontSize: 'clamp(3rem, 8vw, 5rem)' }}
                >
                  SourceNet
                </motion.h1>
              </div>

              <div className="overflow-hidden pt-2">
                <motion.p
                  variants={textRevealVariants}
                  className="text-[#3D3D3D] font-medium leading-tight will-change-transform"
                  style={{ fontSize: 'clamp(1.1rem, 4vw, 1.5rem)' }}
                >
                  Own & Monetize Your Personal Data
                </motion.p>
              </div>
            </div>

            {/* Dynamic Subtitle - REMOVED BLUR EFFECT FOR PERFORMANCE */}
            <motion.div
              variants={fadeUpVariants}
              className="relative h-[60px] sm:h-[72px] overflow-hidden max-w-xl"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentSubtitleIndex}
                  // Hapus filter blur di sini!
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                  className="absolute top-0 left-0 font-medium text-[#555555] leading-relaxed will-change-transform"
                  style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)' }}
                >
                  {subtitles[currentSubtitleIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Link href="http://localhost:3000" passHref>
                <motion.button
                  ref={buttonRef}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  className="group relative bg-[#2A2A2A] text-white px-8 py-5 sm:px-9 sm:py-5 rounded-full font-bold text-base sm:text-lg flex items-center justify-center gap-3 transition-all overflow-hidden shadow-xl"
                >
                  {/* Simplified hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    animate={{ x: isHovered ? '100%' : '-100%' }}
                    transition={{ duration: 0.4 }}
                  />
                  {/* FIXED: Added text-white explicitly */}
                  <span className="relative z-10 text-white">Launch App</span>
                  <motion.div
                    animate={{ x: isHovered ? 5 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="text-white" size={20} />
                  </motion.div>
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={fadeUpVariants}
              className="pt-6 flex flex-wrap gap-4 sm:gap-6"
            >
              {[
                { icon: Lock, label: "End-to-end encrypted" },
                { icon: DollarSign, label: "Instant payouts" },
                { icon: Users, label: "No-code required" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm font-medium text-[#666]">
                  <item.icon size={14} className="text-[#2A2A2A]" />
                  {item.label}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Spacer */}
          <div className="relative min-h-[400px] lg:min-h-[600px] pointer-events-none" />
        </div>
      </div>
    </motion.section>
  );
}