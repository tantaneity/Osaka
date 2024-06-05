import { List, ListItem } from "@material-tailwind/react";
import { ClockIcon } from "@heroicons/react/24/solid";
import ReactDOM from "react-dom";

type SuggestionsListProps = {
  inputValue: string;
  history: string[];
  suggestions: { name: string }[];
  onClick: (suggestion: string) => void;
  position: { top: number; left: number; width: number };
};

const SuggestionsList = ({
  inputValue,
  history,
  suggestions,
  onClick,
  position
}: SuggestionsListProps) => {
  const style = {
    top: position.top + window.scrollY,
    left: position.left + window.scrollX,
    width: position.width
  };

  // Фильтрация и сортировка истории и подсказок
  const filteredHistory = history
    .filter(item => item.toLowerCase().includes(inputValue.toLowerCase()))
    .slice(0, 5);

  const filteredSuggestions = suggestions
    .filter(suggestion => suggestion.name.toLowerCase().includes(inputValue.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 5 - filteredHistory.length);

  return ReactDOM.createPortal(
    <div
      className="z-10 bg-white mt-1 rounded shadow-md flex justify-center"
      style={{ position: "absolute", ...style }}
    >
      <List key="">
        {filteredHistory.map((item, index) => (
          <a href={`/search?name=${item}`} key={index}>
            <ListItem onClick={() => onClick(item)}>
              <span className="mr-2">{item}</span>
              <ClockIcon className="w-5 h-5 text-blue-gray-500" />
            </ListItem>
          </a>
        ))}
        {filteredSuggestions.map((suggestion, index) => (
          <a href={`/search?name=${suggestion.name}`} key={index}>
            <ListItem onClick={() => onClick(suggestion.name)}>
              {suggestion.name}
            </ListItem>
          </a>
        ))}
      </List>
    </div>,
    document.getElementById("root")!
  );
};

export default SuggestionsList;
