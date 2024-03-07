import { render, screen } from '@testing-library/react'
import { CartModal } from '..'
import { useCartStore, useCheckoutStore, useModal } from '@shared/hooks'
import { IPraise } from '@shared/types/types'
import userEvent from '@testing-library/user-event'

const mockCartItem: { item: IPraise; amount: number } = {
  item: {
    id: 1,
    title: 'Test title',
    description: 'Test description',
    animationData: null,
  },
  amount: 1,
}

describe('CartModal', () => {
  it('should render empty cart message', () => {
    renderComponent()

    const emptyCartMessage = screen.getByText(/Your cart is empty/i, { exact: false })

    expect(emptyCartMessage).toBeInTheDocument()
  })

  it('should render checkout button disabled when cart is empty', () => {
    renderComponent()

    const checkoutButton = screen.getByRole('button', { name: /checkout/i })

    expect(checkoutButton).toBeDisabled()
  })

  it('should render checkout button enabled when cart is not empty', () => {
    useCartStore.setState({
      cart: [mockCartItem],
    })
    renderComponent()

    const checkoutButton = screen.getByRole('button', { name: /checkout/i })

    expect(checkoutButton).toBeEnabled()
  })

  it('should render cart items', () => {
    useCartStore.setState({
      cart: [mockCartItem],
    })
    renderComponent()

    const cartItem = screen.getByText('Test title')

    expect(cartItem).toBeInTheDocument()
  })

  it('should clear cart and close the modal on checkout', async () => {
    const setCheckoutItems = jest.fn()
    const clearCart = jest.fn()
    useCartStore.setState({
      cart: [mockCartItem],
    })
    useCheckoutStore.setState({ setItems: setCheckoutItems })
    useCartStore.setState({ clearCart })
    const user = userEvent.setup()
    renderComponent()

    const checkoutButton = screen.getByRole('button', { name: /checkout/i })
    await user.click(checkoutButton)

    expect(setCheckoutItems).toHaveBeenCalledWith([
      { item: mockCartItem.item, quantity: mockCartItem.amount },
    ])
    expect(clearCart).toHaveBeenCalled()
    expect(useModal.getState().isOpen).toBe(false)
  })
})

const renderComponent = () => {
  useModal.setState({ isOpen: true, type: 'cart' })
  render(<CartModal />)
}
