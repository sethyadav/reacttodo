import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-indigo-900 text-white py-2'>
      <div className="logo">
        <span className='font-bold text-xl mx-8'>iTask</span>
      </div>
      <ul class="flex gap-7 mx-9">
        <li className='cursor-pointer hover:font-bold transition-all duration-500'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all duration-500'>your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
