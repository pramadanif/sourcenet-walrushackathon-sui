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
    <footer className="relative bg-[#CECECE] w-full flex justify-center overflow-hidden border-t border-black/10">

      {/* Subtle Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-white/30 to-transparent rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-gradient-to-tl from-white/20 to-transparent rounded-full blur-[80px]" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">

        {/* Content - No Card Wrapper */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative z-10">

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

          </div>
        </motion.div>

      </div>
    </footer>
  );
}