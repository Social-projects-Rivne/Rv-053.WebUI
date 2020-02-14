import React from 'react';
import Transition from 'react-transition-group/Transition';

import './ShakingAnimation.css';

const ShakingAnimation = props => {
  return (
    <Transition
      in={props.triger}
      timeout={{ enter: 0, exit: props.timeout || 400 }}
      mountOnEnter={props.mountOnEnter || false}
      unmountOnExit={props.unmountOnExit || false}
    >
      {transition => {
        const cssClasses = [
          transition === 'entering' ? '' : transition === 'entered' ? 'shaking-element' : null
        ];
        console.log(transition);
        return <div className={cssClasses.join(' ')}>{props.children}</div>;
      }}
    </Transition>
  );
};

export default ShakingAnimation;
