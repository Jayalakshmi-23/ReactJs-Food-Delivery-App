import React, { useContext, useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { motion } from "framer-motion";
import { RiRefreshFill } from "react-icons/ri";
import AuthContext from "../Context/AuthContext";
import EmptyCart from "../../assets/emptyCart.svg";
import {CartItems} from "../../components";

const CartContainer = () => {
  let context = useContext(AuthContext);
  let [flag, setFlag] = useState(1);
  let [total, setTotal] = useState(0);
  let [delivery, setDelivery] = useState(2.5);

  let cartItems = context.cart && context.cart.length > 0;

  useEffect(() => {
    let totalPrice = context.cart.reduce(function (accumulator, item) {
          return accumulator + (item.qty * Number(item.price));
        }, 0);
        setTotal(totalPrice);
  }, [context.cart, flag])


  const loadCart = context.cart.map((item) => {
    return <CartItems key={item.id} item={item} />
});

const clearCart = function(){
  context.clearCart();
}

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-[375px] z-[100] h-screen bg-white shadow-md flex flex-col "
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={context.showCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>
        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base"
          onClick={() => clearCart()}
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>

      {/* bottom */}
      {cartItems ? (
        <div className="w-full h-full bg-cartBg flex flex-col rounded-t-[2rem]">
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* cart item */}
            {loadCart}
          </div>

          {/* total section */}
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">${total}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">${delivery}</p>
            </div>
            <div className="w-full border-b border-gray-600 my-2"></div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">${total + delivery}</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.8 }}
              type="button"
              className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
            >
              Check Out
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} className="w-300" alt="" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
