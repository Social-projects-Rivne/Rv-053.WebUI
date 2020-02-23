import React, { useEffect, useState, createContext } from 'react';
import axios from 'axios';

export const CategoryContext = createContext();

const CategoryContextProvider = props => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  console.log(selectedCategory);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('./category.json');
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <CategoryContext.Provider
      value={{ data, selectedCategory, setSelectedCategory }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
