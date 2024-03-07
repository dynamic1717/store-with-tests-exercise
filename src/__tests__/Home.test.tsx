import { render, screen, within } from '@testing-library/react'
import Home from '@app/page'
import userEvent from '@testing-library/user-event'

describe('Home', () => {
  it('Should render', () => {
    renderComponent()

    const title = screen.getByTestId('home-title')
    expect(title).toBeInTheDocument()

    const catchPhrase = screen.getByText(
      /Do you ever feel like you need a little pick-me-up?/i
    )
    expect(catchPhrase).toBeInTheDocument()

    const heading = screen.getByRole('heading', { name: /Welcome to Praise Yourself/i })
    expect(heading).toBeInTheDocument()
  })

  it('should open the cart modal when the cart button is clicked', async () => {
    renderComponent()

    const cartButton = screen.getByTestId('cart-button')
    await userEvent.click(cartButton)

    const modal = await screen.findByTestId('cart-modal')
    expect(modal).toBeInTheDocument()
  })

  it('should render badge when the add to cart button is clicked', async () => {
    renderComponent()

    const item = screen.getAllByRole('article')[0]
    const addToCartButton = within(item).getByRole('button', { name: /Add to cart/i })
    await userEvent.click(addToCartButton)

    const cartBadge = await screen.findByTestId('cart-amount-badge')

    expect(cartBadge).toHaveTextContent('1')
  })

  it('should display added items in the cart modal', async () => {
    renderComponent()

    const item = screen.getAllByRole('article')[0]
    const addToCartButton = within(item).getByRole('button')
    await userEvent.click(addToCartButton)

    const cartButton = screen.getByTestId('cart-button')
    await userEvent.click(cartButton)

    const cartModal = await screen.findByTestId('cart-modal')
    const cartItems = within(cartModal).getAllByTestId('cart-item')

    expect(cartItems).toHaveLength(1)
  })

  it('should remove items and close modal when checkout button is clicked', async () => {
    renderComponent()

    const item = screen.getAllByRole('article')[0]
    const addToCartButton = within(item).getByRole('button')
    await userEvent.click(addToCartButton)

    const cartButton = screen.getByTestId('cart-button')
    await userEvent.click(cartButton)

    const cartModal = await screen.findByTestId('cart-modal')
    const checkoutButton = within(cartModal).getByRole('button', { name: /Checkout/i })
    await userEvent.click(checkoutButton)

    const cartBadge = screen.queryByTestId('cart-amount-badge')
    expect(cartBadge).not.toBeInTheDocument()

    const modal = screen.queryByTestId('cart-modal')
    expect(modal).not.toBeInTheDocument()
  })

  it('should increase and decrease amount of items on the card when pressed on controls', async () => {
    renderComponent()

    const item = screen.getAllByRole('article')[0]
    const addToCartButton = within(item).getByRole('button')
    await userEvent.click(addToCartButton)

    const cardIncreaseButton = await screen.findByTestId('increase-amount-in-cart-button')
    await userEvent.click(cardIncreaseButton)

    const cartAmount = screen.getByTestId('amount-in-cart')
    expect(cartAmount).toHaveTextContent('2')

    const cardDecreaseButton = await screen.findByTestId('decrease-amount-in-cart-button')
    await userEvent.click(cardDecreaseButton)

    expect(cartAmount).toHaveTextContent('1')
  })

  it('should remove quantity controls when amount in cart is 0', async () => {
    renderComponent()

    const item = screen.getAllByRole('article')[0]
    const addToCartButton = within(item).getByRole('button')
    await userEvent.click(addToCartButton)

    const cardDecreaseButton = await screen.findByTestId('decrease-amount-in-cart-button')
    await userEvent.click(cardDecreaseButton)

    expect(cardDecreaseButton).not.toBeInTheDocument()
    expect(screen.queryByTestId('increase-amount-in-cart-button')).not.toBeInTheDocument()
    expect(screen.queryByTestId('amount-in-cart')).not.toBeInTheDocument()
  })

  it('should close the modal when the overlay is clicked', async () => {
    renderComponent()

    const cartButton = screen.getByTestId('cart-button')
    await userEvent.click(cartButton)

    const overlay = await screen.findByTestId('modal-overlay')
    await userEvent.click(overlay)

    const cartModal = screen.queryByTestId('cart-modal')
    expect(cartModal).not.toBeInTheDocument()
  })

  it('should show checkout overlay when checkout button is clicked', async () => {
    renderComponent()

    const item = screen.getAllByRole('article')[0]
    const addToCartButton = within(item).getByRole('button')
    await userEvent.click(addToCartButton)

    const cartButton = screen.getByTestId('cart-button')
    await userEvent.click(cartButton)

    const checkoutButton = screen.getByRole('button', { name: /Checkout/i })
    await userEvent.click(checkoutButton)

    const overlay = await screen.findByTestId('checkout-overlay')
    expect(overlay).toBeInTheDocument()
  })
})

const renderComponent = () => render(<Home />)
