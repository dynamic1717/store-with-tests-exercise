describe('Home', () => {
  it('Should render', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-testid=home-title]').should('exist')
    cy.contains(/Do you ever feel like you need a little pick-me-up?/i).should('exist')
    cy.get('h1')
      .contains(/Welcome to Praise Yourself/i)
      .should('exist')
  })

  it('Should add item to cart when the add to cart button is clicked', () => {
    cy.visit('http://localhost:3000')
    const item = cy.get('article').first()
    item.find('button').click()
    item.getTestId('amount-in-cart').should('have.text', '1')
    cy.getTestId('cart-amount-badge').should('have.text', '1')
  })

  it('Should increase or decrease amount of items in cart when plus/minus buttons is clicked', () => {
    cy.visit('http://localhost:3000')
    const item = cy.get('article').first()
    item.find('button').click()

    item.getTestId('increase-amount-in-cart-button').click()
    item.getTestId('amount-in-cart').should('have.text', '2')
    cy.getTestId('cart-amount-badge').should('have.text', '2')

    item.getTestId('decrease-amount-in-cart-button').click()
    item.getTestId('amount-in-cart').should('have.text', '1')
    cy.getTestId('cart-amount-badge').should('have.text', '1')

    item.getTestId('decrease-amount-in-cart-button').click()
    cy.getTestId('cart-amount-badge').should('not.exist')
  })

  it('Should remove last item from cart when remove button is clicked', () => {
    cy.visit('http://localhost:3000')
    const item = cy.get('article').first()
    item.find('button').click()
    item.getTestId('decrease-amount-in-cart-button').click()
    cy.getTestId('cart-amount-badge').should('not.exist')
  })

  it('Should open cart modal when cart button is clicked', () => {
    cy.visit('http://localhost:3000')
    cy.getTestId('cart-button').click()
    cy.getTestId('cart-modal').should('exist')
  })

  it('Should display added items in the cart modal', () => {
    cy.visit('http://localhost:3000')
    cy.get('article').first().find('button').click()
    cy.getTestId('cart-button').click()
    cy.getTestId('cart-item').should('exist')
  })

  it('Should increase amount of cart items in cart when plus button is clicked', () => {
    cy.visit('http://localhost:3000')
    cy.get('article').first().find('button').click()
    cy.getTestId('cart-button').click()
    cy.getTestId('increase-amount-button').click()
    cy.getTestId('amount').should('have.text', '2')
  })

  it('Should remove item and clear cart when remove button is clicked', () => {
    cy.visit('http://localhost:3000')
    cy.get('article').first().find('button').click()
    cy.getTestId('cart-button').click()
    cy.getTestId('decrease-amount-button').click()
    cy.getTestId('cart-item').should('not.exist')
  })

  it('Should close cart modal and clear cart when checkout button is clicked', () => {
    cy.visit('http://localhost:3000')
    cy.get('article').first().find('button').click()
    cy.getTestId('cart-button').click()
    cy.get('button')
      .contains(/Checkout/i)
      .click()
    cy.getTestId('cart-modal').should('not.exist')
    cy.getTestId('cart-amount-badge').should('not.exist')
  })

  it('Should show checkout overlay when checkout button is clicked', () => {
    cy.visit('http://localhost:3000')
    cy.get('article').first().find('button').click()
    cy.getTestId('cart-button').click()
    cy.get('button')
      .contains(/Checkout/i)
      .click()
    cy.getTestId('checkout-overlay').should('exist')
  })
})
