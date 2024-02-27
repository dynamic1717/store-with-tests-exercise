import { cn } from '@shared/utils'
import { Header } from './header'

interface Props extends React.ComponentPropsWithoutRef<'main'> {
  children: React.ReactNode
}

export const MainLayout = ({ children, className, ...rest }: Props) => {
  return (
    <>
      <Header />

      <main {...rest} className={cn('container', className)}>
        {children}
      </main>
    </>
  )
}
