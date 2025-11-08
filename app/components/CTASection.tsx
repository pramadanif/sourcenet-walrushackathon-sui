'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Apple, PlaySquare, ArrowRight, Smartphone } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (phoneRef.current) {
        gsap.from(phoneRef.current, {
          scrollTrigger: {
            trigger: phoneRef.current,
            start: 'top 80%',
          },
          x: -100,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        });

        gsap.to(phoneRef.current, {
          y: -15,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Subtle background network animation
      gsap.to('.network-node', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
        y: -50,
        keyframes: [
          { opacity: 0.2 },
          { opacity: 0.5 },
          { opacity: 0.2 },
        ],
        stagger: 0.1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-to-b from-[#FAF8F1] to-white relative overflow-hidden flex flex-col items-center w-full">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#919191] opacity-40 blur-[200px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#474747] opacity-20 blur-[200px] rounded-full" />
      </div>

      {/* Subtle 3D network animation background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="network-node absolute w-2 h-2 bg-[#474747]/30 rounded-full"
            style={{
              left: `${10 + i * 8}%`,
              top: `${15 + (i % 4) * 20}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="section-inner relative z-10 flex flex-col items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto w-full">
          {/* Left - Phone Mockup */}
          <div className="relative flex justify-center lg:justify-start order-2 lg:order-1">
            <div ref={phoneRef} className="relative">
              {/* Phone Frame */}
              <div className="relative w-[280px] h-[560px] bg-gradient-to-br from-[#2f2f2f] to-[#1a1a1a] rounded-[2.5rem] p-3 shadow-2xl border border-[#2f2f2f]">
                <div className="w-full h-full bg-gradient-to-b from-[#FAF8F1] to-white rounded-[2rem] overflow-hidden">
                  {/* Phone Screen Content */}
                  <div className="p-6 space-y-6">
                    {/* Header */}
                    <div className="text-center pt-4">
                      <h3 className="text-[#1a1a1a] font-black text-2xl mb-2">Your Portfolio</h3>
                      <p className="text-[#4f4f4f] text-sm">Total Earnings</p>
                    </div>

                    {/* Balance */}
                    <div className="bg-gradient-to-br from-[#2f2f2f] to-[#1a1a1a] p-6 rounded-2xl text-center">
                      <p className="text-[#FAF8F1] text-5xl font-black mb-2">$4,892</p>
                      <p className="text-[#FAF8F1]/70 text-sm font-medium">+$247 this week</p>
                    </div>

                    {/* Data Categories */}
                    <div className="space-y-3">
                      <div className="bg-white border border-[#2e2e2e]/20 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[#1a1a1a] font-semibold">Browsing Data</span>
                          <span className="text-[#2f2f2f] font-bold">$1,847</span>
                        </div>
                        <div className="w-full bg-[#e8e8e8] rounded-full h-2">
                          <div className="bg-[#2f2f2f] h-2 rounded-full" style={{ width: '75%' }} />
                        </div>
                      </div>

                      <div className="bg-white border border-[#2e2e2e]/20 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[#1a1a1a] font-semibold">Gaming History</span>
                          <span className="text-[#2f2f2f] font-bold">$1,523</span>
                        </div>
                        <div className="w-full bg-[#e8e8e8] rounded-full h-2">
                          <div className="bg-[#6f6f6f] h-2 rounded-full" style={{ width: '60%' }} />
                        </div>
                      </div>

                      <div className="bg-white border border-[#2e2e2e]/20 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[#1a1a1a] font-semibold">Social Media</span>
                          <span className="text-[#2f2f2f] font-bold">$1,522</span>
                        </div>
                        <div className="w-full bg-[#e8e8e8] rounded-full h-2">
                          <div className="bg-[#4f4f4f] h-2 rounded-full" style={{ width: '55%' }} />
                        </div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full bg-[#2f2f2f] text-[#FAF8F1] py-3 rounded-xl font-bold hover:bg-[#1a1a1a] transition-colors">
                      Withdraw Earnings
                    </button>
                  </div>
                </div>

                {/* Phone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#1a1a1a] rounded-b-2xl" />
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-[#919191] opacity-30 blur-3xl -z-10" />
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 bg-[#919191]/20 border border-[#4b4b4b]/30 rounded-full text-[#353535] text-sm font-medium">
                🚀 Get Started Today
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1a1a1a] mb-6">
              Start Selling
              <br />
              <span className="text-[#2f2f2f]">Your Data Today</span>
            </h2>

            <p className="text-xl text-[#4f4f4f] mb-8 leading-relaxed">
              Join thousands of data producers earning passive income. No wallets, no gas fees, no complexity.
            </p>

            <div className="space-y-4 mb-8">
              {[
                'Sign up in under 30 seconds',
                'Connect your data sources',
                'Start earning immediately',
                'Track earnings in real-time',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-[#2f2f2f] flex items-center justify-center flex-shrink-0">
                    <ArrowRight size={14} className="text-[#FAF8F1]" />
                  </div>
                  <span className="text-[#1a1a1a] font-medium">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#2f2f2f] to-[#1a1a1a] text-[#FAF8F1] px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl"
                style={{ boxShadow: '0 8px 24px rgba(47, 47, 47, 0.4)' }}
              >
                Get Early Access
                <ArrowRight size={20} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-3 bg-transparent border-2 border-[#2f2f2f] text-[#2f2f2f] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#2f2f2f] hover:text-[#FAF8F1] transition-all hover:shadow-lg"
              >
                Join Waitlist
              </motion.button>
            </div>

            <p className="text-[#6f6f6f] text-sm mt-6">
              <Smartphone className="inline mr-2" size={16} />
              No credit card required. Start earning in under 30 seconds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}