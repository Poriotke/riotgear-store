import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Zap, Menu, X } from 'lucide-react'

export default function Navbar({ cartCount, badgePop, onCartOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Jerseys', href: '#catalog' },
    { label: 'Caps', href: '#catalog' },
    { label: 'All Drops', href: '#catalog' },
  ]

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="/" className="flex items-center gap-2 group select-none">
            <div className="relative">
              <div className="w-8 h-8 bg-[#39FF14] rounded-sm flex items-center justify-center group-hover:shadow-[0_0_15px_#39FF14] transition-shadow duration-300">
                <Zap size={18} className="text-black" fill="black" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#FF2D78] rounded-full" />
            </div>
            <span className="font-display text-2xl tracking-[0.2em] text-white group-hover:text-[#39FF14] transition-colors duration-300">
              RIOTGEAR
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs tracking-[0.2em] uppercase text-gray-400 hover:text-[#39FF14] transition-colors duration-200 font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onCartOpen}
              aria-label={`Shopping cart, ${cartCount} items`}
              className="relative flex items-center justify-center w-10 h-10 rounded-full glass hover:border-[#39FF14]/40 transition-all duration-300 group"
            >
              <ShoppingCart size={20} className="text-gray-300 group-hover:text-[#39FF14] transition-colors" />
              <AnimatePresence mode="wait">
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[#39FF14] text-black text-[10px] font-bold rounded-full flex items-center justify-center px-1 ${badgePop ? 'badge-pop' : ''}`}
                  >
                    {cartCount > 99 ? '99+' : cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              onClick={() => setMobileOpen(o => !o)}
              className="md:hidden w-10 h-10 flex items-center justify-center glass rounded-full"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 border-t border-white/5 flex flex-col gap-4 pb-6">
                {navLinks.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm tracking-[0.2em] uppercase text-gray-400 hover:text-[#39FF14] transition-colors font-medium pl-2"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
                           }

