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

  // PERBAIKAN WARNA 1: Menggunakan warna kontras tinggi
  const HIGH_CONTRAST_TEXT = "text-white";
  const SUBTLE_CONTRAST_TEXT = "text-[#E0E0E0]"; // Abu-abu sangat muda (hampir putih) untuk deskripsi

  useEffect(() => {
    if (!sectionRef.current || !chartRef.current) return;

    const ctx = gsap.context(() => {
      // Animate chart paths
      const paths = chartRef.current?.querySelectorAll('.chart-line');

      paths?.forEach((path, index) => {
        const svgPath = path as SVGPathElement;
        const length = svgPath.getTotalLength();

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2,
          delay: index * 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
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
    // PERBAIKAN SPACING 1: Meningkatkan padding vertikal secara ekstrem (pt-96 dan pb-64)
    <section
      ref={sectionRef}
      id="how-it-works"
      className="section-padding bg-[#1a1a1a] relative overflow-hidden w-full pt-96 md:pt-96 pb-64 md:pb-64"
    >
      {/* Background effects (No change) */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#333] opacity-40 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#000] opacity-30 blur-[150px] rounded-full" />
      </div>

      <div className="section-inner relative z-10 max-w-7xl mx-auto px-6">
        {/* Header Section */}
        {/* PERBAIKAN SPACING 2: Meningkatkan margin bawah pada Header (mb-36) */}
        <div className="flex flex-col md:flex-row items-start gap-16 mb-36">
          {/* Left Side: Text Content */}
          <div className="md:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              {/* PERBAIKAN WARNA: Teks badge high-contrast */}
              <span className={`px-4 py-2 bg-[#333]/40 border border-[#555]/50 rounded-full text-sm font-medium ${SUBTLE_CONTRAST_TEXT}`}>
                Growth Comparison
              </span>
            </motion.div>

            {/* Judul: THE SOURCENET ADVANTAGE */}
            {/* PERBAIKAN WARNA: Judul diubah ke bright white */}
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl leading-tight font-bold ${HIGH_CONTRAST_TEXT}`}
            >
              THE SOURCENET ADVANTAGE
            </h2>

            {/* Paragraf utama */}
            {/* PERBAIKAN WARNA: Paragraf diubah ke light grey high-contrast */}
            <p className={`text-xl leading-relaxed ${SUBTLE_CONTRAST_TEXT}`}>
              What would your investment have looked like if you had invested in NVIDIA or APPLE 10 years ago?
              <br />
              {/* PERBAIKAN WARNA: Sub-teks diubah ke bright white */}
              <span className={`font-semibold ${HIGH_CONTRAST_TEXT}`}>Now imagine OWNING your data growth.</span>
            </p>
          </div>

          {/* Right Side: Chart (No changes) */}
          <div className="md:w-1/2">
            <div className="bg-[#222] border border-[#444]/40 rounded-3xl p-6 shadow-lg">
              <svg
                ref={chartRef}
                viewBox="0 0 500 300"
                className="w-full h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Grid lines */}
                <g opacity="0.15">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line
                      key={`h-${i}`}
                      x1="50"
                      y1={50 + i * 50}
                      x2="450"
                      y2={50 + i * 50}
                      stroke="#fff"
                      strokeWidth="1"
                    />
                  ))}
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <line
                      key={`v-${i}`}
                      x1={50 + i * 50}
                      y1="50"
                      x2={50 + i * 50}
                      y2="250"
                      stroke="#fff"
                      strokeWidth="1"
                    />
                  ))}
                </g>

                {/* Traditional Web2 - Flat line */}
                <path
                  className="chart-line"
                  d="M 50 250 L 100 249 L 150 248 L 200 247 L 250 246 L 300 245 L 350 244 L 400 243 L 450 242"
                  stroke="#aaa"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Web3 Marketplaces - Slow growth */}
                <path
                  className="chart-line"
                  d="M 50 250 L 100 235 L 150 225 L 200 215 L 250 210 L 300 205 L 350 203 L 400 201 L 450 200"
                  stroke="#888"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* SourceNet - Exponential growth */}
                <path
                  className="chart-line"
                  d="M 50 250 Q 100 220, 150 180 T 250 100 T 350 60 L 450 40"
                  stroke="#eee"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Gradient fill for SourceNet */}
                <defs>
                  <linearGradient id="sourceNetGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#eee" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#eee" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 50 250 Q 100 220, 150 180 T 250 100 T 350 60 L 450 40 L 450 250 L 50 250 Z"
                  fill="url(#sourceNetGradient)"
                />

                {/* Labels */}
                <text className="chart-label" x="450" y="245" fill="#aaa" fontSize="12" textAnchor="end">
                  Traditional Web2: $0 for you
                </text>
                <text className="chart-label" x="450" y="205" fill="#888" fontSize="12" textAnchor="end">
                  Web3: High friction, low adoption
                </text>
                <text className="chart-label" x="450" y="45" fill="#eee" fontSize="14" fontWeight="bold" textAnchor="end">
                  SourceNet: 10x easier, 10x faster
                </text>

                {/* Y-axis label */}
                <text x="25" y="150" fill="#999" fontSize="10" textAnchor="middle" transform="rotate(-90 25 150)">
                  Value Growth
                </text>

                {/* X-axis label */}
                <text x="250" y="280" fill="#999" fontSize="10" textAnchor="middle">
                  Time
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Key Metrics - Large Stats at Bottom */}
        {/* PERBAIKAN SPACING 3: Meningkatkan margin atas pada Key Metrics (mt-48) */}
        <div className="mt-48 grid md:grid-cols-3 gap-20 text-center">
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
              className="space-y-4"
            >
              {/* PERBAIKAN WARNA: Metric diubah ke bright white */}
              <div className={`text-5xl md:text-6xl font-black ${HIGH_CONTRAST_TEXT}`}>{item.metric}</div>
              {/* PERBAIKAN WARNA: Label diubah ke bright white */}
              <div className={`text-xl font-bold ${HIGH_CONTRAST_TEXT}`}>{item.label}</div>
              {/* PERBAIKAN WARNA: Deskripsi diubah ke light grey high-contrast */}
              <div className={`text-sm ${SUBTLE_CONTRAST_TEXT}`}>{item.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}