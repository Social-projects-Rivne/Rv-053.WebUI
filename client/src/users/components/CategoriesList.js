import React, {
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
import Notificator from '../../shared/components/UI/Notificator';
import CategoryItem from './CategoryItem';

const UserCategories = () => {
  const [Categories, setCategories] = useState([]);
  const [addedFromBackCategories, setAddedCategories] = useState([]);
  const accessToken = useContext(AuthContext).token;
  const [showNoteState, setShowNoteState] = useState(false);
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
    const iconsArr = [
      `icon-headphones`,
      `icon-futbol-o`,
      `icon-bicycle`,
      `icon-cogs`,
      `icon-film`,
      `icon-stethoscope`,
      `icon-graduation-cap`,
      `icon-globe`,
      `icon-shopping-bag`,
      `icon-envira`,
      `icon-paint-brush`,
      `icon-cut`
    ];
    res.data.data.category.forEach(
      (item, index) => (item.icons = iconsArr[index])
    );
    setCategories(res.data.data.category);
  }, [headers]);

  const getAddedCategories = useCallback(async () => {
    const res = await axios.get(
      api_server_url + '/api/user/followed-categories',
      {
        headers
      }
    );
    setAddedCategories(res.data.data.followedCategory);
  }, [headers]);

  useEffect(() => {
    if (accessToken) {
      getCategories();
      getAddedCategories();
    }
  }, [accessToken, getCategories, getAddedCategories]);

  let SubscribedCategoriesArr = [...addedFromBackCategories].map(
    item => item['category.id']
  );

  const userId = useParams().userId;

  const addCategoryHandler = async (id, category) => {
    if (!SubscribedCategoriesArr.includes(id)) {
      await axios
        .post(
          api_server_url + `/api/user/follow-category/${id}`,
          {},
          {
            headers
          }
        )
        .then(() => {
          getAddedCategories();
          setShowNoteState(category);
        });
    } else {
      await axios
        .delete(api_server_url + `/api/user/unfollow-category/${id}`, {
          headers
        })
        .then(() => {
          getAddedCategories();
        });
    }
  };
  const closeNoteHandler = () => {
    setShowNoteState(false);
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
                icon={category.icons}
                click={() => addCategoryHandler(category.id, category.category)}
                isAdded={SubscribedCategoriesArr.includes(category.id)}
              />
            ))}
          </div>
        </div>
      ) : null}
      <Notificator
        className='success-note'
        message={`You are successfully subscribed on ${showNoteState}. Events from that category will be showed first on main page`}
        show={showNoteState ? true : false}
        onExit={closeNoteHandler}
      />
    </>
  );
};

export default UserCategories;
