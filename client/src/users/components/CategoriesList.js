import React, {
  useReducer,
  useState,
  useContext,
  useMemo,
  useEffect,
  useCallback
} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { api_server_url } from '../../shared/utilities/globalVariables';
import { AuthContext } from '../../shared/context/auth-context';

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
  const [Categories, setCategories] = useState([]);
  const accessToken = useContext(AuthContext).token;

  const headers = useMemo(
    () => ({
      Authorization: 'Bearer ' + accessToken
    }),
    [accessToken]
  );

  const getCategories = useCallback(async () => {
    const res = await axios.get(api_server_url + '/api/user/categories', {
      headers
    });
    setCategories(res.data.data.category);
  }, [headers]);

  useEffect(() => {
    if (accessToken) {
      getCategories();
    }
  }, [accessToken, getCategories]);

  console.log(Categories);

  const userId = useParams().userId;
  const [addCategoryState, dispatch] = useReducer(categoryReducer, {
    addedCategories: []
  });

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
      {userId === 'my' ? (
        <div className='profile_categories'>
          <h3 className='profile-title'>Categories</h3>
          <div className='categories-list'>
            {Categories.map(category => (
              <CategoryItem
                key={category.id}
                title={category.category}
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
