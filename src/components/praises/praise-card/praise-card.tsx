import { IPraise } from '@shared/types/types'
import { Button } from '@shared/ui'
import { Minus, Plus, ShoppingBasket } from 'lucide-react'

interface Props {
  data: IPraise
}

export const PraiseCard = ({ data }: Props) => {
  const amountInCart = 0

  return (
    <article className="flex flex-col rounded-3xl bg-white p-5 shadow-lg">
      <div className="border-accent mx-auto flex aspect-square h-[12.5rem] items-center justify-center rounded-3xl border">
        Lottie
      </div>

      <div className="mb-6 mt-4">
        <h4 className="text-xl font-semibold">{data.title}</h4>
        <p className="text-dark mt-1">{data.description}</p>
      </div>

      <div className="mt-auto flex items-center justify-between">
        {amountInCart > 0 ? (
          <div className="flex items-center gap-4">
            <button className="bg-secondary flex h-10 w-10 items-center justify-center rounded p-2 font-semibold">
              <Minus />
            </button>
            <span className="text-primary text-lg font-semibold">{amountInCart}</span>
            <button className="bg-secondary flex h-10 w-10 items-center justify-center rounded p-2 font-semibold">
              <Plus />
            </button>
          </div>
        ) : (
          <Button className="ml-auto flex w-1/2 items-center justify-center gap-2">
            <ShoppingBasket className="h-6 w-6" />
            <span>Add to cart</span>
          </Button>
        )}
      </div>
    </article>
  )
}
