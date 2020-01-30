import React from 'react';


const CategoryItem = (props) => { 
    return(
        <button className="profile_categories-item" onClick={props.onPick}>{props.title}</button>
    )

}

export default CategoryItem;