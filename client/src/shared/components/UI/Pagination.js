import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo
} from 'react';
import axios from 'axios';

import { AuthContext } from '../../context/auth-context';
import { api_server_url } from '../../utilities/globalVariables';
import './Pagination.css';

const Pagination = props => {
  const [rowsCount, setRowsCount] = useState(0);
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [page, setPage] = useState(1);
  const query = props.query ? props.query : '';
  const limitItemsOnPage = props.pageItemsLimit ? props.pageItemsLimit : 20;
  const pagesCount = Math.ceil(rowsCount / limitItemsOnPage);
  const accessToken = useContext(AuthContext).token;
  const headers = useMemo(
    () => ({
      Authorization: 'Bearer ' + accessToken
    }),
    [accessToken]
  );

  const { onDataFetch, api } = props;
  const getItemsList = useCallback(async () => {
    if (api) {
      try {
        const offsetItem = limitItemsOnPage * (page - 1);
        setLoadingFlag(true);
        const res = await axios({
          method: 'get',
          url: api_server_url + api,
          params: {
            ...query,
            limit: limitItemsOnPage,
            offset: offsetItem
          },
          headers
        });
        setRowsCount(res.data.count);
        onDataFetch(res.data);

        setLoadingFlag(false);
      } catch (e) {
        console.log(e);
      }
    }
  }, [headers, api, page, query, limitItemsOnPage, onDataFetch]);

  useEffect(() => {
    getItemsList();
    console.log(props.query);
  }, [page, JSON.stringify(props.query)]);

  const formPageNumbers = (start, end) => {
    const arr = [];
    for (let i = start; i <= end; i++) {
      arr.push(i);
    }
    return arr;
  };

  let pageNumbers = [];
  if (pagesCount <= 5) {
    pageNumbers = formPageNumbers(1, pagesCount);
  } else {
    if (page <= 3) {
      pageNumbers = formPageNumbers(1, 5);
    } else if (page > 3 && page <= pagesCount - 3) {
      pageNumbers = formPageNumbers(page - 2, page + 2);
    } else if (page > pagesCount - 3) {
      pageNumbers = formPageNumbers(pagesCount - 4, pagesCount);
    }
  }

  const PageHandler = useCallback(
    pageAction => {
      if (pageAction === 'next') {
        setPage(page + 1);
      } else if (pageAction === 'prev') {
        setPage(page - 1);
      } else {
        setPage(pageAction);
      }
    },
    [setPage, page]
  );

  const pagingLine = (
    <nav aria-label='Page navigation'>
      <ul className='pagination justify-content-center'>
        <li className={'pagination__page-item ' + (page < 2 ? 'disabled' : '')}>
          <button
            className='pagination__page-link'
            aria-label='Previous'
            onClick={() => PageHandler(1)}
            disabled={loadingFlag}
          >
            <span aria-hidden='true'>First</span>
          </button>
        </li>
        <li className={'pagination__page-item ' + (page < 2 ? 'disabled' : '')}>
          <button
            className='pagination__page-link'
            aria-label='Previous'
            onClick={() => PageHandler('prev')}
            disabled={loadingFlag}
          >
            <span aria-hidden='true'>&laquo;</span>
          </button>
        </li>
        {pageNumbers.map(pageNamber => (
          <li
            className={
              'pagination__page-item ' +
              (page === pageNamber ? 'active' : '') +
              (page === '...' ? 'disabled' : '')
            }
            key={'pagenumber' + pageNamber}
          >
            <button
              className='pagination__page-link'
              aria-label='Previous'
              onClick={() => PageHandler(pageNamber)}
              disabled={loadingFlag}
            >
              {pageNamber}
            </button>
          </li>
        ))}
        <li
          className={
            'pagination__page-item ' + (page === pagesCount ? 'disabled' : '')
          }
        >
          <button
            className='pagination__page-link'
            aria-label='Next'
            onClick={() => PageHandler('next')}
            disabled={loadingFlag}
          >
            <span aria-hidden='true'>&raquo;</span>
          </button>
        </li>
        <li
          className={
            'pagination__page-item ' + (page === pagesCount ? 'disabled' : '')
          }
        >
          <button
            className='pagination__page-link'
            aria-label='Next'
            onClick={() => PageHandler(pagesCount)}
            disabled={loadingFlag}
          >
            <span aria-hidden='true'>Last</span>
          </button>
        </li>
      </ul>
    </nav>
  );

  return (
    <>
      {pagingLine}
      {props.children}
      {props.children && limitItemsOnPage > 5 ? pagingLine : null}
    </>
  );
};

export default Pagination;