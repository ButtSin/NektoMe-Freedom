import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { transitionDuration } from '@/shared/config/constants';
import { useAnimation } from '@/shared/hooks/useAnimation';
import { pxToRem, remToPx } from '@/shared/lib/dom/rootRem';

import { ShadowScroll } from '../ShadowScroll/ShadowScroll';

import styles from './Select.module.scss';

const rootStyles = getComputedStyle(document.documentElement);
const OUTLINE_SIZE = parseFloat(rootStyles.getPropertyValue('--outline-size'));

const OPTION_PADDING_BLOCK = pxToRem(6);
const OPTION_HEIGHT = pxToRem(24) + OPTION_PADDING_BLOCK * 2;

const DROPDOWN_TOP_OFFSET = 8;
const DROPDOWN_PD_BLOCK = pxToRem(6);
const rowGap = OUTLINE_SIZE * 2;

const Select = ({
  description,
  placeholder = 'Выберите...',
  options,
  onChange,
  buttonWidth = '100%',
  maxVisibleOptions = 5,
}) => {
  const visibleCount = Math.min(options.length, maxVisibleOptions);
  const dropdownHeight = visibleCount * (OPTION_HEIGHT + rowGap);

  const selectId = useId();
  const customSelectId = useId();
  const selectLabelId = useId();

  const buttonRef = useRef();
  const dropdownRef = useRef();
  const optionsRef = useRef([]);

  const [isOpen, setIsOpen] = useState(false);
  const { isVisible, isMounted } = useAnimation(isOpen, transitionDuration);
  const [selectedOption, setSelectedOption] = useState(
    options.find((option) => option.isSelected) ?? null,
  );
  const [activeOptionId, setActiveOptionId] = useState(selectedOption?.id);
  const [isKeyboardChange, setIsKeyboardChange] = useState(false);
  const [dropdownCoords, setDropdownCoords] = useState({ top: 0, left: 0 });

  const addToOptionsRef = (el, index) => {
    if (el) {
      optionsRef.current[index] = el;
    }
  };

  const handleButtonClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleButtonKeyDown = (event) => {
    if (event.code === 'Escape' && isOpen) {
      event.preventDefault();

      setIsOpen(false);
      return;
    }

    if (
      event.code !== 'ArrowLeft' &&
      event.code !== 'ArrowRight' &&
      event.code !== 'ArrowUp' &&
      event.code !== 'ArrowDown' &&
      event.code !== 'Enter' &&
      event.code !== 'Space' &&
      event.code !== 'Home' &&
      event.code !== 'End' &&
      event.code !== 'Tab'
    )
      return;

    if (
      event.code !== 'Tab' ||
      (event.code === 'ArrowLeft' && isOpen) ||
      (event.code === 'ArrowRight' && isOpen)
    ) {
      event.preventDefault();
    }

    if (event.code === 'Enter' || event.code === 'Space') {
      if (event.code === 'Enter' && isOpen) {
        const newSelectedOption = options.find((o) => o.id === activeOptionId);
        setSelectedOption(newSelectedOption);
        setIsOpen(false);
        onChange?.(event);

        return;
      }

      setIsOpen(true);

      return;
    }

    if (event.code === 'Tab' && isOpen) {
      event.preventDefault();

      const newSelectedOption = options.find((o) => o.id === activeOptionId);
      onChange?.(event);
      setSelectedOption(newSelectedOption);
      setIsOpen(false);
      buttonRef.current.focus();

      return;
    }

    const selectedOptionIndex = options.findIndex((option) => option.id === selectedOption?.id);

    let indexOffset = 0;
    if ((event.code === 'ArrowRight' && !isOpen) || event.code === 'ArrowDown') {
      indexOffset = 1;
    } else if ((event.code === 'ArrowLeft' && !isOpen) || event.code === 'ArrowUp') {
      indexOffset = -1;
    }

    let newSelectedOptionIndex = selectedOptionIndex + indexOffset;

    if (event.code === 'Home') {
      newSelectedOptionIndex = 0;
    } else if (event.code === 'End') {
      newSelectedOptionIndex = options.length - 1;
    } else if (newSelectedOptionIndex < 0) {
      newSelectedOptionIndex = options.length - 1;
    } else if (newSelectedOptionIndex > options.length - 1) {
      newSelectedOptionIndex = 0;
    }

    const newSelectedOption = options[newSelectedOptionIndex];

    const currentOptionRef = optionsRef.current.find(
      (option) => option?.id === newSelectedOption.id,
    );
    if (currentOptionRef) {
      currentOptionRef.scrollIntoView({ block: 'nearest' });
    }

    onChange?.(event);

    setIsKeyboardChange(true);
    setActiveOptionId(newSelectedOption.id);
    setSelectedOption(newSelectedOption);
  };

  const handleOptionClick = (event) => {
    const newSelectedOption = options.find((option) => option.id === event.currentTarget.id);

    buttonRef.current.focus();

    onChange?.(event);

    setSelectedOption(newSelectedOption);
    setActiveOptionId(newSelectedOption.id);
    setIsOpen(false);
  };

  const handleOptionMouseDown = (event) => {
    event.preventDefault();
  };

  const handleOptionMouseMove = (event) => {
    if (isKeyboardChange) {
      setIsKeyboardChange(false);
      return;
    }

    setActiveOptionId(event.currentTarget.id);
  };

  useLayoutEffect(() => {
    if (!isMounted) return;
    if (!buttonRef.current || !dropdownRef.current) return;

    const setDropdownPosition = () => {
      const buttonMetrics = buttonRef.current.getBoundingClientRect();
      const buttonAbsoluteCoords = {
        top: buttonMetrics.top + window.pageYOffset,
        left: buttonMetrics.left + window.pageXOffset,
        right: buttonMetrics.right + window.pageXOffset,
        bottom: buttonMetrics.bottom + window.pageYOffset,
      };

      const width = (buttonMetrics.width / 100) * 80 + 'px';
      const top = buttonAbsoluteCoords.bottom + DROPDOWN_TOP_OFFSET + 'px';
      const left = buttonAbsoluteCoords.left + 'px';

      // eslint-disable-next-line @eslint-react/set-state-in-effect
      setDropdownCoords({ '--dropdownWidth': width, top, left });
    };

    setDropdownPosition();
  }, [isMounted, isOpen]);

  useEffect(() => {
    if (!isOpen || !buttonRef.current) return;

    buttonRef.current.focus();

    const handleScroll = (event) => {
      if (event.target === dropdownRef.current) return;

      setIsOpen(false);
    };

    const handleMouseDown = (event) => {
      if (buttonRef.current?.contains(event.currentTarget)) return;
      if (dropdownRef.current?.contains(event.currentTarget)) return;

      setIsOpen(false);
    };

    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isOpen]);

  return (
    <div className={`${styles.select}`} style={{ '--buttonWidth': buttonWidth }}>
      <label id={selectLabelId} className={`${styles.select__description}`} for={selectId}>
        {description}
      </label>

      <select
        id={selectId}
        className={`${styles['select__original-control']}`}
        tabIndex='-1'
        value={selectedOption?.value}
        aria-hidden='true'
      >
        {options.map((option) => {
          return (
            <option className={`${styles.select__option}`} value={option.value} key={option.value}>
              {option.description}
            </option>
          );
        })}
      </select>

      <div className={`${styles.select__body}`}>
        <div
          className={`${styles.select__button} ${isOpen ? styles['select__button--active'] : ''}
            surface surface--secondary`}
          tabIndex='0'
          role='combobox'
          aria-autocomplete='none'
          aria-activedescendant={isOpen ? activeOptionId : undefined}
          aria-expanded={isOpen}
          aria-haspopup='listbox'
          aria-controls={customSelectId}
          aria-labelledby={selectLabelId}
          onClick={handleButtonClick}
          onKeyDown={handleButtonKeyDown}
          ref={buttonRef}
        >
          {selectedOption ? (
            selectedOption?.description
          ) : (
            <span className={`${styles.select__placeholder}`}>{placeholder}</span>
          )}
        </div>

        {isMounted &&
          createPortal(
            <div
              id={customSelectId}
              className={`${styles.select__dropdown} 
                ${!isVisible ? styles['select__dropdown--hidden'] : ''} 
                  surface surface--secondary disable-scrollbar`}
              role='listbox'
              aria-hidden={!isVisible}
              aria-labelledby={selectLabelId}
              style={{
                ...dropdownCoords,
                height: options.length === maxVisibleOptions ? 'auto' : dropdownHeight + 'rem',
                paddingBlock: DROPDOWN_PD_BLOCK + 'rem',
                rowGap: rowGap + 'rem',
                '--buttonWidth': buttonWidth,
              }}
              ref={dropdownRef}
            >
              {options.map((option, index) => {
                return (
                  <div
                    id={option.id}
                    className={`${styles.select__option} 
                      ${option.id === activeOptionId ? styles['select__option--active'] : ''}`}
                    role='option'
                    key={option.value}
                    aria-selected={option.id === selectedOption?.id}
                    onClick={handleOptionClick}
                    onMouseDown={handleOptionMouseDown}
                    onMouseMove={handleOptionMouseMove}
                    ref={(el) => addToOptionsRef(el, index)}
                    tabIndex='-1'
                    style={{
                      height: OPTION_HEIGHT + 'rem',
                      paddingBlock: OPTION_PADDING_BLOCK + 'rem',
                    }}
                  >
                    {option.description}
                  </div>
                );
              })}

              {options.length > maxVisibleOptions && (
                <ShadowScroll height={remToPx(OPTION_HEIGHT)} />
              )}
            </div>,
            document.body,
          )}
      </div>
    </div>
  );
};

export { Select };
