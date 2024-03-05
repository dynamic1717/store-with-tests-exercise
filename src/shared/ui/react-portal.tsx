'use client'

import React, { useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  children: React.ReactNode
  wrapperId?: string
}

export const ReactPortal = ({ children, wrapperId = 'react-portal-wrapper' }: Props) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null)

  function createWrapperAndAppendToBody(wrapperId: string) {
    const wrapperElement = document.createElement('div')
    wrapperElement.setAttribute('id', wrapperId)
    document.body.appendChild(wrapperElement)
    return wrapperElement
  }

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId)
    let systemCreated = false

    if (!element) {
      systemCreated = true
      element = createWrapperAndAppendToBody(wrapperId)
    }
    setWrapperElement(element)

    return () => {
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element)
      }
    }
  }, [wrapperId])

  if (!wrapperElement) return null

  return createPortal(children, wrapperElement)
}
