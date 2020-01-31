import React from 'react';


const CategoryItem = (props) => { 
    return(
        
        <button 
         className={props.isAdded ? "profile_categories-item added" : "profile_categories-item"} onClick={props.click}>{props.title}</button>
        
    )

}

export default CategoryItem;