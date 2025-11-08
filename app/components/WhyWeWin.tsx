'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyWeWin() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate feature items
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

      // Flowing data animation synced with scroll
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
    <section ref={sectionRef} id="about" className="section-padding bg-[#FAF8F1] relative overflow-hidden flex flex-col items-center w-full">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#919191] opacity-30 blur-[200px] rounded-full" />
      </div>

      {/* Flowing data animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="data-flow absolute w-16 h-16 rounded-lg bg-[#474747]/10 border border-[#474747]/20"
            style={{
              left: `${-10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              x: [0, 50, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="section-inner relative z-10 flex flex-col items-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto w-full">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 bg-[#919191]/20 border border-[#4b4b4b]/30 rounded-full text-[#353535] text-sm font-medium">
                🏆 Why SourceNet Wins
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1a1a1a] mb-6">
              10x Better UX
              <br />
              <span className="text-[#2f2f2f]">for Data Producers</span>
            </h2>

            <p className="text-xl text-[#4f4f4f] mb-8 leading-relaxed">
              Combining ZKLogin, Sponsored Tx, Kiosk, and PTB, SourceNet makes onboarding millions of new data producers to Sui effortless.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#2f2f2f] text-[#FAF8F1] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#1a1a1a] transition-all shadow-lg"
            >
              Start Earning Today
            </motion.button>
          </div>

          {/* Right Content - Features List */}
          <div className="features-list space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 10 }}
                className="feature-item flex items-center gap-4 bg-white border border-[#2e2e2e]/20 rounded-xl p-4 hover:border-[#2e2e2e]/50 transition-all group shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-[#2f2f2f] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Check size={20} className="text-[#FAF8F1] font-bold" />
                </div>
                <span className="text-[#1a1a1a] font-semibold">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
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
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-black text-[#2f2f2f] mb-2">{stat.value}</div>
              <div className="text-sm text-[#4f4f4f]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}