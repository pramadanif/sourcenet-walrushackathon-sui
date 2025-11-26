'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, Variants } from 'framer-motion';
import { ArrowRight, Shield, Users, DollarSign, Lock } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// --- OPTIMIZATION 1: Spline Loading Strategy ---
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />,
});

const MemoizedSpline = React.memo(({ scene }: { scene: string }) => (
  <Spline scene={scene} className="pointer-events-auto" />
), (prev, next) => prev.scene === next.scene);
MemoizedSpline.displayName = 'MemoizedSpline';

const getParticleCount = () => {
  if (typeof window === 'undefined') return 8;
  return window.innerWidth < 768 ? 3 : 6;
};

const HERO_PARTICLES = Array.from({ length: getParticleCount() }, (_, i) => ({
  left: `${(12 + i * 17) % 100}%`,
  top: `${(8 + i * 23) % 100}%`,
  amplitude: 40 + (i % 4) * 15,
  duration: 18 + (i % 5),
  delay: (i % 6) * 0.3,
}));

const EASE_CUSTOM = [0.33, 1, 0.68, 1];
const EASE_PREMIUM = [0.43, 0.13, 0.23, 0.96]; // Cubic bezier untuk smooth premium feel

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    }
  }
};

// --- ENHANCED: Character-by-character reveal dengan stagger
const charVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    rotateX: 90,
    filter: "blur(8px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: EASE_PREMIUM
    }
  }
};

// --- ENHANCED: Text reveal dengan gradient mask
const textRevealVariants: Variants = {
  hidden: {
    y: "100%",
    opacity: 0,
    skewY: 10
  },
  visible: {
    y: "0%",
    opacity: 1,
    skewY: 0,
    transition: {
      duration: 1.2,
      ease: EASE_PREMIUM
    }
  }
};

// --- ENHANCED: Subtitle dengan advanced animations
const subtitleContainerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// --- Component untuk render teks per karakter
const AnimatedCharacters: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  return (
    <>
      {text.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          variants={charVariants}
          transition={{
            delay: delay + i * 0.02,
            duration: 0.6,
            ease: EASE_PREMIUM
          }}
          style={{
            display: 'inline-block',
            transformOrigin: 'bottom center',
            perspective: '1000px'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </>
  );
};

// --- Component untuk render subtitle dengan word stagger
const AnimatedSubtitle: React.FC<{ text: string }> = ({ text }) => {
  const words = text.split(' ');

  return (
    <span className="inline-flex flex-wrap gap-1">
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
          transition={{
            duration: 0.5,
            delay: i * 0.05,
            ease: EASE_PREMIUM
          }}
          className="inline-block will-change-transform"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

export default function SplineHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [animationStart, setAnimationStart] = useState(false);

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

  // Magnetic button logic
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
        const maxDist = 100;

        if (dist < maxDist) {
          const strength = (maxDist - dist) / maxDist;
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
    "The first frictionless data marketplace. Monetize your data without crypto headaches.",
    "No wallets, no seed phrases, no gas fees. Just login with Google and start earning.",
    "Your data, encrypted as Sui Objects. Powered by Walrus Protocol and OpenAI.",
    "Making data sovereignty accessible to everyone. Web3 made invisible.",
    "Turn your digital footprint into passive income. Zero technical skills required."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubtitleIndex((prev) => (prev + 1) % subtitles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTimeout(() => setSplineLoaded(true), 1000);
    setAnimationStart(true);
  }, []);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f5f5f5]"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(71, 71, 71, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(71, 71, 71, 0.15) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
      </div>

      {/* Orbs */}
      <motion.div
        className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-[#919191] opacity-5 blur-[80px] rounded-full pointer-events-none will-change-transform"
        style={{ x: smoothMouseX, y: smoothMouseY }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-[#474747] opacity-5 blur-[80px] rounded-full pointer-events-none will-change-transform"
        style={{ x: smoothMouseX, y: smoothMouseY }}
      />

      {/* Spline Container */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: splineLoaded ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          className="w-full h-full"
        >
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
            className="relative space-y-6 sm:space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={animationStart ? "visible" : "hidden"}
          >
            <div className="relative z-10 space-y-6 sm:space-y-8">
              {/* Badge - Enhanced */}
              <motion.div
                variants={fadeUpVariants}
                className="inline-block"
              >
                <motion.div
                  className="px-4 py-2 bg-white/95 border border-[#3D3D3D]/30 rounded-full text-[#2A2A2A] text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2 shadow-lg will-change-transform"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 30px rgba(0,0,0,0.15)',
                    borderColor: 'rgba(42, 42, 42, 0.5)'
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </motion.div>
                  Web3 Frictionless Data Marketplace
                </motion.div>
              </motion.div>

              {/* Main Title - Character by Character */}
              <div className="space-y-1">
                <div className="overflow-hidden">
                  <motion.h1
                    className="font-bold tracking-tight text-[#0A0A0A] leading-[1.1] will-change-transform"
                    style={{
                      fontSize: 'clamp(3rem, 8vw, 5rem)',
                      textShadow: '0 0 20px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.7)',
                      perspective: '1200px'
                    }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 }
                    }}
                    initial="hidden"
                    animate={animationStart ? "visible" : "hidden"}
                  >
                    <motion.div
                      className="overflow-hidden"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 }
                      }}
                      initial="hidden"
                      animate={animationStart ? "visible" : "hidden"}
                    >
                      {animationStart && <AnimatedCharacters text="SourceNet" delay={0.3} />}
                    </motion.div>
                  </motion.h1>
                </div>

                {/* Subtitle Line 1 */}
                <div className="overflow-hidden pt-2">
                  <motion.div
                    className="text-[#1A1A1A] font-bold leading-tight will-change-transform"
                    style={{
                      fontSize: 'clamp(1.1rem, 4vw, 1.5rem)',
                      textShadow: '0 0 15px rgba(255,255,255,0.9), 0 0 30px rgba(255,255,255,0.7)',
                    }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 }
                    }}
                    initial="hidden"
                    animate={animationStart ? "visible" : "hidden"}
                  >
                    <motion.div
                      className="overflow-hidden"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 }
                      }}
                      initial="hidden"
                      animate={animationStart ? "visible" : "hidden"}
                    >
                      {animationStart && <AnimatedCharacters text="Own & Monetize" delay={0.5} />}
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="text-[#1A1A1A] font-bold leading-tight will-change-transform"
                    style={{
                      fontSize: 'clamp(1.1rem, 4vw, 1.5rem)',
                      textShadow: '0 0 15px rgba(255,255,255,0.9), 0 0 30px rgba(255,255,255,0.7)',
                    }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 }
                    }}
                    initial="hidden"
                    animate={animationStart ? "visible" : "hidden"}
                  >
                    <motion.div
                      className="overflow-hidden"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 }
                      }}
                      initial="hidden"
                      animate={animationStart ? "visible" : "hidden"}
                    >
                      {animationStart && <AnimatedCharacters text="Your Personal Data" delay={1.2} />}
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* Dynamic Subtitle - Enhanced */}
              <motion.div
                variants={subtitleContainerVariants}
                className="relative min-h-[60px] sm:min-h-[72px] overflow-hidden max-w-xl"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSubtitleIndex}
                    initial={{ y: 40, opacity: 0, rotateX: -90, filter: "blur(10px)" }}
                    animate={{ y: 0, opacity: 1, rotateX: 0, filter: "blur(0px)" }}
                    exit={{ y: -40, opacity: 0, rotateX: 90, filter: "blur(10px)" }}
                    transition={{
                      duration: 0.6,
                      ease: EASE_PREMIUM
                    }}
                    className="absolute top-0 left-0"
                    style={{
                      perspective: '1200px',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <div
                      className="font-semibold text-[#2A2A2A] leading-relaxed will-change-transform"
                      style={{
                        fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                        textShadow: '0 0 10px rgba(255,255,255,0.9), 0 0 20px rgba(255,255,255,0.7)'
                      }}
                    >
                      <AnimatedSubtitle text={subtitles[currentSubtitleIndex]} />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeUpVariants}
                className="flex flex-col sm:flex-row gap-4 pt-2"
              >
                <Link href="https://sourcenet-fe.vercel.app/" passHref>
                  <motion.button
                    ref={buttonRef}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    className="group relative bg-[#2A2A2A] text-white px-8 py-5 sm:px-9 sm:py-5 rounded-full font-bold text-base sm:text-lg flex items-center justify-center gap-3 transition-all overflow-hidden shadow-xl will-change-transform"
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%' }}
                      animate={{ x: isHovered ? '100%' : '-100%' }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
                      animate={{
                        x: isHovered ? ['-100%', '100%'] : '-100%'
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: isHovered ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    />
                    <span className="relative z-10 text-white">Launch App</span>
                    <motion.div
                      animate={{ x: isHovered ? 5 : 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <ArrowRight className="text-white" size={20} />
                    </motion.div>
                  </motion.button>
                </Link>
              </motion.div>

              {/* Trust Badges - Enhanced */}
              <motion.div
                variants={fadeUpVariants}
                className="pt-6 flex flex-wrap gap-4 sm:gap-6"
              >
                {[
                  { icon: Lock, label: "End-to-end encrypted" },
                  { icon: DollarSign, label: "Instant payouts" },
                  { icon: Users, label: "No-code required" }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-2 text-sm font-semibold text-white will-change-transform"
                    style={{
                      textShadow: '0 0 20px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.6), 0 2px 8px rgba(255,255,255,0.8)'
                    }}
                    whileHover={{
                      scale: 1.08,
                      x: 5
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                        y: [0, -2, 2, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut"
                      }}
                    >
                      <item.icon
                        size={14}
                        className="text-white"
                        style={{
                          filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.9)) drop-shadow(0 0 16px rgba(255,255,255,0.6))'
                        }}
                      />
                    </motion.div>
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1, duration: 0.4 }}
                    >
                      {item.label}
                    </motion.span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right Spacer */}
          <div className="relative min-h-[400px] lg:min-h-[600px] pointer-events-none" />
        </div>
      </div>
    </motion.section>
  );
}