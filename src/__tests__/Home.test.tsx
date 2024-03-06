import { render, screen } from '@testing-library/react'
import Home from '@app/page'

describe('Home', () => {
  it('Should have title', () => {
    render(<Home />)

    const el = screen.getByTestId('home-title')

    expect(el).toBeInTheDocument()
  })

  it('Subtitle should contain the catch', () => {
    render(<Home />)

    const el = screen.getByText(/Do you ever feel like you need a little pick-me-up?/i)

    expect(el).toBeInTheDocument()
  })

  it('Should have a heading', () => {
    render(<Home />)

    const el = screen.getByRole('heading', { name: /Welcome to Praise Yourself/i })

    expect(el).toBeInTheDocument()
  })
})
