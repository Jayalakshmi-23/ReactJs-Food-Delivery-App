import React, { useContext, useState,useEffect } from 'react'
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import AuthContext from '../Context/AuthContext';

const CartItems = ({item}) => {

    let context = useContext(AuthContext);
  
    let [qty, setQuantity] = useState(1);
   
    const updateQunatity = function(action, id){
        if(action == "remove"){
            if(qty > 1){
                setQuantity(qty - 1)
                 context.cart.filter(item => {
                    if(item.id === id){
                        item.qty -= 1;
                    }
                });
                context.addToCart(context.cart); 
            }
        }
        if(action == "add"){
            setQuantity(qty + 1)
            context.cart.map(item => {
                if(item.id === id){
                    item.qty += 1;
                }
            });
            context.addToCart(context.cart);            
        }
    }

     return  <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2"
   >
     <img
       src={item.imageURL}
       className="w-20 h-20 max-w-[60px] rounded-full object-contain"
     />

     <div className="flex flex-col gap-2">
       <p className="text-base text-gray-50">{item.title}</p>
       <p className="text-sm block text-gray-300 font-semibold">
         ${(item.price * item.qty)}
       </p>
     </div>
     <div className="group flex items-center gap-2 ml-auto cursor-pointer">
       <motion.div whileTap={{ scale: 0.75 }} onClick={() => updateQunatity("remove",item.id)}>
         <BiMinus className="text-gray-50" />
       </motion.div>
       <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex justify-center items-center">
         {item.qty}
       </p>
       <motion.div whileTap={{ scale: 0.75 }} onClick={() => updateQunatity("add",item.id)}>
         <BiPlus className="text-gray-50" />
       </motion.div>
     </div>
   </div>   
}

export default CartItems