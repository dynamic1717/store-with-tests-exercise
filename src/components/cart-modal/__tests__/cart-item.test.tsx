import { render, screen } from '@testing-library/react'
import { CartItem } from '../cart-item'
import { IPraise } from '@shared/types/types'
import userEvent from '@testing-library/user-event'
import { useCartStore } from '@shared/hooks'

const mockItem: IPraise = {
  id: 1,
  title: 'Test title',
  description: 'Test description',
  animationData: null,
}

describe('CartItem', () => {
  describe('Render', () => {
    it('should render item and controls', () => {
      renderComponent()

      expect(screen.getByText('Test title')).toBeInTheDocument()
      expect(screen.getByText('Test description')).toBeInTheDocument()
      expect(screen.getByTestId('increase-amount-button')).toBeInTheDocument()
      expect(screen.getByTestId('decrease-amount-button')).toBeInTheDocument()
    })
  })

  describe('Behavior', () => {
    it('should increase amount when clicking on increase button', async () => {
      const user = userEvent.setup()
      renderComponent()

      const increaseButton = screen.getByTestId('increase-amount-button')
      await user.click(increaseButton)

      expect(screen.getByTestId('amount')).toHaveTextContent('1')
    })
  })

  it('should decrease amount when clicking on decrease button', async () => {
    const user = userEvent.setup()
    renderComponent()

    const decreaseButton = screen.getByTestId('decrease-amount-button')
    await user.click(decreaseButton)

    expect(screen.getByTestId('amount')).toHaveTextContent('0')
  })
})

const renderComponent = () => {
  render(<CartItem item={mockItem} />)
}
