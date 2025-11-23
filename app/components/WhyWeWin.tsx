'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Terminal as TerminalIcon, Code2, Cpu } from 'lucide-react';
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal";

export default function WhyWeWin() {
  return (
    <section id="developers" className="relative w-full bg-white py-32 sm:py-48 overflow-hidden">
      <div className="section-inner relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">

          {/* Left: The Statement */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-black/5 rounded-lg">
                  <Code2 className="w-6 h-6 text-black" />
                </div>
                <span className="text-sm font-bold tracking-[0.2em] uppercase text-black/60">
                  Developer Experience
                </span>
              </div>

              <h2 className="text-5xl sm:text-7xl font-black text-black leading-[0.9] tracking-tighter mb-8">
                BUILT FOR <br />
                BUILDERS.
              </h2>
              <p className="text-xl text-black/60 font-medium max-w-xl leading-relaxed mb-10">
                Integrate privacy-first data monetization into your app in minutes.
                Our SDK handles encryption, ZKLogin, and on-chain minting automatically.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-4 bg-black text-white rounded-full font-bold text-lg flex items-center justify-center gap-3 overflow-hidden"
                >
                  <span className="relative z-10">Read the Docs</span>
                  <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-black/5 text-black rounded-full font-bold text-lg flex items-center justify-center gap-3 hover:bg-black/10 transition-colors"
                >
                  <TerminalIcon className="w-5 h-5" />
                  <span>View SDK</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Feature list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-black/10">
              <div className="flex flex-col gap-2">
                <h4 className="font-bold text-lg flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  Typescript SDK
                </h4>
                <p className="text-black/60 text-sm">Full type safety and auto-completion out of the box.</p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-bold text-lg flex items-center gap-2">
                  <TerminalIcon className="w-5 h-5" />
                  CLI Tools
                </h4>
                <p className="text-black/60 text-sm">Manage DataPods and sales directly from your terminal.</p>
              </div>
            </div>
          </div>

          {/* Right: The Terminal Demo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Decorative elements */}
            <div className="absolute -inset-4 bg-gradient-to-r from-black/5 to-transparent rounded-3xl blur-2xl" />

            <div className="relative rounded-2xl shadow-2xl overflow-hidden border border-black/10 bg-white">
              <Terminal className="w-full shadow-2xl border border-white/10 bg-[#0F0F0F] min-h-[450px] text-[15px]">
                <TypingAnimation className="text-white/90">&gt; npm install @sourcenet/sdk</TypingAnimation>

                <AnimatedSpan className="text-green-500">
                  <span>✔ Added 1 package in 842ms</span>
                </AnimatedSpan>

                <TypingAnimation className="text-white/90" delay={500}>&gt; sourcenet init</TypingAnimation>

                <AnimatedSpan className="text-green-500">
                  <span>✔ Verifying Sui Network connection...</span>
                </AnimatedSpan>

                <AnimatedSpan className="text-green-500">
                  <span>✔ Authenticating with ZKLogin...</span>
                </AnimatedSpan>

                <AnimatedSpan className="text-green-500">
                  <span>✔ Generating encryption keys...</span>
                </AnimatedSpan>

                <TypingAnimation className="text-white/90" delay={500}>&gt; sourcenet publish ./user-data.json</TypingAnimation>

                <AnimatedSpan className="text-green-500">
                  <span>✔ Encrypting data with AES-256...</span>
                </AnimatedSpan>

                <AnimatedSpan className="text-green-500">
                  <span>✔ Uploading to Walrus Storage (Blob ID: 8Gj...9Lp)</span>
                </AnimatedSpan>

                <AnimatedSpan className="text-green-500">
                  <span>✔ Minting DataPod Object...</span>
                </AnimatedSpan>

                <AnimatedSpan className="text-blue-400">
                  <span>ℹ Transaction Digest: 5Kp...2Xy</span>
                </AnimatedSpan>

                <TypingAnimation className="text-white/60">
                  Success! DataPod is live and listed on the marketplace.
                </TypingAnimation>
              </Terminal>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}