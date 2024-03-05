'use client'

import React, { useEffect } from 'react'
import { ReactPortal } from './react-portal'
import { cn } from '@shared/utils'

interface Props {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  className?: string
}

export const ModalWrapper = ({ children, isOpen, onClose, className }: Props) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'
  }, [isOpen])

  useEffect(() => {
    const closeOnEscapeKey = (e: any) => (e.key === 'Escape' ? onClose() : null)
    document.body.addEventListener('keydown', closeOnEscapeKey)
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey)
    }
  }, [onClose])

  if (!isOpen) return null

  return (
    <ReactPortal wrapperId="modal-wrapper">
      <div
        className="fixed left-0 top-0 h-screen w-screen bg-black/40"
        onClick={() => onClose()}
      />
      <div
        className={cn(
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6',
          className
        )}
      >
        {children}
      </div>
    </ReactPortal>
  )
}
