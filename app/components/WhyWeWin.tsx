'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyWeWin() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  useEffect(() => { 
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.feature-item', {
        scrollTrigger: {
          trigger: '.features-list',
          start: 'top 80%',
        },
        x: -50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      });

      gsap.to('.data-flow', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
        x: 100,
        keyframes: [
          { opacity: 0 },
          { opacity: 1 },
          { opacity: 0 },
        ],
        stagger: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    'Zero crypto knowledge required',
    'No gas fees for users',
    'One-click data monetization',
    'ZKLogin for instant onboarding',
    'Sponsored transactions',
    'Mobile-first experience',
    'Privacy-preserving encryption',
    'Automated Kiosk listings',
    'Real-time earnings tracking',
    'Multi-platform data support',
  ];

  return (
    <section ref={sectionRef} id="about" className="section-padding bg-[#F0F0F0] relative overflow-hidden flex flex-col items-center w-full pt-40 sm:pt-48 md:pt-56 py-16 md:py-24">
      {/* Subtle Background effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#000000] opacity-20 blur-[200px] rounded-full" />
      </div>

      {/* Flowing data animation - Reduced on mobile */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="data-flow absolute w-16 h-16 rounded-lg bg-[#1a1a1a]/5 border border-[#1a1a1a]/10"
            style={{
              left: `${-10 + i * 30}%`,
              top: `${20 + (i % 2) * 40}%`,
            }}
            animate={{
              x: [0, 50, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="section-inner relative z-10 flex flex-col items-center w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start lg:items-center max-w-6xl mx-auto w-full">
          {/* Left Content */}
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#000000] mb-4 md:mb-6 leading-tight">
                10x Better UX
                <br />
                <span className="text-[#4a4a4a]">for Data Producers</span>
              </h2>

              <p className="text-base md:text-lg text-[#5a5a5a] mb-6 md:mb-10 leading-relaxed font-light">
                Combining ZKLogin, Sponsored Tx, Kiosk, and PTB, SourceNet makes onboarding millions of new data producers to Sui effortless.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="relative group bg-black text-white px-10 py-5 rounded-full font-bold text-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 z-0 bg-gradient-to-r from-[#101010] via-[#141414] to-black"
                  animate={isButtonHovered ? { x: [0, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.6, repeat: isButtonHovered ? Infinity : 0 }}
                />
                
                {/* Button content */}
                <div className="relative z-10 flex items-center gap-3 justify-center text-white">
                  <span className="text-white">Start Earning Today</span>
                  <motion.div
                    animate={isButtonHovered ? { x: [0, 8, 0] } : { x: 0 }}
                    transition={{ duration: 0.6, repeat: isButtonHovered ? Infinity : 0 }}
                    className="text-white"
                  >
                    <ArrowRight size={20} className="text-white" />
                  </motion.div>
                </div>

                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 z-20 bg-white/10 pointer-events-none"
                  animate={isButtonHovered ? { x: ['-100%', '100%'] } : { x: '-100%' }}
                  transition={{ duration: 0.8, repeat: isButtonHovered ? Infinity : 0, repeatDelay: 0.3 }}
                />
              </motion.button>
            </motion.div>
          </div>

          {/* Right Content - Features List */}
          <div className="features-list space-y-2 md:space-y-3 w-full">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 12, backgroundColor: '#f5f5f5' }}
                className="feature-item flex items-center gap-4 bg-white border border-[#d0d0d0] rounded-xl p-4 hover:border-[#000000]/30 transition-all group shadow-sm hover:shadow-md"
              >
                <motion.div 
                  className="w-8 h-8 rounded-lg bg-black flex items-center justify-center flex-shrink-0"
                  animate={isButtonHovered ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                >
                  <Check size={18} className="text-white font-bold" strokeWidth={3} />
                </motion.div>
                <span className="text-[#1a1a1a] font-semibold text-sm">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto w-full px-4 md:px-0">
          {[
            { value: '< 30s', label: 'Onboarding Time' },
            { value: '1-Click', label: 'To Sell Data' },
            { value: '0 Fees', label: 'For Users' },
            { value: '100%', label: 'Data Ownership' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group hover:bg-white/50 p-6 rounded-lg transition-all"
            >
              <div className="text-4xl md:text-5xl font-black text-[#000000] mb-3 group-hover:scale-110 transition-transform">{stat.value}</div>
              <div className="text-sm text-[#5a5a5a] font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}