
import { useState, useEffect } from 'react';

type CitySuggestion = {
  id: number;
  name: string;
  country: string;
  admin1?: string;
};

type SearchBarProps = {
  onSearch: (city: string) => void;
};

// Calculate the difference between two words
const getEditDistance = (first: string, second: string): number => {
  const matrix: number[][] = [];

  for (let i = 0; i <= first.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= second.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= first.length; i++) {
    for (let j = 1; j <= second.length; j++) {
      const cost = first[i - 1] === second[j - 1] ? 0 : 1;

      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[first.length][second.length];
};

// Popular cities for spelling correction
const popularCities = [
  'London',
  'Dubai',
  'Kochi',
  'Mumbai',
  'Delhi',
  'Paris',
  'New York',
  'Abu Dhabi',
  'Bengaluru',
  'Chennai',
  'Kasaragod',
  'Calicut',
  'Kannur',
  'Doha',
  'Singapore',
];

// Find the closest matching city
const findClosestCity = (input: string): string | null => {
  const normalizedInput = input.toLowerCase().trim();

  let closestCity: string | null = null;
  let minimumDistance = Infinity;

  popularCities.forEach((city) => {
    const distance = getEditDistance(
      normalizedInput,
      city.toLowerCase()
    );

    if (distance < minimumDistance) {
      minimumDistance = distance;
      closestCity = city;
    }
  });

  return minimumDistance > 0 && minimumDistance <= 2
    ? closestCity
    : null;
};

function SearchBar({ onSearch }: SearchBarProps) {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [correctedCity, setCorrectedCity] = useState<string | null>(null);

  // Fetch city suggestions when the user types
  useEffect(() => {
    if (city.trim().length < 2) {
      setSuggestions([]);
      setCorrectedCity(null);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            city.trim()
          )}&count=5&language=en&format=json`
        );

        if (!response.ok) {
          throw new Error('Unable to fetch city suggestions');
        }

        const data = await response.json();

        const results: CitySuggestion[] = data.results || [];

        setSuggestions(results);

        // Check spelling even if API suggestions are available
        const corrected = findClosestCity(city.trim());

        setCorrectedCity(corrected);
      } catch (error) {
        console.error('Suggestion error:', error);
        setSuggestions([]);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [city]);

  // Handle search button click or Enter key
  const handleSearch = () => {
    const trimmedCity = city.trim();

    if (!trimmedCity) {
      setError('Please enter a city name');
      return;
    }

    setError('');
    setSuggestions([]);

    onSearch(trimmedCity);
  };

  // Handle autocomplete selection
  const handleSuggestionClick = (suggestion: CitySuggestion) => {
    setCity(suggestion.name);
    setSuggestions([]);
    setCorrectedCity(null);
    setError('');
  };

  // Handle spelling correction selection
  const handleCorrectionClick = () => {
    if (!correctedCity) return;

    setCity(correctedCity);
    setCorrectedCity(null);
    setSuggestions([]);
    setError('');
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setError('');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />

        {/* Autocomplete suggestions */}
        {suggestions.length > 0 && (
          <div className="suggestions-list">
            {suggestions.map((suggestion) => (
              <button
                type="button"
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.name},{' '}
                {suggestion.admin1
                  ? `${suggestion.admin1}, `
                  : ''}
                {suggestion.country}
              </button>
            ))}
          </div>
        )}

        {/* Spelling correction suggestion */}
        {correctedCity && (
          <p className="correction-message">
            Did you mean{' '}
            <button
              type="button"
              onClick={handleCorrectionClick}
            >
              {correctedCity}
            </button>
            ?
          </p>
        )}
      </div>

      <button onClick={handleSearch}>Search</button>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default SearchBar;
