'use client';

import { motion } from 'framer-motion';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const footerLinks = {
    about: [
      { name: 'Education', href: '#' },
      { name: 'Company', href: '#' },
      { name: 'Partners', href: '#' },
      { name: 'Careers', href: '#' },
    ],
    legal: [
      { name: 'Terms of Service', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Security', href: '#' },
      { name: 'Cookie Policy', href: '#' },
    ],
    strategies: [
      { name: 'For Investors', href: '#' },
      { name: 'For Developers', href: '#' },
      { name: 'API Documentation', href: '#' },
      { name: 'Integration Guide', href: '#' },
    ],
    resources: [
      { name: 'Blog', href: '#' },
      { name: 'Help Center', href: '#' },
      { name: 'System Status', href: '#' },
      { name: 'Community', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#474747] to-[#353535] border-t border-[#919191]/20 relative overflow-hidden pb-20">
      {/* Background effect */}
      <div className="absolute inset-0 flex justify-center opacity-10 pointer-events-none">
        <div className="w-full max-w-5xl h-[400px] bg-[#CECECE] blur-[150px] rounded-full translate-y-1/2" />
      </div>

      <div className="section-inner py-16 relative z-10 flex flex-col items-center">
        {/* Top Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16 w-full">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mb-4"
            >
              <Image
                src="/sourcenet.png"
                alt="SourceNet"
                width={280}
                height={80}
                className="h-20 w-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
              />
            </motion.div>
            <p className="text-[#FFFFFF]/80 mb-6 leading-relaxed">
              The Web2 Data Marketplace Without Friction. Own your data, control your value.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-[#919191]/20 border border-[#919191]/20 flex items-center justify-center text-[#FFFFFF] hover:text-[#CECECE] hover:border-[#CECECE] transition-all shadow-sm"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* About Column */}
          <div>
            <h3 className="text-[#CECECE] font-bold text-sm uppercase mb-4 tracking-wider">About</h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-[#FFFFFF]/70 hover:text-[#CECECE] transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-[#CECECE] font-bold text-sm uppercase mb-4 tracking-wider">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-[#FFFFFF]/70 hover:text-[#CECECE] transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Strategies Column */}
          <div>
            <h3 className="text-[#CECECE] font-bold text-sm uppercase mb-4 tracking-wider">Strategies</h3>
            <ul className="space-y-3">
              {footerLinks.strategies.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-[#FFFFFF]/70 hover:text-[#CECECE] transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-[#CECECE] font-bold text-sm uppercase mb-4 tracking-wider">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-[#FFFFFF]/70 hover:text-[#CECECE] transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </footer>
  );
}