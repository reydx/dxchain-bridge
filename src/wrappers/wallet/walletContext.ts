import { createContext } from 'react'

export interface ContextValues {
  login(): void
  logout(): void
}

const Context = createContext<ContextValues>({
  login() {},
  logout() {},
})

export default Context
