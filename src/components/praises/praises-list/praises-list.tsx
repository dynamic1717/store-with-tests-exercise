import { cn } from '@shared/utils'
import { PraiseCard } from '../praise-card/praise-card'
import { PRAISES } from '@shared/constants'

interface Props {
  className?: string
}

export const PraisesList = ({ className }: Props) => {
  return (
    <div className={cn('grid grid-cols-3 gap-x-6 gap-y-8', className)}>
      {PRAISES.map((praise) => (
        <PraiseCard key={praise.id} data={praise} />
      ))}
    </div>
  )
}
