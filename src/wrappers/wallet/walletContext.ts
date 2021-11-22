import { createContext } from 'react'

export interface ContextValues {
  login(): void
  logout(): void
  openWallet(): void
  status: string
  account: string
}

const Context = createContext<ContextValues>({
  login() {},
  logout() {},
  openWallet() {},
  status: '',
  account: ''
})

export default Context
