import React from 'react'

export default function Button({type, children, className}) {
  return (
    <div>
        <button type={type} className={`${className}text-center hidden p-3 px-6 pt-2 text-white bg-black rounded-full baseline hover:bg-gray-100 hover:text-black md:block`} >{children}</button>
    </div>
  )
}
