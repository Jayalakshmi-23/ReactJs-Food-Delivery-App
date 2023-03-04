import React, {  useState } from "react";
import profile from "../../assets/avatar.png";
import { motion } from "framer-motion";
import { NavLogo, Cart, Profile, Navbar, MobNav } from "../../components";


const Header = () => {
  const [isMenu, setIsMenu] = useState(false);
 
  const loginHandler = function () {
    setIsMenu(!isMenu);
  };
  const menuHandler = function (val) {
    setIsMenu(val);
  };

  return (
    <header className="fixed w-full h-auto z-50 p-3 bg-primary px-4 md:p-6 md:px-16 top-0 left-0">
      {/* desktop & tablet */}
      <nav className="hidden md:flex  items-center justify-between h-full w-full">
        <NavLogo />

        <motion.ul
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="flex gap-8"
        >
          <Navbar></Navbar>
        </motion.ul>

        <div className="flex items-center gap-8">
          <Cart />
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.8 }}
              src={profile}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="userprofile"
              onClick={loginHandler}
            />
            {isMenu && <Profile menuHandler={menuHandler}  />}
          </div>
        </div>
      </nav>

      {/* mobile */}
      <nav className="flex md:hidden h-full w-full justify-between items-center">
        <Cart />
        <NavLogo />

        <div className="flex items-center gap-8">
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.8 }}
              src={profile}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="userprofile"
              onClick={loginHandler}
            />
            {isMenu && <MobNav menuHandler={menuHandler}></MobNav>}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
