import React, { useState } from 'react';

import CategoryItem from './CategoryItem';



// const categoryReducer = (currentCategories, action) => {
//     switch(action.type){
//         case 'ADD_CATEGORY':{
//             return{
//                 ...currentCategories,
//             }
//         }
//         case 'DELETE_CATEGORY':{
//             return{
//                 ...currentCategories,
//             }
//         }
//         default: return state
//     }
// }



const UserCategories = () => {
const categories = [
    {id: 1, title: 'Music', isAdded:false},
    {id: 2, title: 'Sport', isAdded:false},
    {id: 3, title: 'Films', isAdded:false},
    {id: 4, title: 'Family', isAdded:false},
    {id: 5, title: 'Nature', isAdded:false},
    {id: 6, title: 'Contserts', isAdded:false},
]

const [ showCategories, setShowCategories ] = useState({isShown: false});
const showCategoriesHandler = () => {
    const show = showCategories.isShown;
    setShowCategories({isShown: !show})
}


    return(
        <div className="profile_categories">
            <div className="profile_followed-categories">
                
            </div>
            <button className="add_category-btn" onClick={showCategoriesHandler}>Add Category</button>
            <div className="categories-list">
                { showCategories.isShown ?
                    categories.map(category => 
                        <CategoryItem 
                            key={category.id} 
                            title={category.title} 
                            //onPick={()=>{addCategoryHandler(category.id, category.title)}}
                        />) :null
                }
            </div>
        </div>
    )
}

export default UserCategories;




// import React, { useState, useReducer } from 'react';

// import CategoryItem from './CategoryItem';

// const categoryReducer = (state, action) => {
//     switch(action.type){
//         case 'ADD_CATEGORY':{
//             return{
//                 ...state,
//                 categories: state.categories.concat({id: action.id, title: action.title})
//             }
//         }
//         case 'DELETE_CATEGORY':{
//             return{
//                ...state,
//                categories: state.categories.
//             }
//         }
//         default: return state
//     }
// }


// const UserCategories = () => {
// const categories = [
//     {id: 1, title: 'Music', isAdded:false},
//     {id: 2, title: 'Sport', isAdded:false},
//     {id: 3, title: 'Films', isAdded:false},
//     {id: 4, title: 'Family', isAdded:false},
//     {id: 5, title: 'Nature', isAdded:false},
//     {id: 6, title: 'Contserts', isAdded:false},
// ]

// const [ showCategories, setShowCategories ] = useState({isShown: false});
// const showCategoriesHandler = () => {
//     const show = showCategories.isShown;
//     setShowCategories({isShown: !show})
// }


// const [ addedCategoryState, dispatch ] = useReducer(categoryReducer, {categories:[]});

// const addCategoryHandler = (id, title) =>{
//     dispatch({
//         type: 'ADD_CATEGORY',
//         id:id,
//         title: title,
//     })
// }
// const deleteCategoryHandler = (id, title) => {
//     dispatch({
//         type: 'DELETE_CATEGORY',
//         id:id
//     }
//     )
// }


//     return(
//         <div className="profile_categories">
//             <div className="profile_followed-categories">
//                 {addedCategoryState.categories.map(category=>
//                     <CategoryItem 
//                         key={category.id} 
//                         title={category.title} 
//                         onPick={()=>{deleteCategoryHandler(category.id, category.title)}}
//                     />
//                 )}
//             </div>
//             <button className="add_category-btn" onClick={showCategoriesHandler}>Add Category</button>
//             <div className="categories-list">
//                 { showCategories.isShown ?
//                     categories.map(category => 
//                         <CategoryItem 
//                             key={category.id} 
//                             title={category.title} 
//                             onPick={()=>{addCategoryHandler(category.id, category.title)}}
//                         />) :null
//                 }
//             </div>
//         </div>
//     )
// }

// export default UserCategories;