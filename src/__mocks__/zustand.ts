import { act } from 'react-dom/test-utils'
import { create as actualCreate } from 'zustand'

const storeResetFns = new Set<() => void>()

// when creating a store, we get its initial state, create a reset function and add it in the set
const create = (createState: any) => {
  const store = actualCreate<any>(createState)
  const initialState = store.getState()
  storeResetFns.add(() => store.setState(initialState, true))
  return store
}

// Reset all stores after each test run
afterEach(() => {
  act(() => storeResetFns.forEach((resetFn: any) => resetFn()))
})

export { create }
