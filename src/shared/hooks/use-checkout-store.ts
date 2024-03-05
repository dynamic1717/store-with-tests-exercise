import { IPraise } from '@shared/types/types'
import { create } from 'zustand'

interface ICheckoutItem {
  item: IPraise
  quantity: number
}

interface ICheckoutStore {
  items: ICheckoutItem[]
  setItems: (items: ICheckoutItem[]) => void
  clearItems: () => void
}

export const useCheckoutStore = create<ICheckoutStore>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  clearItems: () => set({ items: [] }),
}))
