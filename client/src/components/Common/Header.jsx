import React from 'react'

const Header = () => {
  return (
    <div className='bg-green-500 py-2 lg:py-3 text-white'>
     <div className='px-2 max-w-6xl mx-auto flex justify-between items-center'>
        <div>
      <h1 className='text-base md:text-xl font-bold'>Roadmap Web App</h1>
      </div>
      <div className='flex gap-2'>
        <button
                className="bg-black text-white  rounded-md py-1 px-4 flex items-center gap-[10px] text-[1rem] uppercase">
                Login
            </button>
         <button
                className="bg-blue-500 text-white  rounded-md py-1 px-4 flex items-center gap-[10px] text-[1rem] uppercase">
                Register
            </button>
      </div>

     </div>
    </div>
  )
}

export default Header