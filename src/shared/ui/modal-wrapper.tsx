'use client'

import React, { useEffect } from 'react'
import { ReactPortal } from './react-portal'

interface Props {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

export const ModalWrapper = ({children, isOpen, onClose}: Props) => {

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'
  }, [isOpen])

  useEffect(() => {
    const closeOnEscapeKey = (e: any) => e.key === "Escape" ? onClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [onClose]);

  if (!isOpen) return null

  return (
    <ReactPortal wrapperId='modal-wrapper'>
      <div className='fixed h-screen w-screen top-0 left-0 bg-black/40' onClick={() => onClose()} />
      <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-4 rounded-2xl'>{children}</div>
    </ReactPortal>
  )
}
