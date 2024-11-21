import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/context'

export default function Modal({ user, setUsers, setModalId }) {
  const [selectedRole, setSelectedRole] = useState('')
  const [selectedPermissions, setSelectedPermissions] = useState([])
  const { roles, permissions } = useContext(GlobalContext)

  useEffect(() => {
    setSelectedRole(user ? user.role : '')
    setSelectedPermissions(user ? user.permissions : [])
  }, [user])

  function onSave() {
    setUsers((users) => {
      const updatedUsers = users.map((currentUser) => {
        if (currentUser.id !== user.id) return currentUser
        return {
          ...currentUser,
          role: selectedRole,
          permissions: selectedPermissions,
        }
      })
      localStorage.setItem('users', JSON.stringify(updatedUsers))
      return updatedUsers
    })
    setModalId(null)
  }

  if (!user) return

  return (
    <>
      <dialog open className='modal'>
        <div className='modal-box flex flex-col gap-2'>
          <h3 className='font-bold text-2xl'>{user.firstName}</h3>
          <h3 className='font-bold text-lg'></h3>
          <label className='form-control w-full'>
            <div className='label'>
              <span className='label-text'>Choose Role</span>
              <div className='badge badge-accent'>{user.role}</div>
            </div>
            <select
              className='select select-bordered'
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              {roles.map((role, i) => (
                <option key={i} defaultChecked={user.role === role}>
                  {role.text}
                </option>
              ))}
            </select>
          </label>
          <div className='flex flex-wrap gap-2'>
            {permissions.map((permission, i) => (
              <label key={i} className='label cursor-pointer flex gap-2'>
                <span className='label-text'>{permission.text}</span>
                <input
                  type='checkbox'
                  defaultChecked={user.permissions.includes(permission.text)}
                  onChange={(e) => {
                    setSelectedPermissions((prev) =>
                      !e.target.checked
                        ? prev.filter((text) => text !== permission.text)
                        : [...prev, permission.text]
                    )
                  }}
                  className='checkbox'
                />
              </label>
            ))}
          </div>
          <div className='flex justify-between gap-4'>
            <button className='btn grow' onClick={onSave}>
              save
            </button>
            <button className='btn grow' onClick={() => setModalId(null)}>
              close
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}
