import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import './AutocompetePlaces.css';

const AutocompletePlaces = ({ setCoordinates }) => {
  const [address, setAddress] = useState('');

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  return (
    <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="autocomplete-container">
          <input
            style={{ width: '100%' }}
            {...getInputProps({
              placeholder: 'Search Places ...',
              className: 'location-search-input'
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
              const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
              const style = suggestion.active
                ? { backgroundColor: '#16a085', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default AutocompletePlaces;
