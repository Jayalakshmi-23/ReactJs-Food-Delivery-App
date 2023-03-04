import React, { useContext } from 'react'
import {Home, ShowFoodItems, MenuContainer, CartContainer} from '../../components';
import AuthContext from '../Context/AuthContext';

const MainContainer = () => {
  let context = useContext(AuthContext);
   
  return (
    <main className='w-full h-auto flex flex-col items-center justify-center'>
        <Home />
        <ShowFoodItems />
        <MenuContainer />
        {
          context.showCartSlide && <CartContainer />
        }
    </main>
  )
}

export default MainContainer