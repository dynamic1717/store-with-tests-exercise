import { IPraise } from '@shared/types/types'
import { render, screen } from '@testing-library/react'
import { PraisesList } from '../praises-list'

const mockPraises: IPraise[] = [
  {
    id: 1,
    title: 'Test Praise 1',
    description: 'This is a test praise 1',
    animationData: null,
  },
  {
    id: 2,
    title: 'Test Praise 2',
    description: 'This is a test praise 2',
    animationData: null,
  },
]

describe('PraisesList', () => {
  it('should render the list with correct number of items', () => {
    render(<PraisesList data={mockPraises} />)
    const praiseCardElements = screen.getAllByRole('article')
    expect(praiseCardElements).toHaveLength(mockPraises.length)
  })

  it('should render the no found message when no items are passed', () => {
    render(<PraisesList data={[]} />)
    const noPraisesFoundElement = screen.getByText(/no praises found/i)
    expect(noPraisesFoundElement).toBeInTheDocument()
  })
})
