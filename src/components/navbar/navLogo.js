import React from 'react'
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const NavLogo = () => {
  return (
    <Link to={"/"} className="flex items-center gap-2">
    <img src={logo} className="w-8" alt="logo" />
    <p className="text-headingColor text-xl font-bold">City</p>
  </Link>
  )
}

export default NavLogo;