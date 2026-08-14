import { createContext, useContext, useMemo, useState } from 'react'
import { products } from '../data.js'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  function addItem(id, qty = 1) {
    setItems((current) => {
      const existing = current.find((it) => it.id === id)
      if (existing) {
        return current.map((it) => (it.id === id ? { ...it, qty: it.qty + qty } : it))
      }
      return [...current, { id, qty }]
    })
  }

  function updateQty(id, qty) {
    setItems((current) =>
      qty <= 0 ? current.filter((it) => it.id !== id) : current.map((it) => (it.id === id ? { ...it, qty } : it))
    )
  }

  function removeItem(id) {
    setItems((current) => current.filter((it) => it.id !== id))
  }

  function clearCart() {
    setItems([])
  }

  const cartLines = useMemo(() => {
    return items
      .map((it) => {
        const product = products.find((p) => p.id === it.id)
        return product ? { ...it, product } : null
      })
      .filter(Boolean)
  }, [items])

  const itemCount = useMemo(() => items.reduce((sum, it) => sum + it.qty, 0), [items])
  const subtotal = useMemo(
    () => cartLines.reduce((sum, line) => sum + line.qty * line.product.price, 0),
    [cartLines]
  )

  const value = { items, cartLines, itemCount, subtotal, addItem, updateQty, removeItem, clearCart }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  return useContext(CartContext)
}
