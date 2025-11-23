'use client';

import { motion } from 'framer-motion';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const footerLinks = {
    company: [
      { name: 'About', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Brand', href: '#' },
    ],
    legal: [
      { name: 'Terms', href: '#' },
      { name: 'Privacy', href: '#' },
      { name: 'Licenses', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="bg-[#FAFAFA] border-t border-neutral-200 relative overflow-hidden pt-32 pb-12 text-neutral-900">
      {/* Background decorative gradient (Subtle Grey) */}
      <div className="absolute inset-0 flex justify-center opacity-40 pointer-events-none overflow-hidden">
        <div className="w-[800px] h-[800px] bg-gradient-to-tr from-neutral-200/50 to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="w-[600px] h-[600px] bg-gradient-to-tl from-neutral-200/40 to-transparent rounded-full blur-[80px] -translate-y-1/2 -translate-x-1/3" />
      </div>

      <div className="section-inner relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between gap-16 md:gap-24">

        {/* Brand Column */}
        <div className="flex flex-col gap-8 max-w-sm">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-block"
          >
            {/* brightness-0 membuat logo otomatis hitam pekat (cocok untuk tema light) */}
            <Image
              src="/sourcenet.png"
              alt="SourceNet"
              width={200}
              height={60}
              className="h-10 w-auto brightness-0 opacity-90" 
            />
          </motion.div>
          <p className="text-neutral-500 text-sm leading-relaxed font-medium">
            The Web2 Data Marketplace Without Friction. Own your data, control your value, and monetize instantly.
          </p>

          {/* Social Links */}
          <div className="flex gap-3">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-500 transition-all hover:bg-black hover:border-black hover:text-white shadow-sm"
                aria-label={social.label}
              >
                <social.icon size={18} strokeWidth={2} className="transition-transform group-hover:scale-110" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Links Columns */}
        <div className="flex gap-16 sm:gap-32">
          {/* Company */}
          <div className="flex flex-col gap-6">
            <h3 className="text-black font-bold text-xs uppercase tracking-[0.2em]">Company</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-neutral-500 hover:text-black transition-colors text-sm font-medium flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-[1px] bg-black transition-all duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-6">
            <h3 className="text-black font-bold text-xs uppercase tracking-[0.2em]">Legal</h3>
            <ul className="space-y-4">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-neutral-500 hover:text-black transition-colors text-sm font-medium flex items-center gap-2 group"
                  >
                     <span className="w-0 group-hover:w-2 h-[1px] bg-black transition-all duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      
    </footer>
  );
}