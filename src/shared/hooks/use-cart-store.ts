import { IPraise } from '@shared/types/types'
import { create } from 'zustand'

interface ICartItem {
  item: IPraise
  amount: number
}

interface ICartStore {
  cart: ICartItem[]
  addToCart: (item: IPraise) => void
  removeFromCart: (item: IPraise) => void
  getCartItemAmount: (item: IPraise) => number
  clearCart: () => void
}

const LS_CART_KEY = 'praise-yourself-cart'

const getInitialCart = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem(LS_CART_KEY) || '[]')
  }
  return []
}

export const useCartStore = create<ICartStore>((set, get) => ({
  cart: getInitialCart(),

  addToCart: (item) => {
    const cart = get().cart
    const cartItem = cart.find((cartItem) => cartItem.item.id === item.id)

    if (cartItem) {
      cartItem.amount += 1
      set({ cart: [...cart] })
      localStorage.setItem(LS_CART_KEY, JSON.stringify([...cart]))
    } else {
      const newCart = [...cart, { item, amount: 1 }]
      set({ cart: newCart })
      localStorage.setItem(LS_CART_KEY, JSON.stringify(newCart))
    }
  },

  removeFromCart: (item) => {
    const cart = get().cart
    const cartItem = cart.find((cartItem) => cartItem.item.id === item.id)

    if (cartItem) {
      if (cartItem.amount === 1) {
        const filteredCart = cart.filter((cartItem) => cartItem.item.id !== item.id)
        set({ cart: [...filteredCart] })
        localStorage.setItem(LS_CART_KEY, JSON.stringify([...filteredCart]))
      } else {
        cartItem.amount -= 1
        set({ cart: [...cart] })
        localStorage.setItem(LS_CART_KEY, JSON.stringify([...cart]))
      }
    }
  },

  getCartItemAmount: (item) => {
    const cart = get().cart
    const cartItem = cart.find((cartItem) => cartItem.item.id === item.id)

    return cartItem?.amount || 0
  },

  clearCart: () => {
    set({ cart: [] })
    localStorage.removeItem(LS_CART_KEY)
  },
}))
