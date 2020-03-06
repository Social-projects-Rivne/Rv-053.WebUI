import React, { useReducer } from 'react';
import { useParams } from 'react-router-dom';

import CategoryItem from './CategoryItem';

const categoryReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CATEGORY': {
      return {
        ...state,
        addedCategories: [...state.addedCategories, action.id]
      };
    }
    case 'REMOVE_CATEGORY': {
      return {
        ...state,
        addedCategories: state.addedCategories.filter(id => id !== action.id)
      };
    }
    default:
      return state;
  }
};

const UserCategories = () => {
  const categories = [
    { id: 1, title: 'Music' },
    { id: 2, title: 'Sport' },
    { id: 3, title: 'Films' },
    { id: 4, title: 'Family' },
    { id: 5, title: 'Nature' },
    { id: 6, title: 'Contserts' }
  ];
  const userId = useParams().userId;
  const [addCategoryState, dispatch] = useReducer(categoryReducer, { addedCategories: [] });

  const addCategoryHandler = id => {
    if (!addCategoryState.addedCategories.includes(id)) {
      dispatch({
        type: 'ADD_CATEGORY',
        id
      });
    } else {
      dispatch({
        type: 'REMOVE_CATEGORY',
        id
      });
    }
  };
  return (
    <>
      {userId == 'my' ? (
        <div className="profile_categories">
          <div className="categories-list">
            {categories.map(category => (
              <CategoryItem
                key={category.id}
                title={category.title}
                click={() => addCategoryHandler(category.id)}
                isAdded={addCategoryState.addedCategories.includes(category.id)}
              />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default UserCategories;
