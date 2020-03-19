import React, { useState, useEffect } from 'react';
import moment from 'moment';

import './CountDownTimer.css';

const Countdown = ({ timeTillDate }) => {
  const [timeLeft, setTimeLeft] = useState({});
  const calculateTimeLeft = props => {
    const then = timeTillDate;
    const now = moment();
    const countdown = then - now;
    const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
    const hours = Math.floor((countdown / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((countdown / 1000 / 60) % 60);
    const seconds = Math.floor((countdown / 1000) % 60);

    setTimeLeft({
      days,
      hours,
      minutes,
      seconds
    });
  };

  useEffect(() => {
    let id = setInterval(() => {
      calculateTimeLeft();
    }, 1000);
    return () => clearInterval(id);
  });

  const SVGCircle = ({ radius }) => (
    <svg className='countdown-svg'>
      <path
        fill='none'
        stroke='#16a085'
        strokeWidth='4'
        d={describeArc(50, 50, 48, 0, radius)}
      />
    </svg>
  );

  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  }

  function describeArc(x, y, radius, startAngle, endAngle) {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    var d = [
      'M',
      start.x,
      start.y,
      'A',
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y
    ].join(' ');

    return d;
  }

  function mapNumber(number, in_min, in_max, out_min, out_max) {
    return (
      ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
  }

  const { days, hours, minutes, seconds } = timeLeft;

  const daysRadius = mapNumber(days, 365, 0, 0, 360);
  const hoursRadius = mapNumber(hours, 24, 0, 0, 360);
  const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
  const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

  return (
    <div>
      <div className='countdown-wrapper'>
        {days && (
          <div className='countdown-item'>
            <SVGCircle radius={daysRadius} />
            {days}
            <span>days</span>
          </div>
        )}
        {hours > 0 && (
          <div className='countdown-item'>
            <SVGCircle radius={hoursRadius} />
            {hours}
            <span>hours</span>
          </div>
        )}
        {minutes > 0 && (
          <div className='countdown-item'>
            <SVGCircle radius={minutesRadius} />
            {minutes}
            <span>minutes</span>
          </div>
        )}
        {seconds > 0 && (
          <div className='countdown-item'>
            <SVGCircle radius={secondsRadius} />
            {seconds}
            <span>seconds</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Countdown;
