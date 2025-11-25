'use client';

import { gsap } from "gsap";
import { useState, useRef, useEffect } from 'react';
import { Users, Briefcase, DollarSign, ShoppingBag, Smile } from 'lucide-react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Statistics() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const stickyHeaderRef = useRef<HTMLDivElement | null>(null);
  const stickySectionRef = useRef<HTMLDivElement | null>(null);
  const [counters, setCounters] = useState<Record<number, number>>({});
  const [hasCounterStarted, setHasCounterStarted] = useState(false);
  const [stickyHeight, setStickyHeight] = useState(5000);

  const stats = [
    {
      icon: Users,
      value: '100K+',
      label: 'Targeting Early Adopters',
      color: 'from-[#d0d0d0] to-[#a8a8a8]',
    },
    {
      icon: Briefcase,
      value: '$500M+',
      label: 'Potential Market',
      color: 'from-[#b8b8b8] to-[#8a8a8a]',
    },
    {
      icon: DollarSign,
      value: '$2B+',
      label: 'Untapped Data Value',
      color: 'from-[#c5c5c5] to-[#9f9f9f]',
    },
    {
      icon: ShoppingBag,
      value: '30+',
      label: 'Data Categories',
      color: 'from-[#bebebe] to-[#969696]',
    },
    {
      icon: Smile,
      value: '97%',
      label: 'User Satisfaction (Projected)',
      color: 'from-[#d8d8d8] to-[#adadad]',
    },
  ];

  // Transform data untuk animasi GSAP
  const transforms = [
    [
      [10, 50, -10, 10],
      [20, -10, -45, 10],
    ],
    [
      [0, 47.5, -10, 15],
      [-25, 15, -45, 30],
    ],
    [
      [0, 52.5, -10, 5],
      [15, -5, -40, 60],
    ],
    [
      [10, 50, -10, 10],
      [20, -10, -45, 90],
    ],
    [
      [0, 0, 0, 0],
      [25, -15, 60, 120],
    ],
  ];

  useEffect(() => {
    // Set tinggi scroll area
    setStickyHeight(window.innerHeight * 5);

    // Inisialisasi Smooth Scroll (Lenis)
    const initLenis = async () => {
      const { default: Lenis } = await import('lenis');
      const lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    };

    initLenis();

    const stickySectionEl = stickySectionRef.current;
    if (!stickySectionEl) {
      return;
    }

    // Konfigurasi ScrollTrigger
    ScrollTrigger.create({
      trigger: stickySectionEl,
      start: "top top",
      end: `+=${stickyHeight}px`,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        const progress = self.progress;

        // Parallax efek untuk Header Text
        if (stickyHeaderRef.current) {
          const maxTranslate = stickyHeaderRef.current.offsetWidth - window.innerWidth;
          const translateX = -progress * maxTranslate;
          gsap.set(stickyHeaderRef.current, { x: translateX });
        }

        // Logic Counter Angka
        if (progress > 0.3 && !hasCounterStarted) {
          setHasCounterStarted(true);
          stats.forEach((stat, index) => {
            const target = stat.value;
            const numericValue = parseFloat(target.replace(/[^0-9.]/g, ''));
            let current = 0;
            const increment = numericValue / 60;
            const timer = setInterval(() => {
              current += increment;
              if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
              }
              setCounters(prev => ({ ...prev, [index]: Math.floor(current) }));
            }, 30);
          });
        }

        // Animasi Kartu Terbang
        cardsRef.current.forEach((card, index) => {
          const delay = index * 0.1125;
          const cardProgress = Math.max(0, Math.min((progress - delay) * 2, 1));

          if (cardProgress > 0) {
            const cardStartX = 25;
            const cardEndX = -650;
            const yPos = transforms[index]?.[0] || [0];
            const rotations = transforms[index]?.[1] || [0];

            const cardX = gsap.utils.interpolate(cardStartX, cardEndX, cardProgress);
            const yProgress = cardProgress * 3;
            const yIndex = Math.min(Math.floor(yProgress), yPos.length - 2);
            const yInterpolation = yProgress - yIndex;
            const cardY = gsap.utils.interpolate(yPos[yIndex], yPos[yIndex + 1], yInterpolation);
            const cardRotation = gsap.utils.interpolate(rotations[yIndex], rotations[yIndex + 1], yInterpolation);

            gsap.set(card, {
              xPercent: cardX,
              yPercent: cardY,
              rotation: cardRotation,
              opacity: 1,
            });
          } else {
            gsap.set(card, { opacity: 0 });
          }
        });
      },
    });

    return () => {
      ScrollTrigger.killAll();
    };
  }, [hasCounterStarted, stickyHeight]);

  return (
    <div
      className="relative bg-[#d6d5d5] w-full h-screen overflow-hidden transition-colors duration-300"
      id="statistics"
      ref={stickySectionRef}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e8e8e8] via-[#f0f0f0] to-[#d5d5d5]" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#919191] opacity-25 blur-[200px] rounded-full" />
      </div>

      {/* Header Text Structure (Sandwich Method) */}
      <div
        className="absolute top-0 left-0 w-[250vw] h-full flex flex-col justify-between will-change-transform"
        ref={stickyHeaderRef}
      >
        {/* Spacer Atas */}
        <div className="w-full h-24 md:h-32 shrink-0" aria-hidden="true" />

        {/* Text Wrapper */}
        <div className="flex-1 flex items-center justify-center w-full">
          <h1 className="text-black text-[30vw] tracking-tight leading-tight font-semibold m-0 transition-colors duration-300 whitespace-nowrap">
            ACHIEVEMENTS & <span className="text-[#2f2f2f]">PROJECTIONS</span>
          </h1>
        </div>

        {/* Spacer Bawah */}
        <div className="w-full h-24 md:h-32 shrink-0" aria-hidden="true" />
      </div>

      {/* Cards Section */}
      {stats.map((stat, index) => {
        const target = stat.value;
        const isPercentage = target.includes('%');
        const isDollar = target.includes('$');
        const isK = target.includes('K');
        const isM = target.includes('M');
        const isPlus = target.includes('+');
        const counterValue = counters[index] ?? 0;

        let display = counterValue.toString();
        if (isDollar) display = '$' + display;
        if (isM) display += 'M';
        if (isK) display += 'K';
        if (isPlus) display += '+';
        if (isPercentage) display += '%';

        return (
          <div
            key={index}
            ref={(el) => { cardsRef.current[index] = el; }}
            // PERBAIKAN UTAMA DISINI:
            // 1. top-1/2 : Menaruh posisi TOP di 50% layar
            // 2. -mt-[162px] : Margin negatif sebesar setengah tinggi total kartu (324px / 2)
            className="absolute left-full top-1/2 -mt-[162px] w-[325px] bg-white rounded-[10px] p-3 will-change-transform z-20 transition-colors duration-300"
          >
            <div className="w-full h-[300px] flex flex-col justify-between text-black p-2 transition-colors duration-300">
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f0f0f0] shadow-lg mb-6 mt-4">
                  <stat.icon size={32} className="text-[#1e1e1e]" />
                </div>
                <h2 className={`text-[48px] tracking-tighter leading-tight font-medium bg-gradient-to-br ${stat.color} bg-clip-text text-transparent text-center`}>
                  {display}
                </h2>
              </div>
              <div>
                <p className="text-[20px] leading-tight text-black text-center transition-colors duration-300">
                  {stat.label}
                </p>
              </div>
            </div>
          </div>
        );
      })}

      {/* Footer Text / Disclaimer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 w-full px-4 pb-8 md:pb-10">
        <p className="text-[#4f4f4f] text-sm text-center max-w-2xl mx-auto font-medium">
          
        </p>
      </div>
    </div>
  );
}