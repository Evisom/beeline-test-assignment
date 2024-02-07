import { useEffect, useState, useRef } from "react";
import styles from "./index.module.css";

const Autocomplete = ({ data, onChange, onSelect, placeholder, value }) => {
  const [keyIndex, setKeyIndex] = useState(null);
  const optionsRef = useRef(null);
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const handleClick = (event) => {
    onSelect(event.target.textContent);
  };

  const handleKeyDown = (event) => {
    const cursorPosition = event.target.selectionStart;
    switch (event.key) {
      case "ArrowUp":
        if (keyIndex) {
          setKeyIndex(keyIndex - 1);
          scrollToOption(keyIndex - 1);
        }
        setTimeout(() => {
          event.target.setSelectionRange(cursorPosition, cursorPosition);
        });
        break;

      case "ArrowDown":
        if (keyIndex === null) {
          setKeyIndex(0);
        } else if (keyIndex < data.length - 1) {
          setKeyIndex(keyIndex + 1);
          scrollToOption(keyIndex + 1);
        }
        event.target.setSelectionRange(cursorPosition, cursorPosition);
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

  const scrollToOption = (index) => {
    const option = optionsRef.current.children[index];
    if (option) {
      option.scrollIntoView({ behavior: "smooth", block: "nearest" });
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
        <ul className={styles.autocomplete__options} ref={optionsRef}>
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
