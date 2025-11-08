'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const chartRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !chartRef.current) return;

    const ctx = gsap.context(() => {
      // Animate chart paths
      const paths = chartRef.current?.querySelectorAll('path.chart-line');
      
      paths?.forEach((path, index) => {
        const length = (path as SVGPathElement).getTotalLength();
        
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(path, {
          scrollTrigger: {
            trigger: chartRef.current,
            start: 'top 70%',
          },
          strokeDashoffset: 0,
          duration: 2,
          delay: index * 0.3,
          ease: 'power2.inOut',
        });
      });

      // Animate labels
      gsap.from('.chart-label', {
        scrollTrigger: {
          trigger: chartRef.current,
          start: 'top 70%',
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.2,
        delay: 0.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="section-padding bg-[#0A0A0A] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 opacity-30 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500 opacity-30 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-sm font-medium">
              📈 Growth Comparison
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            THE <span className="text-[#CDFF00]">SOURCENET</span> ADVANTAGE
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            What would your investment have looked like if you had invested in NVIDIA or APPLE 10 years ago?
            <br />
            <span className="text-white font-semibold">Now imagine OWNING your data growth.</span>
          </p>
        </div>

        {/* Chart */}
        <div className="max-w-5xl mx-auto bg-[#1A1A1A] border border-gray-800 rounded-3xl p-8 md:p-12">
          <svg
            ref={chartRef}
            viewBox="0 0 800 400"
            className="w-full h-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Grid lines */}
            <g opacity="0.1">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <line
                  key={`h-${i}`}
                  x1="50"
                  y1={50 + i * 60}
                  x2="750"
                  y2={50 + i * 60}
                  stroke="#fff"
                  strokeWidth="1"
                />
              ))}
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <line
                  key={`v-${i}`}
                  x1={50 + i * 100}
                  y1="50"
                  x2={50 + i * 100}
                  y2="350"
                  stroke="#fff"
                  strokeWidth="1"
                />
              ))}
            </g>

            {/* Traditional Web2 - Flat line */}
            <path
              className="chart-line"
              d="M 50 340 L 150 338 L 250 337 L 350 336 L 450 335 L 550 334 L 650 333 L 750 332"
              stroke="#ef4444"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />

            {/* Web3 Marketplaces - Slow growth */}
            <path
              className="chart-line"
              d="M 50 340 L 150 320 L 250 310 L 350 295 L 450 285 L 550 280 L 650 278 L 750 276"
              stroke="#f59e0b"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />

            {/* SourceNet - Exponential growth */}
            <path
              className="chart-line"
              d="M 50 340 Q 150 300, 250 240 T 450 120 T 650 60 L 750 40"
              stroke="#CDFF00"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />

            {/* Gradient fill for SourceNet */}
            <defs>
              <linearGradient id="sourceNetGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#CDFF00" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#CDFF00" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 50 340 Q 150 300, 250 240 T 450 120 T 650 60 L 750 40 L 750 350 L 50 350 Z"
              fill="url(#sourceNetGradient)"
            />

            {/* Labels */}
            <text className="chart-label" x="750" y="325" fill="#ef4444" fontSize="14" textAnchor="end">
              Traditional Web2: $0 for you
            </text>
            <text className="chart-label" x="750" y="265" fill="#f59e0b" fontSize="14" textAnchor="end">
              Web3: High friction, low adoption
            </text>
            <text className="chart-label" x="750" y="30" fill="#CDFF00" fontSize="16" fontWeight="bold" textAnchor="end">
              SourceNet: 10x easier, 10x faster
            </text>

            {/* Y-axis label */}
            <text x="30" y="200" fill="#666" fontSize="12" textAnchor="middle" transform="rotate(-90 30 200)">
              Value Growth
            </text>

            {/* X-axis label */}
            <text x="400" y="380" fill="#666" fontSize="12" textAnchor="middle">
              Time
            </text>
          </svg>
        </div>

        {/* Key Metrics */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              metric: '-1964%',
              label: 'Easier Onboarding',
              description: 'vs traditional Web3 wallets',
            },
            {
              metric: '-240%',
              label: 'Faster Transactions',
              description: 'with sponsored gas fees',
            },
            {
              metric: '+∞%',
              label: 'Your Data Value',
              description: 'from $0 to actual earnings',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-black text-[#CDFF00] mb-2">{item.metric}</div>
              <div className="text-xl font-bold text-white mb-1">{item.label}</div>
              <div className="text-sm text-gray-500">{item.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}