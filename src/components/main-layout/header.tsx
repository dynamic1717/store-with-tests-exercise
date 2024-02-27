import { Cake, ShoppingBasket } from 'lucide-react'
import Link from 'next/link'

interface Props extends React.ComponentPropsWithoutRef<'header'> {}

export const Header = ({ ...rest }: Props) => {
  return (
    <header {...rest} className="container py-4">
      <div className="flex items-start justify-between">
        <Link href="/" className="flex items-center gap-1 text-xl font-bold">
          <Cake size={48} className="h-8 w-8" />
          Praise Yourself
        </Link>
        <button className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3">
          <ShoppingBasket size={24} className="h-6 w-6" />
          <span className="font-semibold">Cart</span>
        </button>
      </div>
    </header>
  )
}
