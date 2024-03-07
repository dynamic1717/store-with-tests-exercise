import { render, screen } from '@testing-library/react'
import { Header } from '../header'
import { useCartStore } from '@shared/hooks'

describe('Header', () => {
  it('should not render badge when cart is empty', async () => {
    render(<Header />)

    const badge = screen.queryByTestId('cart-amount-badge')

    expect(badge).not.toBeInTheDocument()
  })

  it('should render badge and correct amount when cart is not empty', () => {
    useCartStore.setState({
      cart: [
        {
          item: { id: 1, title: '', description: '', animationData: null },
          amount: 1,
        },
        {
          item: { id: 2, title: '', description: '', animationData: null },
          amount: 2,
        },
      ],
    })
    render(<Header />)

    const badge = screen.getByTestId('cart-amount-badge')

    expect(badge).toBeInTheDocument()
    expect(badge).toHaveTextContent('3')
  })
})
