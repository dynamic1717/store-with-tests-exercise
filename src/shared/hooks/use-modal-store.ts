import { create } from "zustand"

export type ModalType = 'cart'

interface IModalData {}

interface IModalStore {
  type: ModalType | null
  data: IModalData | null
  isOpen: boolean
  onOpen: (type: ModalType, data?: IModalData) => void
  onClose: () => void
}

export const useModal = create<IModalStore>((set) => ({
  type: null,
  data: null,
  isOpen: false,
  onOpen: (type, data) => set({ type, data, isOpen: true }),
  onClose: () => set({ type: null, data: null, isOpen: false }),
}))
