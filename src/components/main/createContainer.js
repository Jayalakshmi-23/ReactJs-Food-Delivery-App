import React, { useContext, useEffect, useState } from "react";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import { categories } from "../data";
import Loader from "./Loader";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../firebase.config";
import { saveItems } from "./firebaseFunctions";
import AuthContext from "../Context/AuthContext";
import { CartContainer } from "../../components";


const CreateContainer = (props) => {

  let context = useContext(AuthContext);
    
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Select Category");
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [aletStatus, setAletStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);



  const inputHandler = function (e) {
    setTitle(e.target.value);
  };

  const selectCategoryHandle = function (e) {
    setCategory(e.target.value);
  };

  const uploadImageHandler = function (e) {
    setIsLoading(true);

    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while uploading Try again");
        setAletStatus("danger");

        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((res) => {
          setImageAsset(res);

          setIsLoading(false);

          setFields(true);
          setMsg("Image uploaded successfully");
          setAletStatus("success");

          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };

  const caloryHandler = function (e) {
    setCalories(e.target.value);
  };

  const priceHandler = function (e) {
    setPrice(e.target.value);
  };

  const deleteImage = function () {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then((res) => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg("Image deleted successfully");
      setAletStatus("success");

      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };

  const submitHandler = function () {
    setIsLoading(true);
    try {
      if (!title || !imageAsset || !price || !category || !calories) {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAletStatus("danger");
        setIsLoading(false);
        setTimeout(() => {
          setFields(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price,
        };
        saveItems(data);
        setFields(true);
        setMsg("Data uploaded successfully");
        setAletStatus("success");
        setIsLoading(false);
        setTimeout(() => {
          setFields(false);
          clearData();
        }, 4000);

      }
      props.fetchData();

    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading Try again");
      setAletStatus("danger");

      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
  };

  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
    setCategory("Select Catagory");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 text-center ">
        {fields && (
          <p
            className={`text-lg rounded-lg p-2 ${
              aletStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 tetx-emerald-800"
            }`}
          >
            {msg}
          </p>
        )}
        <div className="my-2 border-b border-gray-300 gap-2 flex items-center">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            value={title}
            onChange={inputHandler}
            placeholder="Give me a title"
            className="w-full h-full text-md bg-transparent font-semibold outline-none border-none p-2 placeholder:text-gray-400"
          />
        </div>
        <div className="my-2">
          <select
            value={category}
            className="w-full p-2 border-b-2 text-base border-gray-200 rounded-md cursor-pointer outline-none"
            onChange={selectCategoryHandle}
          >
            <option value="other" className="bg-white">
              Select Catagory
            </option>
            {categories &&
              categories.map((category) => {
                return (
                  <option
                    className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                    key={category.id}
                    value={category.urlParamName}
                  >
                    {category.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <label className="cursor-pointer w-full h-full flex justify-center items-center">
                  <div className="flex justify-center items-center flex-col gap-2">
                    <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                    <p className="tetx-gray-500 hover:text-gray-700">
                      Click here to upload
                    </p>
                  </div>
                  <input
                    type="file"
                    name="uploadimage"
                    accept="image/*"
                    onChange={uploadImageHandler}
                    className="w-0 h-0"
                  />
                </label>
              ) : (
                <div className="h-full relative">
                  <img
                    src={imageAsset}
                    className="w-full h-full object-cover"
                    alt="upload image"
                  />
                  <button
                    type="button"
                    onClick={deleteImage}
                    className="absolute bottom-3 right-3 p-1 bg-red-600 rounded-full cursor-pointer outline-none hover:shadow-md duration-100 transition-all ease-in-out"
                  >
                    {<MdDelete className="text-xl text-white" />}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <div className="mt-6 w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full flex items-center border-b-2 border-gray-300">
            <MdFoodBank className="text-gray-700 text-2xl " />
            <input
              onChange={caloryHandler}
              type="text"
              value={calories}
              placeholder="Calories"
              className="w-full h-full text-lg bg-transparent outline-none ml-2 placeholder:text-gray-400"
            />
          </div>

          <div className="w-full flex items-center border-b-2 border-gray-300">
            <MdAttachMoney className="text-gray-700 text-lg" />
            <input
              onChange={priceHandler}
              value={price}
              type="text"
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent outline-none ml-2 placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="mt-3 text-end">
          <button
            type="button"
            className="bg-emerald-500 rounded-md px-12 py-2  text-white font-semibold"
            onClick={submitHandler}
          >
            Submit
          </button>
        </div>
      </div>

      {
          context.showCartSlide && <CartContainer />
        }
    </div>
  );
};

export default CreateContainer;
