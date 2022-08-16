import React from 'react'
import logo from './logo.png'

const Navbar = () => {
  return (
    <nav className='px-10 py-5 bg-white shadow-md'>
        <div className='w-48'>
            {/* <span className='cursor-pointer'><span className='bg-red-600 p-2 text-red-50 text-3xl'>AL</span><span className='text-3xl'>maBetter</span></span> */}
            <img src={logo} alt='logo' className='inline-block' />
        </div>
    </nav>
  )
}

export default Navbar