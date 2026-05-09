import React, { useState, useCallback, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FilterTabs from './components/FilterTabs'
import ProductGrid from './components/ProductGrid'
import CartDrawer from './components/CartDrawer'
import Footer from './components/Footer'
import { products } from './data/products'

export default function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [badgePop, setBadgePop] = useState(false)

  // Add item to cart (with size)
  const addToCart = useCallback((product, size) => {
    setCart(prev => {
      const key = `${product.id}-${size}`
      const existing = prev.find(i => i.key === key)
      if (existing) {
        return prev.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...product, size, qty: 1, key }]
    })
    setBadgePop(true)
    setTimeout(() => setBadgePop(false), 350)
  }, [])

  const removeFromCart = useCallback((key) => {
    setCart(prev => prev.filter(i => i.key !== key))
  }, [])

  const updateQty = useCallback((key, delta) => {
    setCart(prev =>
      prev
        .map(i => i.key === key ? { ...i, qty: Math.max(0, i.qty + delta) } : i)
        .filter(i => i.qty > 0)
    )
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  // WhatsApp checkout
  const handleCheckout = useCallback(() => {
    if (cart.length === 0) return
    const itemLines = cart
      .map(i => `  • ${i.name} (Size: ${i.size}) x${i.qty} — KES ${(i.price * i.qty).toLocaleString('en-KE')}`)
      .join('\n')
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
    const message =
      `Hello! 👋 I want to order from RIOTGEAR:\n\n${itemLines}\n\n` +
      `💰 Total: KES ${total.toLocaleString('en-KE')}\n\n` +
      `Please confirm availability and payment details. Thank you! 🙏`
    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/254706270921?text=
    ${encoded}`, '_blank', 'noopener,noreferrer')
  }, [cart])

  // Lock scroll when cart open
  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [cartOpen])

  const filtered = activeFilter === 'all'
    ? products
    : products.filter(p => p.category === activeFilter)

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar
        cartCount={cartCount}
        badgePop={badgePop}
        onCartOpen={() => setCartOpen(true)}
      />

      <main>
        <Hero />

        <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#39FF14]/30 to-transparent" />
            <h2 className="font-display text-3xl sm:text-4xl tracking-widest text-white uppercase">
              The Catalogue
            </h2>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#39FF14]/30 to-transparent" />
          </div>
          <p className="text-center text-gray-500 text-sm mb-8 tracking-widest uppercase">
            Premium drops — order direct via WhatsApp
          </p>

          <FilterTabs active={activeFilter} onChange={setActiveFilter} />

          <ProductGrid products={filtered} onAddToCart={addToCart} />
        </section>
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
        onUpdateQty={updateQty}
        onClear={clearCart}
        onCheckout={handleCheckout}
      />

      {/* Overlay */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          onClick={() => setCartOpen(false)}
        />
      )}
    </div>
  )
}
