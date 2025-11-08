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
    <footer className="bg-[#0A0A0A] border-t border-gray-800 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 flex justify-center opacity-5 pointer-events-none">
        <div className="w-full max-w-5xl h-[400px] bg-[#CDFF00] blur-[150px] rounded-full translate-y-1/2" />
      </div>

      <div className="w-full px-6 py-16 relative z-10">
        <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-4xl font-black text-white mb-4"
            >
              SOURCE<span className="text-[#CDFF00]">NET</span>
            </motion.div>
            <p className="text-gray-400 mb-6 leading-relaxed">
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
                  className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-gray-800 flex items-center justify-center text-gray-400 hover:text-[#CDFF00] hover:border-[#CDFF00] transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* About Column */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase mb-4 tracking-wider">About</h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#CDFF00] transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase mb-4 tracking-wider">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#CDFF00] transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Strategies Column */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase mb-4 tracking-wider">Strategies</h3>
            <ul className="space-y-3">
              {footerLinks.strategies.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#CDFF00] transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase mb-4 tracking-wider">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#CDFF00] transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-[#1A1A1A] to-[#0A0A0A] border border-gray-800 rounded-2xl p-8 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-black text-white mb-2">Stay Updated</h3>
            <p className="text-gray-400 mb-6">Get the latest news and updates about SourceNet</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-[#0A0A0A] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#CDFF00] transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#CDFF00] text-black px-6 py-3 rounded-lg font-bold hover:bg-[#b8e600] transition-colors whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} SourceNet. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-500 hover:text-[#CDFF00] text-sm transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-500 hover:text-[#CDFF00] text-sm transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-500 hover:text-[#CDFF00] text-sm transition-colors">
                Cookies
              </a>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-xs">
              Built with ❤️ on Sui Blockchain | Powered by ZKLogin, Sponsored Transactions & Walrus Protocol
            </p>
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
}