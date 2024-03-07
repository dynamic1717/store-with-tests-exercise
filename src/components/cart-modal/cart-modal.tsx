'use client'

import { useCartStore, useCheckoutStore, useModal } from '@shared/hooks'
import { Button, ModalWrapper } from '@shared/ui'
import { CartItem } from './cart-item'
import { Gift } from 'lucide-react'

export const CartModal = () => {
  const { type, isOpen, onClose } = useModal()
  const { cart, clearCart } = useCartStore()
  const { setItems } = useCheckoutStore()

  const isModalOpen = isOpen && type === 'cart'

  const onCheckout = () => {
    setItems(cart.map((el) => ({ item: el.item, quantity: el.amount })))
    clearCart()
    onClose()
  }

  return (
    <ModalWrapper
      isOpen={isModalOpen}
      onClose={onClose}
      className="w-[35rem]"
      data-testid="cart-modal"
    >
      <h3 className="text-xl font-semibold">Your precious cart</h3>

      <div className="mt-6 grid max-h-[30rem] grid-cols-1 gap-y-4 overflow-y-auto">
        {cart.map((el) => (
          <CartItem key={el.item.id} item={el.item} />
        ))}

        {cart.length === 0 && (
          <p className="text-center text-gray-500">
            Your cart is empty. <br />
            Come on! Give yourself a treat!
          </p>
        )}
      </div>

      <Button
        onClick={onCheckout}
        className="ml-auto mt-6 flex w-1/3 items-center justify-center"
        disabled={cart.length === 0}
      >
        <Gift size={20} className="mr-2" />
        <span>Checkout</span>
      </Button>
    </ModalWrapper>
  )
}
