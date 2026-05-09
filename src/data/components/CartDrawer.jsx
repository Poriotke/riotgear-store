import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react'
import { formatPrice } from '../data/products'

function CartItem({ item, onRemove, onUpdateQty }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30, height: 0, marginBottom: 0, padding: 0 }}
      transition={{ duration: 0.25 }}
      className="flex gap-3 py-4 border-b border-white/[0.06] last:border-0"
    >
      {/* Thumbnail */}
      <div className="w-16 h-20 bg-[#111] rounded-sm overflow-hidden shrink-0 border border-white/5">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={e => { e.target.style.display = 'none' }}
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="text-sm font-medium text-white leading-tight truncate">{item.name}</h4>
          <button
            onClick={() => onRemove(item.key)}
            className="text-gray-600 hover:text-[#FF2D78] transition-colors shrink-0"
            aria-label="Remove item"
          >
            <X size={14} />
          </button>
        </div>
        <div className="text-[11px] text-gray-600 mb-2 tracking-wide">
          Size: <span className="text-gray-400">{item.size}</span>
        </div>

        <div className="flex items-center justify-between">
          {/* Qty controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onUpdateQty(item.key, -1)}
              className="w-6 h-6 rounded-sm border border-white/10 flex items-center justify-center text-gray-400 hover:border-white/30 hover:text-white transition-all"
            >
              <Minus size={11} />
            </button>
            <span className="w-8 text-center text-sm font-medium text-white">{item.qty}</span>
            <button
              onClick={() => onUpdateQty(item.key, +1)}
              className="w-6 h-6 rounded-sm border border-white/10 flex items-center justify-center text-gray-400 hover:border-[#39FF14]/40 hover:text-[#39FF14] transition-all"
            >
              <Plus size={11} />
            </button>
          </div>
          {/* Line total */}
          <span className="text-[#39FF14] text-sm font-bold">
            {formatPrice(item.price * item.qty)}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function CartDrawer({ open, cart, onClose, onRemove, onUpdateQty, onClear, onCheckout }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const itemCount = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="cart-drawer"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 280, damping: 32 }}
          className="fixed top-0 right-0 bottom-0 w-full max-w-sm z-50 flex flex-col bg-[#080808] border-l border-white/[0.06] shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-[#39FF14]" />
              <span className="font-display text-xl tracking-wider text-white">Your Cart</span>
              {itemCount > 0 && (
                <span className="text-[10px] bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/20 px-2 py-0.5 rounded-full font-medium">
                  {itemCount} item{itemCount !== 1 ? 's' : ''}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={onClear}
                  className="text-gray-600 hover:text-[#FF2D78] transition-colors p-1"
                  aria-label="Clear cart"
                >
                  <Trash2 size={15} />
                </button>
              )}
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-1"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-5 overscroll-contain">
            <AnimatePresence initial={false}>
              {cart.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full gap-4 py-20 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#111] flex items-center justify-center">
                    <ShoppingBag size={24} className="text-gray-700" />
                  </div>
                  <p className="text-gray-600 text-sm tracking-wide">Your cart is empty</p>
                  <button
                    onClick={onClose}
                    className="text-[#39FF14] text-xs tracking-[0.2em] uppercase flex items-center gap-1.5 hover:gap-3 transition-all duration-200"
                  >
                    Browse Catalogue <ArrowRight size={12} />
                  </button>
                </motion.div>
              ) : (
                cart.map(item => (
                  <CartItem
                    key={item.key}
                    item={item}
                    onRemove={onRemove}
                    onUpdateQty={onUpdateQty}
                  />
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="px-5 py-5 border-t border-white/[0.06] space-y-4">
              {/* Subtotal */}
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm tracking-wide uppercase text-xs">Subtotal</span>
                <span className="text-white font-bold text-lg">{formatPrice(total)}</span>
              </div>

              {/* Shipping note */}
              <div className="text-[11px] text-gray-700 text-center tracking-wide">
                Shipping & payment confirmed via WhatsApp
              </div>

              {/* WhatsApp CTA */}
              <button
                onClick={onCheckout}
                className="group w-full py-4 bg-[#25D366] hover:bg-[#22C35E] text-white font-bold text-sm tracking-[0.15em] uppercase rounded-sm flex items-center justify-center gap-3 transition-all duration-200 hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]"
              >
                <MessageCircle size={18} />
                Order via WhatsApp
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-center text-gray-700 text-[10px] tracking-widest uppercase">
                Opens WhatsApp with your order details
              </p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
