import { render, screen } from '@testing-library/react'
import { CheckoutOverlay } from '..'
import { useCheckoutStore } from '@shared/hooks'

describe('CheckoutOverlay', () => {
  it('should not render anything when there are no items', () => {
    const { container } = render(<CheckoutOverlay />)
    expect(container).toBeEmptyDOMElement()
  })

  it('should render the overlay with correct number of items', () => {
    useCheckoutStore.setState({
      items: [
        {
          item: {
            id: 1,
            title: 'Test item',
            description: 'Test item',
            animationData: null,
          },
          quantity: 1,
        },
      ],
    })
    render(<CheckoutOverlay />)

    const items = screen.getAllByTestId('checkout-item')
    expect(items).toHaveLength(1)
  })
})
