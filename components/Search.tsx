import React, {useRef, useState} from 'react';
import {APIProvider, useAutocomplete} from '@vis.gl/react-google-maps';

const Search = () => {
  const inputRef = useRef<any>(null);
  const [inputValue, setInputValue] = useState('');

  const onPlaceChanged = place => {
    if (place) {
      setInputValue(place.formatted_address || place.name);
    }

    // Keep focus on input element
    inputRef.current && inputRef.current.focus();
  };

  useAutocomplete({
    inputField: inputRef && inputRef.current,
    onPlaceChanged
  });

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={['places']}>
        <input ref={inputRef} value={inputValue} onChange={handleInputChange} />
    </APIProvider>
    
  );
};

export default Search;