'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Shield, Users, DollarSign, Lock } from 'lucide-react';
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

const HERO_PARTICLES = Array.from({ length: 15 }, (_, i) => ({
  left: `${(12 + i * 17) % 100}%`,
  top: `${(8 + i * 23) % 100}%`,
  amplitude: 40 + (i % 4) * 15,
  duration: 18 + (i % 5),
  delay: (i % 6) * 0.3,
}));

export default function SplineHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  // Smooth mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 40, stiffness: 80 });
  const smoothMouseY = useSpring(mouseY, { damping: 40, stiffness: 80 });

  // Scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Removed fade animation - keeping section static when scrolling
  const opacity = 1;
  const scale = 1;

  // Track mouse for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x * 20);
        mouseY.set(y * 20);
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Magnetic button effect
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = 150;
      
      if (distance < maxDistance) {
        const strength = (maxDistance - distance) / maxDistance;
        button.style.transform = `translate(${x * strength * 0.3}px, ${y * strength * 0.3}px)`;
      } else {
        button.style.transform = 'translate(0, 0)';
      }
    };

    const handleMouseLeave = () => {
      if (button) button.style.transform = 'translate(0, 0)';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // ✅ Dynamic Subtitle Logic
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);

  const subtitles = [
    "Sell your Web2 data anonymously, without gas, directly from Google or Steam accounts.",
    "Monetize your digital footprint — no blockchain required.",
    "Your data. Your rules. Your earnings. Instantly.",
    "Turn browsing history into passive income — securely and privately.",
    "The easiest way to profit from your online activity — zero technical skills needed."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubtitleIndex((prev) => (prev + 1) % subtitles.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section 
      ref={containerRef}
      style={{ opacity, scale }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f5f5f5]"
    >
      {/* Subtle Animated Grid */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(71, 71, 71, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(71, 71, 71, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Elegant Gradient Orbs with Mouse Tracking */}
      <motion.div 
        className="absolute top-1/4 -left-1/4 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-[#919191] opacity-5 blur-[100px] sm:blur-[140px] rounded-full"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-1/4 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-[#474747] opacity-5 blur-[100px] sm:blur-[140px] rounded-full"
        animate={{
          scale: [1.05, 1, 1.05],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
        }}
      />

      {/* ✅ Spline 3D Background */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="w-full h-full"
        >
          <div className="relative w-full h-full">
            <Spline 
              scene="https://prod.spline.design/hw1emnNezRQpqBrW/scene.splinecode  " 
              className="pointer-events-auto"
            />
          </div>
        </motion.div>
      </div>

      {/* Subtle Floating Particles */}
      {HERO_PARTICLES.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#474747] rounded-full opacity-10"
          style={{ left: particle.left, top: particle.top }}
          animate={{
            y: [0, -particle.amplitude, 0],
            opacity: [0.05, 0.2, 0.05],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      {/* ✅ Konten Utama */}
      <div className="section-inner py-16 sm:py-24 relative z-30">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <motion.div 
            className="space-y-6 sm:space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <span className="px-4 py-2 bg-white/60 border border-[#474747]/20 rounded-full text-[#353535] text-xs sm:text-sm font-semibold backdrop-blur-md flex items-center gap-1.5 sm:gap-2 inline-flex">
                  <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Web3 Frictionless Data Marketplace
                </span>
              </motion.div>
            </motion.div>

            {/* Main Title — Cohesive unit */}
            <div className="space-y-2">
              <motion.h1 
                className="font-bold tracking-tight text-[#353535] leading-[1.1]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                style={{
                  fontSize: 'clamp(2rem, 8vw, 4rem)',
                }}
              >
                <motion.span 
                  className="block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                >
                  <span className="font-black">SourceNet</span>
                </motion.span>
                <motion.span 
                  className="block mt-2 text-[#474747] font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                  style={{ fontSize: 'clamp(1.1rem, 4vw, 1.5rem)' }}
                >
                  Own & Monetize Your Personal Data
                </motion.span>
              </motion.h1>
            </div>

            {/* Dynamic Subtitle */}
            <motion.div 
              className="space-y-4 max-w-xl pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentSubtitleIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ 
                    duration: 0.6,
                    ease: "easeOut"
                  }}
                  className="font-medium text-[#474747] leading-relaxed"
                  style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)' }}
                >
                  {subtitles[currentSubtitleIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* ✅ CTA Button - Launch App */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
            >
              <motion.button
                ref={buttonRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="group relative bg-[#353535] text-white px-7 py-4 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg flex items-center justify-center gap-3 transition-all overflow-hidden shadow-lg"
                style={{
                  boxShadow: '0 4px 20px rgba(53, 53, 53, 0.3)',
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{
                    x: isHovered ? ['-200%', '200%'] : '-200%',
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: isHovered ? Infinity : 0,
                    ease: 'linear',
                  }}
                />
                <span className="relative z-10 font-semibold text-white">Launch App</span>
                <motion.div
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  <ArrowRight className="text-white" size={20} />
                </motion.div>
              </motion.button>
            </motion.div>

            {/* Social Proof & Trust Indicators */}
            <motion.div 
              className="pt-6 sm:pt-8 space-y-4 sm:space-y-5"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.9 }}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        delay: 2.0 + i * 0.08,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ 
                        scale: 1.15, 
                        zIndex: 10,
                        transition: { duration: 0.2 }
                      }}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#353535] to-[#919191] border-2 border-[#CECECE] cursor-pointer"
                    />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#474747]/80">
                  <span className="text-[#353535] font-semibold">10K+</span> data producers already joined
                </p>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-[#474747]/70">
                  <Lock size={12} className="text-[#353535]" />
                  End-to-end encrypted
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-[#474747]/70">
                  <DollarSign size={12} className="text-[#353535]" />
                  Instant payouts
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-[#474747]/70">
                  <Users size={12} className="text-[#353535]" />
                  Zero technical skills
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Spacer for Spline visibility */}
          <motion.div 
            className="relative min-h-[500px] flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            {/* Placeholder untuk Spline */}
          </motion.div>
        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-5 h-9 border-2 border-[#474747]/30 rounded-full flex justify-center pt-1.5">
            <motion.div 
              className="w-1 h-3 bg-[#474747]/60 rounded-full"
              animate={{ 
                y: [0, 10, 0],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}