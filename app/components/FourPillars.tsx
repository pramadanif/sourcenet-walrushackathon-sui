'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Upload, Shield, ShoppingCart } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FourPillars() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate pillars sliding in from alternating directions
      gsap.utils.toArray('.pillar-card').forEach((card: any, index) => {
        const direction = index % 2 === 0 ? -100 : 100;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
          },
          x: direction,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        });
      });

      // Animate 3D icon rotation on scroll
      gsap.from('.pillar-icon', {
        scrollTrigger: {
          trigger: '.pillars-grid',
          start: 'top 70%',
        },
        rotation: 360,
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
      color: 'from-[#34656D] to-[#334443]',
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
      color: 'from-[#FAEAB1] to-[#FAF8F1]',
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
      color: 'from-[#34656D] to-[#334443]',
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
      color: 'from-[#FAEAB1] to-[#FAF8F1]',
      direction: 'right',
    },
  ];

  return (
    <section ref={sectionRef} id="features" className="section-padding bg-gradient-to-b from-white to-[#FAF8F1] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FAEAB1] opacity-40 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#34656D] opacity-20 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 bg-[#FAEAB1]/30 border border-[#34656D]/30 rounded-full text-[#34656D] text-sm font-medium">
              ✨ Our Solution
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#34656D] mb-6">
            SourceNet: Simple, Gasless, <span className="text-[#334443]">Anonymous</span>
          </h2>
          <p className="text-xl text-[#334443]/80 max-w-3xl mx-auto">
            Four feature blocks that make data monetization effortless.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="pillars-grid grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="pillar-card group relative"
            >
              <div className="relative bg-white border border-[#34656D]/20 rounded-3xl p-8 h-full hover:border-[#34656D]/50 transition-all overflow-hidden shadow-lg">
                {/* Background gradient */}
                <motion.div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${pillar.color} opacity-20 blur-3xl`}
                  whileHover={{ scale: 1.5, opacity: 0.4 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Ripple effect on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-10`}
                  initial={false}
                  whileHover={{
                    scale: [1, 1.05, 1],
                    opacity: [0, 0.1, 0],
                  }}
                  transition={{ duration: 0.6 }}
                />

                <div className="relative z-10">
                  {/* Number */}
                  <div className="flex items-start justify-between mb-6">
                    <motion.div
                      className={`text-8xl font-black bg-gradient-to-br ${pillar.color} bg-clip-text text-transparent`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {pillar.number}
                    </motion.div>
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                      className={`pillar-icon w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center shadow-lg`}
                    >
                      <pillar.icon size={32} className={index % 2 === 0 ? "text-white" : "text-[#34656D]"} />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-[#34656D] group-hover:text-[#334443] transition-all">
                      {pillar.title}
                    </h3>
                    <ul className="space-y-3">
                      {pillar.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + i * 0.05 }}
                          whileHover={{ x: 5 }}
                        >
                          <motion.div
                            className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${pillar.color} mt-2 flex-shrink-0`}
                            whileHover={{ scale: 2 }}
                          />
                          <span className="text-[#334443]/70 group-hover:text-[#334443] transition-colors">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}