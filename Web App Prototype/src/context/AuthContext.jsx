import { createContext, useContext, useState } from 'react'
import { currentUser as initialUser } from '../data.js'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(initialUser || null)

  function login(profile) {
    setUser(profile)
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
