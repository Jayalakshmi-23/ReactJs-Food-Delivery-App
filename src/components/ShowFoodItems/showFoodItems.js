import React, { useContext } from 'react'
import {MdChevronLeft, MdChevronRight} from 'react-icons/md'
import {RowContainer} from '../../components';
import AuthContext from '../Context/AuthContext';

const ShowFoodItems = () => {

    const context = useContext(AuthContext);
 
    const data = context ? context.totalItems.filter((item, i) => {
        return item.category === "fruits"
    }) : "";

  return (
    <section className='w-full'>
        <div className='flex items-center justify-between'>
            <p className='text-2xl font-semibold captitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100'>Our fresh & Healthy fruits</p>

            {/* <div className='hidden md:flex gap-3 items-center '>
                <div                 
                className='w-8 h-8 rounded-md bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center'>
                    <MdChevronLeft className='text-white text-lg' />
                </div>
                <div                
                className='w-8 h-8 rounded-md bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center'>
                    <MdChevronRight className='text-white text-lg' />
                </div>
            </div> */}
        </div>

        <RowContainer flag={true} data={data} />
    </section>

  )
}

export default ShowFoodItems;