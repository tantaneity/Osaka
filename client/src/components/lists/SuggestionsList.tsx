import { List, ListItem } from "@material-tailwind/react";
import { ClockIcon } from "@heroicons/react/24/solid";
import ReactDOM from "react-dom";

type SuggestionsListProps = {
  history: string[];
  suggestions: { name: string }[];
  onClick: (suggestion: string) => void;
  position: { top: number; left: number; width: number };
};

const SuggestionsList = ({ history, suggestions, onClick, position }: SuggestionsListProps) => {
  const style = {
    top: position.top + window.scrollY,
    left: position.left + window.scrollX,
    width: position.width,
  };

  return ReactDOM.createPortal(
    <div
      className="z-10 bg-white mt-1 rounded shadow-md flex justify-center"
      style={{ position: 'absolute', ...style }}
    >
      <List>
        {history.map((item, index) => (
        <a href={`/search?name=${item}`}>
                <ListItem key={index} onClick={() => onClick(item)}>
                    <span className="mr-2">{item}</span>
                    <ClockIcon className="w-5 h-5 text-blue-gray-500" />
                </ListItem>
            </a>
          
        ))}
        {suggestions.map((product, index) => (
            <a href={`/search?name=${product.name}`}>
                <ListItem key={index} onClick={() => onClick(product.name)}>
                    {product.name}
                </ListItem>
            </a>
          
        ))}
      </List>
    </div>,
    document.getElementById('root')!
  );
};

export default SuggestionsList;
