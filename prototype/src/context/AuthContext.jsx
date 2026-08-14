import { createContext, useContext, useState } from 'react'
import { demoCustomer } from '../data.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [signedIn, setSignedIn] = useState(false)
  const [customer, setCustomer] = useState(demoCustomer)

  const signIn = (details) => {
    if (details) {
      setCustomer((current) => ({ ...current, ...details }))
    }
    setSignedIn(true)
  }

  const signOut = () => setSignedIn(false)

  const value = { signedIn, customer, signIn, signOut }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider')
  }
  return context
}
