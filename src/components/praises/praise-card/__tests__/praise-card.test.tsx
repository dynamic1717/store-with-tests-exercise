import { render, screen } from '@testing-library/react'
import { PraiseCard } from '../praise-card'
import { IPraise } from '@shared/types/types'
import { userEvent } from '@testing-library/user-event'
import { useCartStore } from '@shared/hooks'

const mockData: IPraise = {
  id: 1,
  title: 'Test Praise',
  description: 'This is a test praise',
  animationData: null,
}

describe('PraiseCard', () => {
  describe('Render', () => {
    it('renders the praise card', () => {
      renderComponent(mockData)
      const praiseCardElement = screen.getByRole('article')
      expect(praiseCardElement).toBeInTheDocument()
    })

    it('renders the praise title', () => {
      renderComponent(mockData)
      const titleElement = screen.getByText(mockData.title)
      expect(titleElement).toBeInTheDocument()
    })

    it('renders the praise description', () => {
      renderComponent(mockData)
      const descriptionElement = screen.getByText(mockData.description)
      expect(descriptionElement).toBeInTheDocument()
    })

    it('renders the add to cart button', () => {
      renderComponent(mockData)
      const addToCartButton = screen.getByTestId('add-to-cart-button')
      expect(addToCartButton).toBeInTheDocument()
    })
  })

  describe('Behavior', () => {
    it('should show cart amount and controls when add to cart button is clicked', async () => {
      const user = userEvent.setup()
      renderComponent(mockData)

      const addToCartButton = screen.getByTestId('add-to-cart-button')
      await user.click(addToCartButton)

      expect(addToCartButton).not.toBeInTheDocument()

      const increaseAmountInCartButton = await screen.findByTestId(
        'increase-amount-in-cart-button'
      )
      const decreaseAmountInCartButton = await screen.findByTestId(
        'decrease-amount-in-cart-button'
      )
      const amountInCart = await screen.findByTestId('amount-in-cart')
      expect(increaseAmountInCartButton).toBeInTheDocument()
      expect(decreaseAmountInCartButton).toBeInTheDocument()
      expect(amountInCart).toHaveTextContent('1')
    })

    it('should increase the amount in cart when the increase button is clicked', async () => {
      const user = userEvent.setup()
      useCartStore.setState({ cart: [{ item: mockData, amount: 1 }] })
      renderComponent(mockData)

      const amountInCart = screen.getByTestId('amount-in-cart')
      expect(amountInCart).toHaveTextContent('1')

      const increaseAmountInCartButton = screen.getByTestId(
        'increase-amount-in-cart-button'
      )
      await user.click(increaseAmountInCartButton)

      expect(amountInCart).toHaveTextContent('2')
    })

    it('should decrease the amount in cart when the decrease button is clicked', async () => {
      const user = userEvent.setup()
      useCartStore.setState({ cart: [{ item: mockData, amount: 2 }] })
      renderComponent(mockData)

      const decreaseAmountInCartButton = screen.getByTestId(
        'decrease-amount-in-cart-button'
      )
      await user.click(decreaseAmountInCartButton)
      const amountInCart = screen.getByTestId('amount-in-cart')

      expect(amountInCart).toHaveTextContent('1')
    })

    it('should hide the increase and decrease buttons when the amount in cart is 0', async () => {
      const user = userEvent.setup()
      useCartStore.setState({ cart: [{ item: mockData, amount: 1 }] })
      renderComponent(mockData)

      const decreaseAmountInCartButton = screen.getByTestId(
        'decrease-amount-in-cart-button'
      )
      const increaseAmountInCartButton = screen.getByTestId(
        'increase-amount-in-cart-button'
      )
      await user.click(decreaseAmountInCartButton)

      expect(increaseAmountInCartButton).not.toBeInTheDocument()
      expect(decreaseAmountInCartButton).not.toBeInTheDocument()
    })
  })
})

const renderComponent = (mockData: IPraise) => {
  return render(<PraiseCard data={mockData} />)
}
