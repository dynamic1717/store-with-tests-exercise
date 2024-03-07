'use client'

import { useCartStore, useModal } from '@shared/hooks'
import { Cake, ShoppingBasket } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Props extends React.ComponentPropsWithoutRef<'header'> {}

export const Header = ({ ...rest }: Props) => {
  const { onOpen } = useModal()
  const { cart } = useCartStore()
  const [cartItemsCount, setCartItemsCount] = useState(0)

  useEffect(() => {
    setCartItemsCount(cart.reduce((acc, item) => acc + item.amount, 0))
  }, [cart])

  return (
    <header {...rest} className="container py-4">
      <div className="flex items-start justify-between">
        <Link href="/" className="flex items-center gap-1 text-xl font-bold">
          <Cake size={48} className="h-8 w-8" />
          <span>Praise Yourself</span>
        </Link>

        <button
          className="relative flex items-center gap-2 rounded-2xl bg-white px-4 py-3"
          onClick={() => onOpen('cart')}
          data-testid="cart-button"
        >
          <ShoppingBasket size={24} className="h-6 w-6" />
          <span className="font-semibold">Cart</span>

          {cartItemsCount > 0 && (
            <span
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white"
              data-testid="cart-amount-badge"
            >
              {cartItemsCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
