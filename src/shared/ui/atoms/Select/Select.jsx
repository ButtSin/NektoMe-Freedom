import { useEffect, useId, useState } from 'react';

import styles from './Select.module.scss';

const Select = ({ description, options }) => {
  const selectId = useId();
  const customSelectId = useId();
  const selectLabelId = useId();

  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = (event) => {
    setIsOpen(!isOpen);
  };

  const selectedOption = options.find((option) => option.isSelected);

  return (
    <div className={`${styles.select}`}>
      <label id={selectLabelId} className={`${styles.select__description}`} for={selectId}>
        {description}
      </label>
      <select id={selectId} className={`${styles['select__original-control']}`} tabIndex='-1'>
        {options.map((option) => {
          return (
            <option
              className={`${styles.select__option}`}
              value={option.value}
              selected={option.select}
              key={option.value}
            >
              {option.description}
            </option>
          );
        })}
      </select>

      <div className={`${styles.select__body}`}>
        {selectedOption && (
          <div
            className={`${styles.select__button}`}
            tabIndex='0'
            role='combobox'
            aria-expanded={isOpen}
            aria-haspopup='listbox'
            aria-controls={customSelectId}
            aria-labelledby={selectLabelId}
            onClick={handleButtonClick}
          >
            {selectedOption.description}
          </div>
        )}

        {isOpen && (
          <div
            id={customSelectId}
            className={`${styles.select__dropdown}`}
            role='listbox'
            aria-labelledby={selectLabelId}
          >
            {options.map((option) => {
              return (
                <div
                  className={`${styles.select__option}`}
                  value={option.value}
                  selected={option.isSelected}
                  isSelected={option.isSelected}
                  role='option'
                  key={option.value}
                  aria-selected={option.isSelected}
                >
                  {option.description}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export { Select };
