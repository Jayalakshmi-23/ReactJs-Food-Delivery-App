import React, { useContext, useEffect, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { categories } from "../data";
import {motion} from "framer-motion";
import RowContainer from "../RowContainer/RowContainer";
import AuthContext from "../Context/AuthContext";

const MenuContainer = () => {
  let [filterCard, setFilterCard] = useState("chicken");

  const context = useContext(AuthContext);
 
  const data = context ? context.totalItems.filter((item, i) => {
      return item.category === filterCard;
  }) : "";

  return (
    <section className="w-full my-6" id="menu">
      <div className="w-full flex flex-col justify-center">
        <p className="text-2xl font-semibold captitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
          Our Hot Dishes
        </p>

        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 flex-wrap ">
          {categories &&
            categories.map((category) => {
              return (
                <motion.div 
                whileTap={{scale:0.8}}
                  key={category.id}
                  className={`group ${
                    filterCard === category.urlParamName
                      ? "bg-cartNumBg"
                      : "bg-card"
                  } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-lg flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg `}
                  onClick={() => setFilterCard(category.urlParamName)}
                >
                  <div
                    className={`w-10 h-10 rounded-full shadow-lg ${
                      filterCard === category.urlParamName
                        ? "bg-card"
                        : "bg-cartNumBg"
                    }  group-hover:bg-card flex items-center justify-center`}
                  >
                    <IoFastFood
                      className={`${
                        filterCard === category.urlParamName
                          ? "text-textColor"
                          : "text-card"
                      } group-hover:text-textColor text-lg`}
                    />
                  </div>
                  <p
                    className={`${
                      filterCard === category.urlParamName
                        ? "text-white"
                        : "text-textColor"
                    }  text-sm group-hover:text-white`}
                  >
                    {category.name}
                  </p>
                </motion.div>
              );
            })}
        </div>
        <div className="w-full">
              <RowContainer flag={false} data={data} />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
