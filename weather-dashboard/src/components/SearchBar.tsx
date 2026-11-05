import { useState } from 'react';

type SearchBarProps = {
  onSearch: (city: string) => void;
};

function SearchBar({ onSearch }: SearchBarProps) {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const handleSearch = () => {
    const trimmedCity = city.trim();

    if (!trimmedCity) {
      setError('Please enter a city name');
      return;
    }

    setError('');
    onSearch(trimmedCity);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />

      <button onClick={handleSearch}>Search</button>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default SearchBar;