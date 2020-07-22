import React from 'react';
import Transition from 'react-transition-group/Transition';

import './RollingAnimation.css';

const RollingAnimation = props => {
  return (
    <Transition
      in={props.triger}
      timeout={{ enter: 0, exit: props.timeout || 400 }}
      mountOnEnter={props.mountOnEnter || false}
      unmountOnExit={props.unmountOnExit || false}
    >
      {transition => {
        const cssClasses = [
          'rolling-element',
          transition === 'entering'
            ? 'rolling-element-hide'
            : transition === 'entered'
            ? 'rolling-element-show'
            : transition === 'exiting'
            ? 'rolling-element-hide'
            : null
        ];
        return <div className={cssClasses.join(' ')}>{props.children}</div>;
      }}
    </Transition>
  );
};

export default RollingAnimation;
