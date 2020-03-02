import React, { useEffect, useState, createContext } from "react";
import axios from "axios";
import { api_server_url } from "../../../utilities/globalVariables";

export const CategoryContext = createContext("");

const CategoryContextProvider = props => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All events");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(api_server_url + "/api/tags");
      setData(result.data.categories);
    };
    fetchData();
  }, []);
  console.log(data);
  return (
    <CategoryContext.Provider
      value={{
        data,
        selectedCategory,
        setSelectedCategory,
        selectedCategoryId,
        setSelectedCategoryId
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
