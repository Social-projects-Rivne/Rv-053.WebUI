import React, { useState, useEffect } from 'react';
import Transition from 'react-transition-group/Transition';

import './Select.css';

const Selector = props => {
  const items = [...props.items];
  const [firstTimeLoadFlag, setFirstTimeLoadFlag] = useState(true);
  const [dropdownShow, setDropdownShow] = useState(false);

  const selectDropdownItems = (
    <ul style={{ padding: '0' }}>
      {items.map((item, id) => {
        return (
          <li
            key={id}
            className="dropdown-item cursor-pointer"
            onClick={() => {
              props.onChange(item);
              setDropdownShow(false);
            }}
          >
            <div className={`d-inline-block ${item.icon} mr-2`}></div>
            <span className="d-inline-block mr-2">{item.title}</span>
            <span className="text-muted">{item.info}</span>
          </li>
        );
      })}
    </ul>
  );

  useEffect(() => {
    if (!firstTimeLoadFlag) {
      setDropdownShow(!dropdownShow);
    } else {
      setFirstTimeLoadFlag(false);
    }
  }, [props.triger]);

  return (
    <>
      <Transition in={dropdownShow} timeout={{ enter: 0, exit: 300 }} mountOnEnter unmountOnExit>
        {transition => {
          const cssClasses = [
            props.className,
            'dropdown-menu',
            'show',
            'custom-scrollbar',
            transition === 'entering'
              ? 'dropdown-menu-hide'
              : transition === 'entered'
              ? 'dropdown-menu-show'
              : transition === 'exiting'
              ? 'dropdown-menu-hide'
              : null
          ];
          return <div className={cssClasses.join(' ')}>{selectDropdownItems}</div>;
        }}
      </Transition>
    </>
  );
};

export default Selector;
