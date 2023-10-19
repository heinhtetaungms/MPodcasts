import React, { useState } from "react";
import {GetOriginalWriters} from "../api/getOriginalWriters";
import authStore from "../zustand/authStore";
import { useEffect } from "react";
// import { useQuery } from "react-query";


const Payment = () => {
  const [authToken] = authStore((state)=>[state.token]);
  const [userId] = authStore((state)=>[state.userId]);


  const [inputData, setInputData] = useState({
    title: "",
    content: "",
    categoryId: "", // Added a categoryId field to the state
  });


  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // Added a state for selected category

  // const { isloading, data } = useQuery(["categories"], () =>
  // WriterData({ token: authToken})
  // );

  // useEffect(() => {
  //   WriterData({ authToken }).then(
  //     (response) => {
  //       // console.log(response.httpResponse);
  //       if (response.httpResponse === 200) {
  //         // console.log(response.data);
  //         setCategoriesData(response.data);
  //         // return data.data;
  //       } else {
  //         throw new Error("Failed to fetch candidates");
  //       }
  //     }
  //   );
  // }, []);

  // const handleCategoryChange = (e) => {
  //   const selectedCategoryId = e.target.value;
  //   const selectedCategoryName = e.target.options[e.target.selectedIndex].text;

  //   setSelectedCategory(selectedCategoryName);

  //   setInputData({
  //     ...inputData,
  //     categoryId: selectedCategoryId,
  //   });
  // };

  // const handleCreateSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!inputData.title || !inputData.content || !inputData.categoryId) {
  //     alert("Please fill out all required fields."); 
  //     return;
  //   }

  //   const formData = new FormData();

  //   formData.append("title", inputData.title);
  //   formData.append("body", inputData.content);
  //   formData.append("writerId", inputData.categoryId);
  //   formData.append("userId" ,userId );

  //   const audioInput = document.getElementById("audio");
  //   if (audioInput.files.length > 0) {
  //     formData.append("file", audioInput.files[0]);
  //   }

  //   const imageInput = document.getElementById("image");
  //   if (imageInput.files.length > 0) {
  //     formData.append("image", imageInput.files[0]);
  //   }

    // try {
    //   const response = await fetch("https://g4backend.onrender.com/api/podcast/add", {
    //     method: "POST",
    //     body: formData,
    //     headers: {
    //       Authorization: `Bearer ${authToken}`,
    // //     },
    // //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //     console.log(data);
    //   } else {
    //     throw new Error("Failed to upload.");
    //   }
    // } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="container mx-auto p-6 px-36 dark:bg-black dark:text-white bg-white rounded-lg shadow-md w-full h-full">
      <h1 className="text-2xl font-semibold mb-4">Create a New Post</h1>
      <form
        action=""
        className="flex flex-col"
        onSubmit={handleCreateSubmit} 
      >
        <div className="mb-4">
          <label htmlFor="title" className="block dark:text-white text-gray-700 font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            required
            onChange={(e) =>
              setInputData({ ...inputData, title: e.target.value })
            }
            value={inputData.title}
          />
          <label htmlFor="" className="text-red text-xs  ">
            {inputData.title !== "" ? "" : "Title is required"}
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-medium dark:text-white dark:bg-black">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400 dark:bg-black"
            required
            onChange={(e) =>
              setInputData({ ...inputData, content: e.target.value })
            }
            value={inputData.content}
          ></textarea>
          <label htmlFor="" className="text-red text-xs dark:text-white">
            {inputData.content !== "" ? "" : "Content is required"}
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="audio" className="block text-gray-700 font-medium dark:text-white">
            Upload MP3 File
          </label>
          <input
            type="file"
            id="audio"
            name="audio"
            accept=".mp3"
            className="py-2 focus:outline-none focus:border-blue-400  dark:bg-black" 
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="image" className="block text-gray-700 font-medium dark:text-white">
            Upload image file
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept=".jpg, .jpeg, .png, .gif"
            className="py-2 focus:outline-none focus:border-blue-400 dark:bg-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-medium dark:text-white">
            Select Writer

          </label>
          <select
            id="category"
            name="category"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400 dark:bg-black"
            required
            onChange={handleCategoryChange} 
            value={inputData.categoryId}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categoriesData.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <label htmlFor="" className="text-red text-xs ">
            {inputData.categoryId !== "" ? "" : "Category is required"}
          </label>
        </div>
        {/* <Dropdown
         label ="Assignee"
          options={[
            {value: "", label: "no select" },
            ...developerData?.map((developer: any) => ({
            value: developer.user_id,
            label: developer.name,
          }))]} */}
          {/* selectedValue={ */}
          {/* //   selectedDepeloverOption !== ""
          //     ? developerData.find((r: any) => r.user_id === selectedDepeloverOption)
          //         ?.name || "Select Developer"
          //     : "Select Developer"
          // }
        //   selectedValue={ */}
        {/* //     selectedDepeloverOption !== ""
        //       ? developerData.find((r: any) => r.user_id === selectedDepeloverOption)
        //           ?.name || "Select Assignee"
        //       : "Select Assignee"
        //   }
        //   onSelect={handleDeveloperSelect}
        // /> */}
        <div className="mb-4">
          <button
            type="submit"
            className="bg-gray-500 w-full border dark:bg-black dark:text-white text-black px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default Payment;