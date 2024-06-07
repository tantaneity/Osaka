import React from "react";
import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface SearchInputProps {
  searchTerm: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchTerm, handleSearch }) => {
  return (
    <Input
      icon={<MagnifyingGlassIcon className="h-5 w-5" />}
      label="Search"
      value={searchTerm}
      onChange={handleSearch}
      crossOrigin={undefined}
    />
  );
};

export default SearchInput;
