import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { getAbsoluteCoords } from '@/shared/lib/dom/getAbsoluteCoords';

import styles from './Select.module.scss';

const Select = ({ description, options, onChange }) => {
  const selectedOption = options.find((option) => option.isSelected);

  const selectId = useId();
  const customSelectId = useId();
  const selectLabelId = useId();

  const buttonRef = useRef();
  const dropdownRef = useRef();

  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = (event) => {
    onChange?.(event);

    setIsOpen(!isOpen);
  };

  useLayoutEffect(() => {
    if (!isOpen) return;

    const setDropdownPosition = () => {
      const buttonAbsoluteCoords = getAbsoluteCoords(buttonRef.current);

      dropdownRef.current.style.top =
        buttonRef.current.clientHeight + buttonAbsoluteCoords.top + 'px';
      dropdownRef.current.style.left = buttonAbsoluteCoords.left + 'px';
    };
    setDropdownPosition();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => setIsOpen(false);

    window.addEventListener('scroll', handleScroll, true);

    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [isOpen]);

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
            ref={buttonRef}
          >
            {selectedOption.description}
          </div>
        )}

        {isOpen &&
          createPortal(
            <div
              id={customSelectId}
              className={`${styles.select__dropdown}`}
              role='listbox'
              aria-labelledby={selectLabelId}
              ref={dropdownRef}
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
            </div>,
            document.body,
          )}
      </div>
    </div>
  );
};

export { Select };
