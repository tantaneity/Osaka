import { useSearchProducts } from "@/hooks/useProducts";
import useSearchHistoryStore from "@/store/SearchHistoryStore";
import { Button, Input } from "@material-tailwind/react";
import { useState, useRef, useEffect } from "react";
import SuggestionsList from "../lists/SuggestionsList";


export default function InputSearch() {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const { data: products } = useSearchProducts({ name: query, limit: 10 });
  const { history, addToHistory } = useSearchHistoryStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    setShowSuggestions(!!inputValue.trim());
  };

  const handleSearch = () => {
    addToHistory(query);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    addToHistory(suggestion);
    setShowSuggestions(false);
  };

  const suggestions = products ? products : [];

  useEffect(() => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom,
        left: rect.left,
        width: rect.width,
      });
    }
  }, [query, showSuggestions]);

  return (
    <div className="relative flex w-full gap-2 md:w-max">
      <Input
        type="search"
        color="blue-gray"
        label="Type here..."
        className="pr-20 bg-transparent"
        containerProps={{
          className: "min-w-[200px]",
        }}
        value={query}
        onChange={handleInputChange}
        ref={inputRef} crossOrigin={undefined}      />
      <Button
        size="sm"
        className="!absolute right-1 top-1 rounded bg-blue-gray-400"
        onClick={handleSearch}
      >
        Search
      </Button>
      {showSuggestions && query.trim() && (
        <SuggestionsList
          history={history}
          suggestions={suggestions}
          onClick={handleSuggestionClick}
          position={position}
        />
      )}
    </div>
  );
}
