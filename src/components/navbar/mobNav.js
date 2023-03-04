import React from 'react';
import Navbar from './navbar';
import { FaPlus } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


const MobNav = (props) => {
  const menuHandler = function(){
      props.menuHandler(false);
  }
  return (
    <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.6 }}
        className="w-40 bg-primary shadow-xl z-50 rounded-lg absolute top-11 right-0 "
        >
        <Link to="/createItem">
            <p 
            onClick={menuHandler}
            className="text-sm flex justify-between py-2 px-2 cursor-pointer items-center hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
            New Item <FaPlus className="" />
            </p>
        </Link>
        <ul className="flex flex-col px-2 gap-4 my-1">
            <Navbar></Navbar>
        </ul>
        <p className="text-sm flex justify-center items-center gap-3 bg-slate-300 m-2 p-2 rounded-md shadow-md cursor-pointer items-center hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
            Logout <MdLogout />
        </p>
    </motion.div>
  )
}

export default MobNav