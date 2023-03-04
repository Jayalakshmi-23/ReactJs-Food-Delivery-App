import React, { useContext } from 'react'
import "./RowContainer.css"
import {MdShoppingBasket} from "react-icons/md";
import { motion } from 'framer-motion';
import {Swiper, SwiperSlide} from 'swiper/react'
import "swiper/css/navigation";
import 'swiper/css';
import 'swiper/css/free-mode';
import { Navigation } from "swiper";
import notFound from "../../assets/NotFound.svg";
import AuthContext from '../Context/AuthContext';


const RowContainer = ({flag, data}) => {

    const context = useContext(AuthContext);

    // const getCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    // let [items, setItems] = useState(getCartItems);

    // const addToCart = function(item){
    //     console.log(item);
    //     setItems([...items, item])
    //     context.cart = [...items, item];
    //     localStorage.setItem("cartItems", JSON.stringify(context.cart)); 
    // }      
    
    const addToCart = function(item){
        if(context.cart && context.cart.length >= 1){
            const repeatedarr = context.cart.filter((cart, i, arr) => {
                return cart.id === item.id
            });
            if(repeatedarr.length === 0){
                context.addToCart(item);
            }
        }
        else if(context.cart.length < 1){
            context.addToCart(item);
        }
        
    }
     
    const RenderData = data.length > 0 ? data.map((item) => {

        return (<SwiperSlide key={item.id} className='h-full min-h-[240px] p-2 rounded-lg bg-cardOverlay my-12 drop-shadow-md backdrop-blur-lg hover:drop-shadow-lg'>
        <div className='w-full flex justify-between items-center'>
            <motion.img
            whileHover={{scale:1.2}}
             src={item.imageURL}
             className='w-40 h-[150px] object-contain -mt-8 ml-5 drop-shadow-2xl' 
             alt="" />

            <motion.div 
            whileTap={{scale:0.75}}
            className='w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer' onClick={() => addToCart(item)}>
                <MdShoppingBasket className='text-white'  />
            </motion.div>
        </div>
        
        <div className='w-full flex-col flex justify-end items-end'>
            <p className='text-textColor font-semibold 2text-base md:text-lg'>{item.title}</p>
            <p className='mt-1 text-sm text-gray-500'>{item.calories} Calories</p>
            <div className='flex items-center gap-8'>
                <p className='text-lg text-headingColor font-semibold'><span className='text-sm text-red-500'>$</span> {item.price} </p>

            </div>
        </div>

    </ SwiperSlide>)
    }) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={notFound} className="h-340" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p>
        </div>
    );

    const flagRenderData = data.length > 0 ? data.map((item) => {

        return (<div key={item.id} className='w-275 h-full min-w-[275px] md:w-300 md:min-w-[300px] p-2 rounded-lg bg-cardOverlay drop-shadow-md backdrop-blur-lg hover:drop-shadow-lg'>
        <div className='w-full flex justify-between items-center'>
            <motion.img
            whileHover={{scale:1.2}}
             src={item.imageURL}
             className='w-40 h-[150px] object-contain -mt-8 ml-5 drop-shadow-2xl' 
             alt="" />

            <motion.div 
            whileTap={{scale:0.75}}
            className='w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer' onClick={() => addToCart(item)}>
                <MdShoppingBasket className='text-white' />
            </motion.div>
        </div>
        
        <div className='w-full flex-col flex justify-end items-end'>
            <p className='text-textColor font-semibold 2text-base md:text-lg'>{item.title}</p>
            <p className='mt-1 text-sm text-gray-500'>{item.calories} Calories</p>
            <div className='flex items-center gap-8'>
                <p className='text-lg text-headingColor font-semibold'><span className='text-sm text-red-500'>$</span> {item.price} </p>

            </div>
        </div>

    </ div>)
    }): (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={notFound} className="h-340" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p>
        </div>
    );


  return (
    <div className={`my-12 ${!flag ? "flex flex-wrap items-center justify-center gap-4":""}`}>
        {
            flag && <Swiper 
            freeMode={true}
            navigation={true}
            modules={[Navigation]}
            grabCursor={true}
            className="mySwiper"
            slidesPerView={4}
            spaceBetween={20}
            breakpoints = 
            {
               { 
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    },
                    480 : {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    768 : {
                        slidesPerView: 3,
                        spaceBetween: 10
                    },
                    1024 : {
                        slidesPerView: 4,
                        spaceBetween: 20
                    }
                }
            }
            >
                {RenderData}
            </Swiper>
        }
        {
            !flag && flagRenderData
        }
    </div>
  )
}

export default RowContainer