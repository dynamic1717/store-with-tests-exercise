'use client'

import { useCartStore } from '@shared/hooks'
import { IPraise } from '@shared/types/types'
import { Button } from '@shared/ui'
import { Minus, Plus, ShoppingBasket } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

interface Props {
  data: IPraise
}

export const PraiseCard = ({ data }: Props) => {
  const { addToCart, removeFromCart, getCartItemAmount, cart } = useCartStore()
  const [amountInCart, setAmountInCart] = useState(0)

  useEffect(() => {
    setAmountInCart(getCartItemAmount(data))
  }, [cart, data, getCartItemAmount])

  return (
    <article className="flex flex-col rounded-3xl bg-white p-5 shadow-lg">
      <div className="mx-auto flex aspect-square h-[12.5rem] items-center justify-center rounded-3xl border border-accent">
        <Lottie animationData={data.animationData} loop={true} />
      </div>

      <div className="mb-6 mt-4">
        <h4 className="text-xl font-semibold">{data.title}</h4>
        <p className="mt-1 text-dark">{data.description}</p>
      </div>

      <div className="mt-auto flex items-center justify-between">
        {amountInCart > 0 ? (
          <div className="ml-auto flex items-center gap-4">
            <button
              className="flex h-10 w-10 items-center justify-center rounded bg-secondary p-2 font-semibold"
              onClick={() => removeFromCart(data)}
              data-testid="decrease-amount-in-cart-button"
            >
              <Minus />
            </button>
            <span
              className="text-lg font-semibold text-primary"
              data-testid="amount-in-cart"
            >
              {amountInCart}
            </span>
            <button
              className="flex h-10 w-10 items-center justify-center rounded bg-secondary p-2 font-semibold"
              onClick={() => addToCart(data)}
              data-testid="increase-amount-in-cart-button"
            >
              <Plus />
            </button>
          </div>
        ) : (
          <Button
            className="ml-auto flex w-1/2 items-center justify-center gap-2"
            onClick={() => addToCart(data)}
            data-testid="add-to-cart-button"
          >
            <ShoppingBasket className="h-6 w-6" />
            <span>Add to cart</span>
          </Button>
        )}
      </div>
    </article>
  )
}
