import React from 'react'

const Navbar = () => {
  return (
    <>
         <li className="text-sm text-textColor hover:text-headingColor duration -100 transition-all ease-in-out cursor-pointer">
            Home
        </li>
        <li className="text-sm text-textColor hover:text-headingColor duration -100 transition-all ease-in-out cursor-pointer">
            Menu
        </li>
        <li className="text-sm text-textColor hover:text-headingColor duration -100 transition-all ease-in-out cursor-pointer">
            About Us
        </li>
        <li className="text-sm text-textColor hover:text-headingColor duration -100 transition-all ease-in-out cursor-pointer">
            Service
        </li>
    </>
  )
}

export default Navbar