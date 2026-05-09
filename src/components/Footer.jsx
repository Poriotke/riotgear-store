import React from 'react'
import { motion } from 'framer-motion'
import { Phone, MessageCircle, Instagram, Twitter, Zap, MapPin, Clock, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const whatsappLink = `https://wa.me/254706270921?text=${encodeURIComponent(
    'Hello! Hello @RIOTGEAR,👋 I would like to inquire about your products.'
  )}`

  return (
    <footer className="relative bg-[#050505] border-t border-white/[0.06] overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#39FF14]/30 to-transparent" />
      <div className="absolute top-0 left-0 w-48 h-48 bg-[#39FF14]/3 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#39FF14] rounded-sm flex items-center justify-center">
                <Zap size={16} className="text-black" fill="black" />
              </div>
              <span className="font-display text-2xl tracking-[0.2em] text-white">RIOTGEAR</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-xs">
              Premium jerseys and caps for those who refuse to blend in. Every drop is a statement.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: '#', label: 'Instagram' },
                { Icon: Twitter, href: '#', label: 'Twitter / X' },
                { Icon: MessageCircle, href: whatsappLink, label: 'WhatsApp' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-sm glass border border-white/10 flex items-center justify-center text-gray-500 hover:text-[#39FF14] hover:border-[#39FF14]/30 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm tracking-[0.3em] text-gray-400 uppercase mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'All Jerseys', href: '#catalog' },
                { label: 'All Caps', href: '#catalog' },
                { label: 'New Arrivals', href: '#catalog' },
                { label: 'Sale Items', href: '#catalog' },
              ].map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-600 text-sm hover:text-[#39FF14] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-3 h-px bg-gray-700 group-hover:bg-[#39FF14] group-hover:w-5 transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-display text-sm tracking-[0.3em] text-gray-400 uppercase mb-5">Order Info</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <MessageCircle size={14} className="text-[#25D366] mt-0.5 shrink-0" />
                Orders placed via WhatsApp
              </li>
              <li className="flex items-start gap-2">
                <Clock size={14} className="text-gray-700 mt-0.5 shrink-0" />
                Confirmed within 2 hours
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-gray-700 mt-0.5 shrink-0" />
                Nationwide delivery available
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm tracking-[0.3em] text-gray-400 uppercase mb-5">Contact</h4>
            <div className="space-y-4">
              {/* Phone - prominently displayed */}
              <a
                href="tel:+254706270921
                "
                className="group flex items-center gap-3 glass border border-white/8 rounded-sm px-4 py-3 hover:border-[#39FF14]/30 transition-all duration-200"
              >
                <Phone size={16} className="text-[#39FF14] shrink-0" />
                <div>
                  <div className="text-[10px] text-gray-600 tracking-[0.2em] uppercase mb-0.5">Call / SMS</div>
                  <div className="text-white font-medium text-sm tracking-wide group-hover:text-[#39FF14] transition-colors">
                    +254706270921
                  </div>
                </div>
              </a>

              {/* WhatsApp CTA */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-[#25D366]/10 border border-[#25D366]/20 rounded-sm px-4 py-3 hover:bg-[#25D366]/15 hover:border-[#25D366]/40 transition-all duration-200"
              >
                <MessageCircle size={16} className="text-[#25D366] shrink-0" />
                <div>
                  <div className="text-[10px] text-gray-600 tracking-[0.2em] uppercase mb-0.5">Chat Now</div>
                  <div className="text-[#25D366] font-medium text-sm tracking-wide">WhatsApp Us</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-700 text-xs tracking-[0.1em]">
            © {currentYear} RIOTGEAR. All rights reserved.
          </p>

          {/* Developer credit */}
          <p className="text-gray-700 text-xs tracking-[0.15em] flex items-center gap-1.5">
            Built with <Heart size={10} className="text-[#FF2D78]" fill="#FF2D78" /> by{' '}
            <span className="text-gray-500 hover:text-[#39FF14] transition-colors cursor-default font-medium tracking-[0.2em]">
              P.o.Riot
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
