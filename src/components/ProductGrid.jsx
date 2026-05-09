import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from './ProductCard'

export default function ProductGrid({ products, onAddToCart }) {
  return (
    <AnimatePresence mode="popLayout">
      {products.length === 0 ? (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="col-span-full flex flex-col items-center justify-center py-24 text-center"
        >
          <div className="text-5xl mb-4">🛒</div>
          <p className="text-gray-500 tracking-widest uppercase text-sm">No products found</p>
        </motion.div>
      ) : (
        <motion.div
          key="grid"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5"
        >
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
