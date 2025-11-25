'use client';

import { motion } from 'framer-motion';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Technology', href: '#technology' },
      { name: 'How it Works', href: '#how-it-works' },
    ],
    company: [
      { name: 'About', href: '#about' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    // PERBAIKAN 1: Menambahkan 'flex justify-center' untuk memaksa container ke tengah secara absolut
    <footer className="relative bg-[#FAFAFA] w-full flex justify-center overflow-hidden border-t border-neutral-200/60">
      
      {/* Subtle Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-neutral-200/50 to-transparent rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-gradient-to-tl from-neutral-300/40 to-transparent rounded-full blur-[80px]" />
      </div>

      {/* Main Container */}
      {/* PERBAIKAN 2: 'w-full' memastikan container mengambil lebar penuh sebelum dibatasi max-w-7xl */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 my-10">

        {/* Glassmorphism Card */}
        <motion.div
          className="relative rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Glass Background */}
          <div className="absolute inset-0 bg-white/50 backdrop-blur-2xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/40 to-neutral-100/50" />
          <div className="absolute inset-0 rounded-3xl border border-white/70 shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_0_0_rgba(255,255,255,0.9)]" />

          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 rounded-3xl opacity-60"
            style={{
              background: 'linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.8) 50%, transparent 75%)',
            }}
            animate={{ x: ['-200%', '200%'] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatDelay: 4,
              ease: 'linear',
            }}
          />

          {/* Content */}
          <div className="relative z-10 px-8 md:px-16">

            {/* --- FORCE SPACER TOP (PENGGANTI PADDING ATAS) --- */}
            {/* Ini mengakali padding yang tidak jalan dengan memberikan elemen kosong setinggi 4rem (h-16) */}
            <div className="w-full h-12 md:h-20 pointer-events-none" aria-hidden="true" />

            {/* Top Section: Logo + Description */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 pb-12 border-b border-neutral-300/50">

              {/* Logo & Brand */}
              <div className="flex flex-col gap-4 max-w-md">
                <Link href="/" className="inline-block">
                  <motion.div
                    className="flex items-center gap-3"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Image
                      src="/sourcenet.png"
                      alt="SourceNet Logo"
                      width={140}
                      height={50}
                      priority
                      className="h-10 w-auto drop-shadow-md"
                    />
                    <span className="text-2xl md:text-3xl font-black text-[#2A2A2A] tracking-tight">
                      SourceNet
                    </span>
                  </motion.div>
                </Link>
                <p className="text-neutral-600 text-sm md:text-base leading-relaxed font-medium">
                  The decentralized data marketplace built for the AI era. Own your data, control your value.
                </p>
              </div>

              {/* Navigation Links */}
              <div className="flex gap-12 md:gap-16">
                {/* Product */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-[#2A2A2A] font-bold text-xs uppercase tracking-wider">Product</h3>
                  <ul className="space-y-3">
                    {footerLinks.product.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-neutral-600 hover:text-[#2A2A2A] transition-colors text-sm font-medium"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-[#2A2A2A] font-bold text-xs uppercase tracking-wider">Company</h3>
                  <ul className="space-y-3">
                    {footerLinks.company.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-neutral-600 hover:text-[#2A2A2A] transition-colors text-sm font-medium"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Section: Copyright + Social */}
            

            {/* --- FORCE SPACER BOTTOM (PENGGANTI PADDING BAWAH) --- */}
            {/* Spacer bawah untuk memberi napas di bagian bawah card */}
            <div className="w-full h-8 md:h-16 pointer-events-none" aria-hidden="true" />

          </div>
        </motion.div>

      </div>
    </footer>
  );
}