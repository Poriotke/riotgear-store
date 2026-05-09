import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Plus, Check } from 'lucide-react'
import { formatPrice } from '../data/products'

export default function ProductCard({ product, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(null)
  const [added, setAdded] = useState(false)
  const [imgError, setImgError] = useState({ primary: false, hover: false })

  const handleAdd = () => {
    if (!selectedSize) {
      // Shake the size selector
      const el = document.getElementById(`sizes-${product.id}`)
      if (el) {
        el.classList.add('animate-[shake_0.4s_ease]')
        setTimeout(() => el.classList.remove('animate-[shake_0.4s_ease]'), 400)
      }
      return
    }
    onAddToCart(product, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  // Fallback gradient placeholder
  const fallbackStyle = {
    background: `linear-gradient(135deg, #111 0%, #1a1a1a 50%, #111 100%)`,
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col bg-[#0d0d0d] border border-white/[0.06] rounded-sm overflow-hidden card-hover"
    >
      {/* Image Container */}
      <div className="product-img-wrap aspect-[3/4] bg-[#111] relative">
        {/* Primary Image */}
        {!imgError.primary ? (
          <img
            src={product.image}
            alt={product.name}
            className="product-img-primary"
            loading="lazy"
            onError={() => setImgError(e => ({ ...e, primary: true }))}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center" style={fallbackStyle}>
            <div className="text-5xl mb-2">{product.category === 'jersey' ? '👕' : '🧢'}</div>
            <div className="text-xs text-gray-600 tracking-widest uppercase">{product.name}</div>
          </div>
        )}

        {/* Hover Image */}
        {!imgError.hover && (
          <img
            src={product.imageHover}
            alt={`${product.name} – alt view`}
            className="product-img-hover"
            loading="lazy"
            onError={() => setImgError(e => ({ ...e, hover: true }))}
          />
        )}

        {/* Badge */}
        {product.badge && (
          <div
            className="absolute top-3 left-3 px-2 py-1 text-[10px] font-bold tracking-[0.15em] uppercase rounded-sm z-10"
            style={{ background: product.badgeColor || '#39FF14', color: '#000' }}
          >
            {product.badge}
          </div>
        )}

        {/* Quick-add overlay (shows on hover) */}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
          <button
            onClick={handleAdd}
            className={`w-full py-2.5 text-xs font-bold tracking-[0.2em] uppercase rounded-sm flex items-center justify-center gap-2 transition-all duration-200 ${
              added
                ? 'bg-[#39FF14] text-black'
                : selectedSize
                ? 'bg-white text-black hover:bg-[#39FF14]'
                : 'bg-white/90 text-black hover:bg-[#39FF14]'
            }`}
          >
            {added ? (
              <><Check size={13} /> Added</>
            ) : (
              <><ShoppingCart size={13} /> {selectedSize ? `Add ${selectedSize}` : 'Select Size'}</>
            )}
          </button>
        </div>

        {/* Color dots */}
        <div className="absolute top-3 right-3 flex flex-col gap-1 z-10">
          {product.colors?.slice(0, 3).map((c, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full border border-white/20"
              style={{ background: c }}
            />
          ))}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        {/* Name & price */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-base sm:text-lg tracking-wide text-white leading-tight">
              {product.name}
            </h3>
            <p className="text-gray-600 text-[11px] tracking-[0.1em] mt-0.5">{product.tagline}</p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-[#39FF14] font-bold text-sm tracking-wide">{formatPrice(product.price)}</div>
          </div>
        </div>

        {/* Size Selector */}
        <div id={`sizes-${product.id}`} className="flex flex-wrap gap-1.5">
          {product.sizes.map(size => (
            <button
              key={size}
              onClick={() => setSelectedSize(s => s === size ? null : size)}
              className={`px-2.5 py-1 text-[10px] font-medium tracking-[0.1em] uppercase border rounded-sm transition-all duration-150 ${
                selectedSize === size
                  ? 'border-[#39FF14] bg-[#39FF14]/10 text-[#39FF14]'
                  : 'border-white/10 text-gray-500 hover:border-white/30 hover:text-white'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAdd}
          className={`mt-auto w-full py-2.5 text-xs font-bold tracking-[0.2em] uppercase rounded-sm flex items-center justify-center gap-2 border transition-all duration-200 ${
            added
              ? 'bg-[#39FF14] border-[#39FF14] text-black'
              : 'border-white/10 text-gray-400 hover:border-[#39FF14]/50 hover:text-[#39FF14] hover:bg-[#39FF14]/5'
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {added ? (
              <motion.span
                key="check"
                initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                className="flex items-center gap-1.5"
              >
                <Check size={13} /> Added to Cart
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                className="flex items-center gap-1.5"
              >
                <Plus size={13} /> Add to Cart
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  )
}
