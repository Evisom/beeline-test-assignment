import { useEffect, useState } from "react";
import styles from "./index.module.css";

const Autocomplete = ({ data, onChange, onSelect, placeholder, value }) => {
  const [keyIndex, setKeyIndex] = useState(null);
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const handleClick = (event) => {
    onSelect(event.target.textContent);
  };

  const handleKeyDown = (event) => {
    console.log(event.key, keyIndex);
    switch (event.key) {
      case "ArrowUp":
        if (keyIndex) {
          setKeyIndex(keyIndex - 1);
        }
        break;

      case "ArrowDown":
        if (keyIndex === null) {
          setKeyIndex(0);
        } else if (keyIndex < data.length - 1) {
          setKeyIndex(keyIndex + 1);
        }
        break;

      case "Enter":
        if (data[keyIndex]) {
          onSelect(data[keyIndex]);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setKeyIndex(null);
  }, [data]);

  return (
    <div className={styles.autocomplete} onKeyDown={handleKeyDown}>
      <input
        className={styles.autocomplete__input}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      />

      {data.length ? (
        <ul className={styles.autocomplete__options}>
          {data.map((element, index) => {
            return (
              <li
                onClick={handleClick}
                className={index === keyIndex ? styles.selected : ""}
                key={index}
              >
                {element}
              </li>
            );
          })}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default Autocomplete;
