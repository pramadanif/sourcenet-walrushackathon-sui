'use client';

import { motion } from 'framer-motion';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';

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
    <footer className="bg-gradient-to-b from-[#474747] to-[#353535] border-t border-[#919191]/20 relative overflow-hidden">
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
              className="text-4xl font-black text-[#CECECE] mb-4"
            >
              SOURCE<span className="text-[#FFFFFF]">NET</span>
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

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-[#353535] to-[#474747] border border-[#919191]/20 rounded-2xl p-8 mb-12 shadow-sm">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-black text-[#CECECE] mb-2">Stay Updated</h3>
            <p className="text-[#FFFFFF]/80 mb-6">Get the latest news and updates about SourceNet</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-[#919191]/20 border border-[#919191]/20 rounded-lg text-[#FFFFFF] placeholder-[#FFFFFF]/50 focus:outline-none focus:border-[#CECECE] transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#CECECE] text-[#353535] px-6 py-3 rounded-lg font-bold hover:bg-[#FFFFFF] transition-colors whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#919191]/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#FFFFFF]/60 text-sm">
              © {new Date().getFullYear()} SourceNet. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-[#FFFFFF]/60 hover:text-[#CECECE] text-sm transition-colors">
                Privacy
              </a>
              <a href="#" className="text-[#FFFFFF]/60 hover:text-[#CECECE] text-sm transition-colors">
                Terms
              </a>
              <a href="#" className="text-[#FFFFFF]/60 hover:text-[#CECECE] text-sm transition-colors">
                Cookies
              </a>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-[#FFFFFF]/50 text-xs">
              Built with ❤️ on Sui Blockchain | Powered by ZKLogin, Sponsored Transactions & Walrus Protocol
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}