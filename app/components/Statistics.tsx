'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Briefcase, DollarSign, ShoppingBag, Smile } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Statistics() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Counter animation
      const counters = document.querySelectorAll('.counter-value');
      
      ScrollTrigger.create({
        trigger: '.stats-grid',
        start: 'top 80%',
        onEnter: () => {
          if (!hasAnimated) {
            counters.forEach((counter) => {
              const target = counter.getAttribute('data-target');
              const element = counter as HTMLElement;
              
              if (target) {
                const isPercentage = target.includes('%');
                const isDollar = target.includes('$');
                const isK = target.includes('K');
                const isM = target.includes('M');
                
                let numericValue = parseFloat(target.replace(/[^0-9.]/g, ''));
                
                gsap.to({ val: 0 }, {
                  val: numericValue,
                  duration: 2,
                  ease: 'power2.out',
                  onUpdate: function() {
                    let current = Math.floor(this.targets()[0].val);
                    let display = current.toString();
                    
                    if (isDollar) display = '$' + display;
                    if (isK) display += 'K+';
                    if (isM) display += 'M+';
                    if (isPercentage) display += '%';
                    
                    element.textContent = display;
                  }
                });
              }
            });
            setHasAnimated(true);
          }
        },
      });

      gsap.from('.stat-card', {
        scrollTrigger: {
          trigger: '.stats-grid',
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [hasAnimated]);

  const stats = [
    {
      icon: Users,
      value: '100K+',
      label: 'Targeting Early Adopters',
      color: 'from-[#CDFF00] to-yellow-300',
    },
    {
      icon: Briefcase,
      value: '$500M+',
      label: 'Potential Market',
      color: 'from-blue-500 to-cyan-400',
    },
    {
      icon: DollarSign,
      value: '$2B+',
      label: 'Untapped Data Value',
      color: 'from-green-500 to-emerald-400',
    },
    {
      icon: ShoppingBag,
      value: '30+',
      label: 'Data Categories',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Smile,
      value: '97%',
      label: 'User Satisfaction (Projected)',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section ref={sectionRef} className="section-padding bg-[#1A1A1A] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#CDFF00] opacity-20 blur-[200px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 bg-[#CDFF00]/10 border border-[#CDFF00]/30 rounded-full text-[#CDFF00] text-sm font-medium">
              📈 By The Numbers
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            ACHIEVEMENTS & <span className="text-[#CDFF00]">PROJECTIONS</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Join the revolution. Be part of the data ownership movement.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10, scale: 1.05 }}
              className="stat-card group"
            >
              <div className="bg-[#0A0A0A] border border-gray-800 rounded-2xl p-6 text-center hover:border-gray-700 transition-all h-full">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <stat.icon size={28} className="text-white" />
                </div>
                <div 
                  className={`counter-value text-3xl md:text-4xl font-black bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-2`}
                  data-target={stat.value}
                >
                  0
                </div>
                <p className="text-sm text-gray-400 leading-tight">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            * Projections based on market research and early user feedback. Actual results may vary.
          </p>
        </div>
      </div>
    </section>
  );
}