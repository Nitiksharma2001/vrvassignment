import { HiDotsVertical } from 'react-icons/hi'
import { MdDelete } from 'react-icons/md'

export default function TableRow({ setModalId, setUsers, user }) {
  return (
    <tr className='hover'>
      <td className='text-nowrap'>{`${user.firstName} ${user.lastName}`}</td>
      <td>{user.email}</td>
      <td>
        <span className='badge badge-accent'>{user.role}</span>
      </td>
      <td className='flex items-center gap-2'>
        {user.permissions.map((permission, i) => (
          <span key={i} className='badge badge-primary text-white'>
            {permission}
          </span>
        ))}
      </td>
      <td className='text-nowrap'>
        <button className='btn btn-sm' onClick={() => setModalId(user.id)}>
          <HiDotsVertical />
        </button>
        <button
          className='btn btn-sm ml-2'
          onClick={() =>
            setUsers((prev) => {
              const updatedUsers = prev.filter(
                (currentUser) => currentUser.id !== user.id
              )
              localStorage.setItem('users', JSON.stringify(updatedUsers))
                return updatedUsers
            })
          }
        >
          <MdDelete />
        </button>
      </td>
    </tr>
  )
}
