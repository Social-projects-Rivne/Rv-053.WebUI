import React, { useState, useEffect, useCallback } from 'react';

import NumberCounter from './NumberCounter';

const DurationPicker = props => {
  const [duration, setDuration] = useState(props.duration || 30);
  const displayMinutes = duration % 60;
  const displayHours = Math.trunc((duration / 60) % 24);
  const displayDays = Math.trunc(duration / 60 / 24);

  const handleDays = useCallback(
    days => {
      setDuration(days * 24 * 60 + displayHours * 60 + displayMinutes);
    },
    [displayHours, displayMinutes]
  );
  const handleHours = useCallback(
    hours => {
      setDuration(displayDays * 24 * 60 + hours * 60 + displayMinutes);
    },
    [displayDays, displayMinutes]
  );
  const handleMinutes = useCallback(
    minutes => {
      setDuration(displayDays * 24 * 60 + displayHours * 60 + minutes);
    },
    [displayDays, displayHours]
  );

  const { onChange } = props;
  useEffect(() => {
    if (onChange) onChange(duration);
  }, [duration]);

  return (
    <div className="row">
      <div className="col-4">
        <label>{displayDays === 1 ? 'Day' : 'Days'}</label>
        <NumberCounter min={0} max={60} onChange={handleDays} value={displayDays} />
      </div>
      <div className="col-4">
        <label>{displayHours <= 1 ? 'Hour' : 'Hours'}</label>
        <NumberCounter min={0} max={24} onChange={handleHours} value={displayHours} />
      </div>
      <div className="col-4">
        <label>Minutes</label>
        <NumberCounter min={0} max={60} step={10} onChange={handleMinutes} value={displayMinutes} />
      </div>
    </div>
  );
};

export default DurationPicker;
