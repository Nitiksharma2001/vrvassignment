import { useState, createContext, useEffect } from 'react'

export const GlobalContext = createContext()

export default function ContextWrapper({ children }) {
  const [roles, setRoles] = useState([
    { text: 'super_admin', deletable: false },
    { text: 'admin', deletable: false },
    { text: 'moderator', deletable: true },
    { text: 'normal', deletable: false },
  ])
  const [permissions, setPermissions] = useState([
    { text: 'create', deletable: true },
    { text: 'update', deletable: true },
    { text: 'delete', deletable: true },
    { text: 'none', deletable: false },
  ])

  useEffect(() => {
    const roles = localStorage.getItem('roles')
    const permissions = localStorage.getItem('permissions')
    if(roles){
      setRoles(JSON.parse(roles))
    }
    if(permissions){
      setPermissions(JSON.parse(permissions))
    }

  }, [])
  return (
    <GlobalContext.Provider
      value={{ roles, setRoles, permissions, setPermissions }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
