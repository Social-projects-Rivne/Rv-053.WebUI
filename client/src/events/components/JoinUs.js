import React from 'react';

import './JoinUs.css';

const JoinUs = () => {
  return (
    <section className="join__us">
      <div className="join__us-title">
        Eeeeevent works in <span>3</span> clicks!
      </div>
      <div className="join__us-items">
        <div className="join__us-item">
          <span className="join__us-icon icon-search"></span>
          <span className="join__us-subtitle">Find</span>
        </div>
        <div className="join__us-item">
          <span className="join__us-icon icon-handshake-o"></span>
          <span className="join__us-subtitle">Join</span>
        </div>
        <div className="join__us-item">
          <span className="join__us-icon icon-child"></span>
          <span className="join__us-subtitle">Enjoy</span>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
