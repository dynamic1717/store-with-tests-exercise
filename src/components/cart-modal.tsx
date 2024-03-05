'use client'

import { useModal } from '@shared/hooks'
import { ModalWrapper } from '@shared/ui'

export const CartModal = () => {
  const { type, isOpen, onClose } = useModal()

  const isModalOpen = isOpen && type === 'cart'

  return (
    <ModalWrapper isOpen={isModalOpen} onClose={onClose}>
      <div>CarModal</div>
    </ModalWrapper>
  )
}
