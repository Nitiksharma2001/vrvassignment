import { useContext, useState } from 'react'
import { GlobalContext } from '../context/context'
import { MdDelete } from 'react-icons/md'

function ListItems({ data, setData, storeName }) {
  const [text, setText] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  return (
    <ul className='space-y-2'>
      {data.map((item, i) => (
        <li key={i}>
          <a className='flex justify-between'>
            {item.text}
            {item.deletable && (
              <MdDelete
                onClick={() =>
                  setData((prev) => {
                    localStorage.setItem(
                      storeName,
                      JSON.stringify(
                        prev.filter((curr) => curr.text !== item.text)
                      )
                    )
                    return prev.filter((curr) => curr.text !== item.text)
                  })
                }
              />
            )}
          </a>
        </li>
      ))}
      <li>
        {!isOpen && (
          <a className='m-auto' onClick={() => setIsOpen(true)}>
            +
          </a>
        )}
        {isOpen && (
          <div className='flex flex-col'>
            <input
              type='text'
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder='Type here'
              className='input input-bordered w-full max-w-xs'
            />
            <div className='flex gap-2'>
              <button
                className='btn btn-sm'
                onClick={() => {
                  setText('')
                  setData([...data, { text, deletable: true }])
                  localStorage.setItem(
                    storeName,
                    JSON.stringify([...data, { text, deletable: true }])
                  )
                  setIsOpen(false)
                }}
              >
                Done
              </button>
              <button
                className='btn btn-sm'
                onClick={() => {
                  setText('')
                  setIsOpen(false)
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </li>
    </ul>
  )
}
export default function Navbar({ setText, setCurrentPage }) {
  const { roles, setRoles, permissions, setPermissions } =
    useContext(GlobalContext)

  return (
    <>
      <div className='navbar-start '>
        <input
          type='text'
          placeholder='Search'
          className='input input-bordered w-full'
          onChange={(e) => {
            setText(e.target.value)
            setCurrentPage(0)
          }}
        />
      </div>
      <div className='navbar-centre z-10'>
        <ul className='menu menu-horizontal w-full justify-between flex-nowrap gap-4 px-1'>
          <li>
            <details>
              <summary>Roles</summary>
              <ListItems storeName='roles' data={roles} setData={setRoles} />
            </details>
          </li>
          <li>
            <details>
              <summary>Permissions</summary>
              <ListItems
                storeName='permissions'
                data={permissions}
                setData={setPermissions}
              />
            </details>
          </li>
        </ul>
      </div>
    </>
  )
}
