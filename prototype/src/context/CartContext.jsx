import { createContext, useContext, useMemo, useState } from 'react'
import { products } from '../data.js'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addItem = (productId, qty = 1) => {
    setItems((current) => {
      const existing = current.find((i) => i.productId === productId)
      if (existing) {
        return current.map((i) =>
          i.productId === productId ? { ...i, qty: i.qty + qty } : i
        )
      }
      return [...current, { productId, qty }]
    })
  }

  const updateQty = (productId, qty) => {
    setItems((current) =>
      qty <= 0
        ? current.filter((i) => i.productId !== productId)
        : current.map((i) => (i.productId === productId ? { ...i, qty } : i))
    )
  }

  const removeItem = (productId) => {
    setItems((current) => current.filter((i) => i.productId !== productId))
  }

  const clearCart = () => setItems([])

  const cartLines = useMemo(() => {
    return items
      .map((i) => {
        const product = products.find((p) => p.id === i.productId)
        return product ? { ...i, product } : null
      })
      .filter(Boolean)
  }, [items])

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items])
  const subtotal = useMemo(
    () => cartLines.reduce((sum, l) => sum + l.qty * l.product.price, 0),
    [cartLines]
  )

  const value = {
    items,
    cartLines,
    itemCount,
    subtotal,
    addItem,
    updateQty,
    removeItem,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used inside a CartProvider')
  }
  return context
}
