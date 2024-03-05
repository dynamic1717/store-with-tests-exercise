import { cn } from '@shared/utils'
import { Header } from './header'
import { ModalProvider } from '@components/providers'
import { CheckoutOverlay } from '@components/checkout-overlay'

interface Props extends React.ComponentPropsWithoutRef<'main'> {
  children: React.ReactNode
}

export const MainLayout = ({ children, className, ...rest }: Props) => {
  return (
    <>
      <Header />

      <main {...rest} className={cn('container pb-16', className)}>
        {children}
      </main>

      <ModalProvider />
      <CheckoutOverlay />
    </>
  )
}
