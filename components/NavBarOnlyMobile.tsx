import React from 'react'

function NavBarOnlyMobile() {
  return (
    <div className='sm:hidden absolute w-full h-14 bg-gray-200 z-40 border-b border-gray-400'>
        <h2 className="absolute left-10 top-4 font-bold">Blog App</h2>
    </div>
  )
}

export default NavBarOnlyMobile