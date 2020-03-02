import React, { useContext } from "react";
import { CategoryContext } from "./CategoryContext";

const CategoryFilter = props => {
  const { data, setSelectedCategoryId, setSelectedCategory } = useContext(
    CategoryContext
  );

  const getUnique = (arr, comp) => {
    const unique = arr
      //store the comparison values in array
      .map(e => e[comp])
      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)
      // eliminate the dead keys & store unique objects
      .filter(e => arr[e])
      .map(e => arr[e]);

    return unique;
  };

  const handleCategory = e => {
    e.preventDefault();
    setSelectedCategoryId(e.nativeEvent.target.selectedIndex);
    setSelectedCategory(e.target.value);
  };

  const uniqueCategory = getUnique(data, "category");
  console.log({ uniqueCategory });

  return (
    <>
      <select
        className='form-control form-control-lg col-md-4 mx-auto'
        onChange={handleCategory}
      >
        <option
          className='dropdown-item'
          style={{ color: "#16a085" }}
          type='button'
          key={0}
          value={"All events"}
        >
          {"All events"}
        </option>
        {uniqueCategory.map(item => (
          <option
            className='dropdown-item'
            style={{ color: "#16a085" }}
            type='button'
            key={item.id}
            value={item.category}
          >
            {item.category}
          </option>
        ))}
      </select>
    </>
  );
};

export default CategoryFilter;
