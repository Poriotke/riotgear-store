import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Zap } from 'lucide-react'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black pt-20">

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #39FF14 1px, transparent 1px),
            linear-gradient(to bottom, #39FF14 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow spots */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#39FF14]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#00F0FF]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF2D78]/3 rounded-full blur-[150px] pointer-events-none" />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        {/* Eyebrow */}
        <motion.div variants={item} className="flex items-center justify-center gap-2 mb-6">
          <div className="h-px w-12 bg-[#39FF14]" />
          <span className="text-[#39FF14] text-xs tracking-[0.4em] uppercase font-medium flex items-center gap-1.5">
            <Zap size={11} fill="#39FF14" /> New Season Drop
          </span>
          <div className="h-px w-12 bg-[#39FF14]" />
        </motion.div>

        {/* Main heading */}
        <motion.h1 variants={item} className="font-display leading-none mb-4">
          <span className="block text-[clamp(4rem,15vw,10rem)] text-white tracking-wider">
            RIOT
          </span>
          <span className="block text-[clamp(4rem,15vw,10rem)] tracking-wider"
            style={{
              background: 'linear-gradient(135deg, #39FF14 0%, #00F0FF 50%, #FF2D78 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            GEAR
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p variants={item} className="text-gray-400 text-base sm:text-lg tracking-[0.15em] uppercase mb-10 font-light">
          Premium Jerseys &amp; Caps — Streetwear for the Bold
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#catalog"
            className="group relative px-8 py-3.5 bg-[#39FF14] text-black font-bold text-sm tracking-[0.2em] uppercase rounded-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_rgba(57,255,20,0.5)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Zap size={14} fill="black" /> Shop Now
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </a>
          <a
            href="#catalog"
            className="px-8 py-3.5 border border-white/20 text-white font-medium text-sm tracking-[0.2em] uppercase rounded-sm hover:border-[#00F0FF]/60 hover:text-[#00F0FF] transition-all duration-300"
          >
            View Caps
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div variants={item} className="mt-16 flex items-center justify-center gap-8 sm:gap-16">
          {[
            { label: 'Products', value: '12+' },
            { label: 'Happy Customers', value: '500+' },
            { label: 'Order via', value: 'WhatsApp' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="font-display text-2xl sm:text-3xl text-[#39FF14] tracking-wider">{s.value}</div>
              <div className="text-gray-600 text-xs tracking-[0.15em] uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-gray-600 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="text-[#39FF14]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
