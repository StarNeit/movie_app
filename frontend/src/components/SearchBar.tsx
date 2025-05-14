import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

type Props = {
  onSearch: (query: string) => void;
  suggestions: string[];
};

const SearchBar: React.FC<Props> = ({ onSearch, suggestions }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query.length > 0) setShowSuggestions(true);
    else setShowSuggestions(false);
  }, [query]);

  return (
    <div className="search">
      <Search size={20} />
      <input
        placeholder="Search movies..."
        value={query}
        onChange={e => {
          setQuery(e.target.value);
          onSearch(e.target.value);
        }}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul>
          {suggestions.map((s, i) => (
            <li
              key={i}
              onMouseDown={() => {
                setQuery(s);
                onSearch(s);
                setShowSuggestions(false);
              }}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar; 