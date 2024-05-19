import React, { useCallback, useMemo, useState } from 'react'
import { AuthState } from '../../context/AuthContext'
import axios from '../../config/axios'
import { toast } from 'react-toastify'
import AddUserModel from './AddUserModel'
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function Dashboard() {

  const [userList, setUserList] = useState([])
  const [Limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(10)
  const [show, setShow] = useState(false)

  const { userDetails } = AuthState()

  const getDetails = useCallback(() => {
    axios.get('/api/auth/get-all-user', { params: { page, limit: Limit } }).then(({ data }) => {
      if (data.success) {
        setUserList(data.data)
        setLimit(Number(data.pagination.limit))
        setPage(Number(data.pagination.page))
        setTotalPage(Number(data.pagination.totalPage))
      } else {
        toast.error(data.message)
      }
    }).catch((error) => {
      toast.error(error.response ? error.response.data.message : error.toString())
    })
  }, [Limit, page])

  useMemo(() => {
    if (userDetails && (userDetails.role === 'super-admin')) {
      getDetails()
    }
  }, [userDetails, getDetails])

  const handleDelete = (data) => {
    axios.delete(`/api/auth/remove-user/${data}`).then(({ data }) => {
      if (data.success) {
        toast.success(data.message)
        getDetails()
      } else {
        toast.error(data.message)
      }
    }).catch((error) => {
      toast.error(error.response ? error.response.data.message : error.toString())
    })
  }

  const checkActive = (index) => {
    if (page === index) {
      return "relative text-decoration-none z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    } else {
      return "relative text-decoration-none z-10 inline-flex items-center px-4 py-2 text-sm font-semibold text-blue-500 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-indigo-600 hover:bg-indigo-600 hover:text-white"
    }
  }

  const handleButtonCheck = (active) => {
    if (active) {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      <AddUserModel show={show} handleClose={() => setShow(false)} getDetails={getDetails} />
      <div className="relative overflow-x-auto">
        {
          userDetails && (userDetails.role === 'super-admin') ? (
            <>

              <div className='w-full flex justify-end'>
                <button type="button" onClick={() => setShow(true)} className="mb-4 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Add User
                </button>
              </div>

              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      SL No.
                    </th>
                    <th scope="col" className="px-6 py-3">
                      UserName
                    </th>
                    <th scope="col" className="px-6 py-3">
                      User Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      User Role
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    userList.length > 0 ? userList.map((element, index) => (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={element._id}>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                          {index + 1 + ((page - 1) * Limit)}
                        </th>
                        <td className="px-6 py-4">
                          {element?.userName}
                        </td>
                        <td className="px-6 py-4">
                          {element?.email}
                        </td>
                        <td className="px-6 py-4">
                          {element?.role}
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => handleDelete(element._id)} className="flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                            <TrashIcon width={20} height={20} />
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <th colSpan={5} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                          No user found add some user for display
                        </th>
                      </tr>
                    )
                  }
                </tbody>
              </table>

              <div className='py-3 text-end'>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button onClick={() => setPage((pre) => pre - 1)} disabled={handleButtonCheck(page === 1)} className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {
                    Array(totalPage).fill(1).map((page, i) => (
                      <button key={i} onClick={() => setPage(i + 1)} aria-current="page" className={checkActive(i + 1)}>
                        {i + 1}
                      </button>
                    ))
                  }
                  <button onClick={() => setPage((pre) => pre + 1)} disabled={handleButtonCheck(page === totalPage)} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </>
          ) : (
            <div className='flex justify-center items-center min-h-[85dvh] gap-2'>
              <h1 className='text-3xl'> Welcome back, </h1>
              <h2 className='text-3xl text-green-600 uppercase'>{userDetails?.userName}</h2>
            </div>
          )
        }
      </div>
    </>
  )
}
