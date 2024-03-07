import { cn } from '@shared/utils'
import { PraiseCard } from '../praise-card/praise-card'
import { IPraise } from '@shared/types/types'

interface Props {
  data: IPraise[]
  className?: string
}

export const PraisesList = ({ data, className }: Props) => {
  return (
    <div className={cn('grid grid-cols-3 gap-x-6 gap-y-8', className)}>
      {data.map((praise) => (
        <PraiseCard key={praise.id} data={praise} />
      ))}

      {data.length === 0 && (
        <p className="col-span-3 text-center text-lg font-bold">No praises found</p>
      )}
    </div>
  )
}
