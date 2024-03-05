'use client'

import { useCartStore } from '@shared/hooks'
import { IPraise } from '@shared/types/types'
import { Button } from '@shared/ui'
import { useLottie } from 'lottie-react'
import { Minus, Plus, ShoppingBasket } from 'lucide-react'

interface Props {
  data: IPraise
}

export const PraiseCard = ({ data }: Props) => {
  const { View } = useLottie({ animationData: data.animationData, loop: true })
  const { addToCart, removeFromCart, getCartItemAmount } = useCartStore()
  const amountInCart = getCartItemAmount(data)

  return (
    <article className="flex flex-col rounded-3xl bg-white p-5 shadow-lg">
      <div className="mx-auto flex aspect-square h-[12.5rem] items-center justify-center rounded-3xl border border-accent">
        {View}
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
            >
              <Minus />
            </button>
            <span className="text-lg font-semibold text-primary">{amountInCart}</span>
            <button
              className="flex h-10 w-10 items-center justify-center rounded bg-secondary p-2 font-semibold"
              onClick={() => addToCart(data)}
            >
              <Plus />
            </button>
          </div>
        ) : (
          <Button
            className="ml-auto flex w-1/2 items-center justify-center gap-2"
            onClick={() => addToCart(data)}
          >
            <ShoppingBasket className="h-6 w-6" />
            <span>Add to cart</span>
          </Button>
        )}
      </div>
    </article>
  )
}
