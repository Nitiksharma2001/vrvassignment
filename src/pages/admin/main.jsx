import React, { useContext, useEffect, useState } from 'react'
import Modal from '../../components/modal'
import Navbar from '../../components/navbar'
import usersData from '../../data/users.json'
import TableRow from './tableRow'
import { GlobalContext } from '../../context/context'

export default function AdminMain() {
  const [modalId, setModalId] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [text, setText] = useState('')
  const { roles, permissions } = useContext(GlobalContext)
  const [users, setUsers] = useState([])
  useEffect(() => {
    setUsers(
      users.map((user) => {
        console.log(roles.map((curr) => curr.text).includes(user.role))
        return {
          ...user,
          role: roles.map((curr) => curr.text).includes(user.role)
            ? user.role
            : 'normal',
          permissions: user.permissions.filter((permission) =>
            permissions.map((curr) => curr.text).includes(permission)
          ),
        }
      })
    )
  }, [roles, permissions])
  useEffect(() => {
    const users = localStorage.getItem('users')
    if (users) {
      setUsers(JSON.parse(users))
    } else {
      usersData.map((user) => {
        return {
          ...user,
          permissions: ['none'],
        }
      })
    }
  }, [])
  return (
    <>
      <div className='flex flex-col justify-between h-full px-2 gap-8'>
        <div className='navbar bg-base-100 md:flex-row md:justify-between flex flex-col items-center w-full'>
          <Navbar setText={setText} setCurrentPage={setCurrentPage} />
        </div>
        <div className='overflow-x-auto h-[80%]'>
          <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Permissions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter(
                  (user) =>
                    text === '' ||
                    user.firstName.toLowerCase().includes(text) ||
                    user.lastName.toLowerCase().includes(text) ||
                    user.email.toLowerCase().includes(text)
                )
                .slice(currentPage * 20, currentPage * 20 + 20)
                .map((user) => (
                  <React.Fragment key={user.id}>
                    <TableRow
                      setUsers={setUsers}
                      setModalId={setModalId}
                      user={user}
                    />
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>
        <div className='join justify-end'>
          <button
            className='join-item btn'
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 0))}
          >
            «
          </button>
          <button className='join-item btn'>Page {currentPage + 1}</button>
          <button
            className='join-item btn'
            onClick={() =>
              setCurrentPage(
                Math.min(
                  currentPage + 1,
                  Math.floor(
                    users.filter(
                      (user) =>
                        text === '' ||
                        user.firstName.toLowerCase().includes(text) ||
                        user.lastName.toLowerCase().includes(text) ||
                        user.email.toLowerCase().includes(text)
                    ).length / 20
                  )
                )
              )
            }
          >
            »
          </button>
        </div>
      </div>
      <Modal
        setUsers={setUsers}
        user={modalId ? users.find((user) => user.id === modalId) : null}
        setModalId={setModalId}
      />
    </>
  )
}
