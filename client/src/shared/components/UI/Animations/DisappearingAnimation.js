import React from 'react';
import Transition from 'react-transition-group/Transition';

import './DisappearingAnimation.css';

const DisappearingAnimation = props => {
  return (
    <Transition
      in={props.triger}
      timeout={{ enter: 0, exit: props.timeout || 400 }}
      mountOnEnter={props.mountOnEnter || false}
      unmountOnExit={props.unmountOnExit || false}
    >
      {transition => {
        const cssClasses = [
          'disappearing-element',
          transition === 'entering'
            ? 'disappearing-element-hide'
            : transition === 'entered'
            ? 'disappearing-element-show'
            : transition === 'exiting'
            ? 'disappearing-element-hide'
            : null
        ];
        console.log(transition);
        return <div className={cssClasses.join(' ')}>{props.children}</div>;
      }}
    </Transition>
  );
};

export default DisappearingAnimation;
