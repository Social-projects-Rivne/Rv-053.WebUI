import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import { AuthContext } from '../../context/auth-context';
import { api_server_url } from '../../utilities/globalVariables';

const Pagination = props => {
  const [data, setData] = useState({ count: 0 });
  const [limitItemsOnPage, setLimitItemsOnPage] = useState(0);
  const [offsetItem, setOffsetItem] = useState(0);
  const [pagesCount, setPagesCount] = useState(1);
  const [page, setPage] = useState(1);
  const accessToken = useContext(AuthContext).token;
  const headers = {
    Authorization: 'Bearer ' + accessToken
  };

  const getUsersList = async () => {
    if (props.api) {
      try {
        const res = await axios.get(
          api_server_url + props.api + '?limit=' + limitItemsOnPage + '&offset=' + offsetItem,
          {
            headers
          }
        );
        setData(res.data);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const getPagesCount = () => {
    if (limitItemsOnPage > 0) {
      const pagesCountCalculation = Math.ceil(data.count / limitItemsOnPage);
      setPagesCount(pagesCountCalculation);
    }
  };

  useEffect(() => {
    setLimitItemsOnPage(props.limit ? props.limit : 20);
  }, []);

  useEffect(() => {
    getPagesCount();
    if (data) {
      props.getData(data);
    }
  }, [data]);

  useEffect(() => {
    getUsersList();
  }, [limitItemsOnPage, offsetItem]);

  let pageNumbers = [];

  for (let i = 1; i <= pagesCount; i++) {
    pageNumbers.push(i);
  }

  const PageHandler = pageAction => {
    if (pageAction === 'next') {
      setPage(page + 1);
      setOffsetItem(offsetItem + limitItemsOnPage);
    } else if (pageAction === 'prev') {
      setPage(page - 1);
      setOffsetItem(offsetItem - limitItemsOnPage);
    } else {
      setPage(pageAction);
      setOffsetItem(pageAction * limitItemsOnPage - limitItemsOnPage);
    }
  };

  return (
    <>
      {}
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={'page-item ' + (page < 2 ? 'disabled' : '')}>
            <button className="page-link" aria-label="Previous" onClick={() => PageHandler('prev')}>
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {pageNumbers.map(pageNamber => (
            <li
              className={
                'page-item ' +
                (page === pageNamber ? 'active' : '') +
                (page === '...' ? 'disabled' : '')
              }
              key={'pagenumber' + pageNamber}
              onClick={() => PageHandler(pageNamber)}
            >
              <button className="page-link" aria-label="Previous">
                {pageNamber}
              </button>
            </li>
          ))}
          <li className={'page-item ' + (page === pagesCount ? 'disabled' : '')}>
            <button className="page-link" aria-label="Next" onClick={() => PageHandler('next')}>
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
      {props.children}
    </>
  );
};

export default Pagination;
