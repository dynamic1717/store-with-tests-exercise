import { useCartStore } from '@shared/hooks'
import { IPraise } from '@shared/types/types'
import { Minus, Plus } from 'lucide-react'
import dynamic from 'next/dynamic'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

interface Props {
  item: IPraise
}

export const CartItem = ({ item }: Props) => {
  const { addToCart, removeFromCart, getCartItemAmount } = useCartStore()

  return (
    <div className="flex items-center gap-x-4 rounded-2xl border border-solid px-2 py-1">
      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-solid">
        <Lottie animationData={item.animationData} loop={true} />
      </div>
      <div>
        <h4 className="font-semibold">{item.title}</h4>
        <p className="mt-1 text-sm">{item.description}</p>
      </div>

      <div className="ml-auto flex w-10 shrink-0 flex-col items-center gap-y-2">
        <button onClick={() => addToCart(item)} className="bg-secondary">
          <Plus size={16} />
        </button>
        <span className="flex items-center justify-center text-xl font-semibold">
          {getCartItemAmount(item)}
        </span>
        <button onClick={() => removeFromCart(item)} className="bg-secondary">
          <Minus size={16} />
        </button>
      </div>
    </div>
  )
}
