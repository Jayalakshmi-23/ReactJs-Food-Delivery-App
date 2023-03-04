import React, { useState, useEffect, useContext } from 'react';
import { getAllItems } from "../main/firebaseFunctions";

const AuthContext = React.createContext({
    totalItems:[],
    showCartSlide:false,
    showCart: null,
    cart:[],
    addToCart:undefined,
    cardDispatch:undefined,
    clearCart:[],
});

export const AuthContextProvider = function(props){

    let [ShowCartSide, setShowCartSide] = useState(false);
    const [foodItems, setFoodItems] = useState([]);
    const context = useContext(AuthContext);
    let [clear, setClear] = useState(false);

    const fetchData = async function(){
      const data = await getAllItems();
      setFoodItems(data);
    }

    useEffect(()=>{
      fetchData();
    },[])

    const showCart = function(){
        setShowCartSide(!ShowCartSide);
    }

    let getCartItems;
    if(JSON.parse(localStorage.getItem("cartItems"))){
      getCartItems = JSON.parse(localStorage.getItem("cartItems"))
    }
    else{
      getCartItems = [];

    }
    let [items, setItems] = useState(getCartItems);

    const clearCart = function(){
      setClear(true);
      setItems([]);
      context.cart = [];
      localStorage.setItem("cartItems", JSON.stringify(context.cart)); 
    }   
    
    const addToCart = function(item){
        
       if(items.id !== item.id){
        setItems([...items, item])
        context.cart = [...items, item];
       }
       else{
         setItems([...item]);
        context.cart = [...item];
       }
      localStorage.setItem("cartItems", JSON.stringify(context.cart)); 
    } 
  
  
   
    return <AuthContext.Provider value={{totalItems: [...foodItems],showCartSlide:ShowCartSide, showCart:showCart, cart:getCartItems, addToCart:addToCart, clearCart:clearCart}}>
            {props.children}
    </AuthContext.Provider>
}

export default AuthContext;