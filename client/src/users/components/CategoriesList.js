import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios'; 

import CategoryItem from './CategoryItem';



const categoryReducer = (state, action) => {

    switch(action.type){
        case 'ADD_CATEGORY': {
            axios.post()
            return{
                ...state,
                addedCategories: [...state.addedCategories, action.id]
            }
        }
        case 'REMOVE_CATEGORY':{ 
            axios.delete()
            return{
                ...state,
                addedCategories: state.addedCategories.filter((id) => id !== action.id)
            }
        }
        default: return state;
    }
}


const UserCategories = () => {

    const [ categoriesState, setCategoriesState ] = useState({categories});

    const [ addCategoryState, dispatch ] = useReducer(categoryReducer, {addedCategories})


    useEffect(()=>{
        const categories = await axios.get();
        const addedCategories = await axios.get();
        setCategoriesState(categories);
        dispatch(addedCategories);
    }, [])

    const categories = [
        {id: 1, title: 'Music'},
        {id: 2, title: 'Sport'},
        {id: 3, title: 'Films'},
        {id: 4, title: 'Family'},
        {id: 5, title: 'Nature'},
        {id: 6, title: 'Contserts'},
    ]

    const addCategoryHandler = (id) => {
        if(!addCategoryState.addedCategories.includes(id)){
        dispatch({
            type: 'ADD_CATEGORY',
            id,
        })}
        else{
            dispatch({
                type: 'REMOVE_CATEGORY',
                id
            })
        }
    }
        return(
            <div className="profile_categories">
                <div className="categories-list">
                    { 
                        categoriesState.categories.map(category => 
                            <CategoryItem 
                                key={category.id} 
                                title={category.title} 
                                click={()=>addCategoryHandler(category.id)}
                                isAdded={addCategoryState.addedCategories.includes(category.id)}
                            />) 
                    }
                </div>
            </div>
        )
    }

export default UserCategories;


