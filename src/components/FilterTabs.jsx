import React from 'react'
import { motion } from 'framer-motion'
import { LayoutGrid, Shirt, HardHat } from 'lucide-react'
import { products } from '../data/products'

const tabs = [
  { key: 'all', label: 'All Drops', Icon: LayoutGrid },
  { key: 'jersey', label: 'Jerseys', Icon: Shirt },
  { key: 'cap', label: 'Caps', Icon: HardHat },
]

export default function FilterTabs({ active, onChange }) {
  const counts = {
    all: products.length,
    jersey: products.filter(p => p.category === 'jersey').length,
    cap: products.filter(p => p.category === 'cap').length,
  }

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-10 flex-wrap">
      {tabs.map(({ key, label, Icon }) => {
        const isActive = active === key
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`relative flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-medium tracking-[0.12em] uppercase transition-all duration-200 select-none overflow-hidden ${
              isActive
                ? 'text-black'
                : 'text-gray-400 hover:text-white glass border border-white/10 hover:border-white/20'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="filterBg"
                className="absolute inset-0 bg-[#39FF14]"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Icon size={14} />
              {label}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-gray-500'
              }`}>
                {counts[key]}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
