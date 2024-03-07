'use client'

import { useCheckoutStore } from '@shared/hooks'
import { ReactPortal } from '@shared/ui/react-portal'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

export const CheckoutOverlay = () => {
  const { items, clearItems } = useCheckoutStore()

  const getRandomScreenPosition = () => {
    const padding = 100
    const x = Math.random() * (window.innerWidth - padding * 2) + padding
    const y = Math.random() * (window.innerHeight - padding * 2) + padding

    return { x, y }
  }

  useEffect(() => {
    if (!items.length) return

    const animationDuration = 2000
    const timeout = setTimeout(() => {
      clearItems()
    }, animationDuration)

    return () => {
      clearTimeout(timeout)
    }
  }, [clearItems, items])

  if (items.length === 0) return null

  return (
    <ReactPortal wrapperId="checkout-overlay">
      <div
        className="fixed left-0 top-0 h-screen w-screen bg-white/70"
        data-testid="checkout-overlay"
      >
        {items.map((item) =>
          Array.from({ length: item.quantity }).map((_, index) => (
            <div
              key={item.item.id + index}
              className="absolute h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                top: getRandomScreenPosition().y,
                left: getRandomScreenPosition().x,
              }}
              data-testid="checkout-item"
            >
              <Lottie animationData={item.item.animationData} loop={false} />
            </div>
          ))
        )}

        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-2xl font-semibold">
          Keep on keeping on! <br />
          You will go through this!
        </p>
      </div>
    </ReactPortal>
  )
}
