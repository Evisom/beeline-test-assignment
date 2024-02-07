import { useEffect, useState, useRef } from "react";
import styles from "./index.module.css";

const Autocomplete = ({ data, onChange, onSelect, placeholder, value }) => {
  const [keyIndex, setKeyIndex] = useState(null); // option keyboard navigation
  const [showOptions, setShowOptions] = useState(false); // depends on focus
  const optionsRef = useRef(null);

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const handleKeyDown = (event) => {
    const cursorPosition = event.target.selectionStart; // store the cursor position
    switch (
      event.key // handle keys
    ) {
      case "ArrowUp":
        if (keyIndex) {
          // if its not first click
          setKeyIndex(keyIndex - 1);
          scrollToOption(keyIndex - 1);
        }
        setTimeout(() => {
          event.target.setSelectionRange(cursorPosition, cursorPosition); // restore cursor position
        });
        break;

      case "ArrowDown":
        if (keyIndex === null) {
          // check for first click
          setKeyIndex(0);
        } else if (keyIndex < data.length - 1) {
          setKeyIndex(keyIndex + 1);
          scrollToOption(keyIndex + 1);
        }
        event.target.setSelectionRange(cursorPosition, cursorPosition); // restore cursor position
        break;

      case "Enter":
        if (data[keyIndex]) {
          // if value exists
          onSelect(data[keyIndex]);
        }
        break;
      default:
        break;
    }
  };

  const handleClick = (event, index) => {
    event.preventDefault();
    onSelect(data[index]);
  };

  const scrollToOption = (index) => {
    // function that scrolls to exact element on keydown
    const option = optionsRef.current.children[index];
    if (option) {
      option.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  useEffect(() => {
    setKeyIndex(null); // keyIndex is unset by default
  }, [data]);

  return (
    <div className={styles.autocomplete}>
      <input
        className={styles.autocomplete__input}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={() => setShowOptions(true)}
        onBlur={() => setShowOptions(false)}
        onKeyDown={handleKeyDown}
        value={value}
      />

      {showOptions && data.length ? ( // show options on if data is not empty and input on focus
        <ul className={styles.autocomplete__options} ref={optionsRef}>
          {data.map((element, index) => (
            <li
              key={index}
              onMouseDown={(event) => handleClick(event, index)}
              className={index === keyIndex ? styles.selected : ""}
            >
              {element}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Autocomplete;
