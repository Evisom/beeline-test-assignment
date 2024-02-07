import styles from "./index.module.css";

const Autocomplete = ({ data, onChange, placeholder, value }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className={styles.autocomplete}>
      <input
        className={styles.autocomplete__input}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      />
      <ul className={styles.autocomplete__options}>
        {data.map((element, index) => {
          return (
            <li className={styles.autocomplete__option} key={index}>
              {element}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Autocomplete;
