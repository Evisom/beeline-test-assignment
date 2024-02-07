import Autocomplete from "./components/Autocomplete";
import "./App.css";
import { useState } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");

  const handleChange = async (string) => {
    setValue(string);
    const formattedString = string.toLowerCase().replace(/\s+/g, " ").trim(); // replace multiple spaces with one with regexp, trim trailing spaces and convert to lowercase
    fetch("https://dummyjson.com/products") // mock api
      .then((response) => response.json())
      .then((response) => {
        response = response.products
          .filter((element) => {
            // filter for mathing elements
            if (
              formattedString ===
              element.title.slice(0, formattedString.length).toLowerCase()
            ) {
              return true;
            }
            return false;
          })
          .map((element) => {
            // array of titles
            return element.title;
          });
        setData(response);
      });
  };

  const handleSelect = (val) => {
    setData([]);
    setValue(val);
  };

  return (
    <div className="App">
      <p>Autocomplete component</p>
      <p>value: {value}</p>
      <Autocomplete
        data={data}
        placeholder="Начните вводить текст..."
        onChange={handleChange}
        onSelect={handleSelect}
        value={value}
      />
    </div>
  );
};

export default App;
