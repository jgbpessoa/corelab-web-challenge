import { ChangeEvent } from "react";

interface SearchInterface {
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent) => void;
}

const Search = (props: SearchInterface) => {
  return (
    <input
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

export default Search;
