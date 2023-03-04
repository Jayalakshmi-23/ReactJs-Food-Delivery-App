import React, { useContext, useEffect } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import AuthContext from '../Context/AuthContext';

const Cart = () => {
  let ctx = useContext(AuthContext);

  return (
    <div className="flex relative" onClick={ctx.showCart}>
            <FaShoppingCart className="text-textColor text-2xl cursor-pointer" />
            {
              ctx.cart && ctx.cart.length > 0 && (<div className="absolute -top-2 -right-3  w-5 h-5 flex items-center justify-center rounded-full bg-cartNumBg">
              <p className="text-xs text-white font-semibold">{ctx.cart.length}</p>
            </div>)
            }
          </div>
  )
}

export default Cart