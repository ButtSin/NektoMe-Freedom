import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { TRANSITION_DURATION } from '@/shared/config/constants';
import { useAnimation } from '@/shared/hooks/useAnimation';
import { pxToRem, remToPx } from '@/shared/lib/dom/rootRem';

import { ShadowScroll } from '../ShadowScroll/ShadowScroll';

import styles from './Select.module.scss';

const OPTION_PD_BLOCK = pxToRem(6);
const OPTION_HEIGHT = pxToRem(24) + OPTION_PD_BLOCK * 2;

const DROPDOWN_TOP_OFFSET = 8;
const DROPDOWN_PD_BLOCK = pxToRem(6);
const DROPDOWN_PD_BLOCK_PX = remToPx(DROPDOWN_PD_BLOCK);

const CLIP_GUARD = 1;

const Select = ({
  className = '',
  description,
  placeholder = 'Выберите...',
  options,
  onChange,
  buttonWidth = '100%',
  maxVisibleOptions = 5,
  ariaDescribedby,
}) => {
  const visibleCount = Math.min(options.length, maxVisibleOptions);

  const [OUTLINE_SIZE] = useState(() => {
    const rootStyles = getComputedStyle(document.documentElement);

    return parseFloat(rootStyles.getPropertyValue('--outline-size'));
  });

  const rowGap = OUTLINE_SIZE * 2;

  const dropdownHeight =
    visibleCount * OPTION_HEIGHT + (visibleCount - 1) * rowGap + 2 * DROPDOWN_PD_BLOCK;

  const selectId = useId();
  const customSelectId = useId();
  const selectLabelId = useId();

  const buttonRef = useRef();
  const dropdownRef = useRef();
  const optionsRef = useRef([]);

  const [isOpen, setIsOpen] = useState(false);
  const { isVisible, isMounted } = useAnimation(isOpen, TRANSITION_DURATION);
  const [selectedOption, setSelectedOption] = useState(
    options.find((option) => option.isSelected) ?? options[0] ?? null,
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
    if (event.key === 'Escape' && isOpen) {
      event.preventDefault();

      setIsOpen(false);
      return;
    }

    if (
      event.key !== 'ArrowLeft' &&
      event.key !== 'ArrowRight' &&
      event.key !== 'ArrowUp' &&
      event.key !== 'ArrowDown' &&
      event.key !== 'Enter' &&
      event.key !== 'Space' &&
      event.key !== 'Home' &&
      event.key !== 'End' &&
      event.key !== 'Tab'
    )
      return;

    if (
      event.key !== 'Tab' ||
      (event.key === 'ArrowLeft' && isOpen) ||
      (event.key === 'ArrowRight' && isOpen)
    ) {
      event.preventDefault();
    }

    if (event.key === 'Enter' || event.key === 'Space') {
      if (event.key === 'Enter' && isOpen) {
        const newSelectedOption = options.find((o) => o.id === activeOptionId);
        setSelectedOption(newSelectedOption);
        setIsOpen(false);
        onChange?.(event, newSelectedOption);

        return;
      }

      setIsOpen(true);

      return;
    }

    if (event.key === 'Tab' && isOpen) {
      event.preventDefault();

      const newSelectedOption = options.find((o) => o.id === activeOptionId);
      onChange?.(event, newSelectedOption);
      setSelectedOption(newSelectedOption);
      setIsOpen(false);
      buttonRef.current.focus();

      return;
    }

    const selectedOptionIndex = options.findIndex((option) => option.id === selectedOption?.id);

    let indexOffset = 0;
    if ((event.key === 'ArrowRight' && !isOpen) || event.key === 'ArrowDown') {
      indexOffset = 1;
    } else if ((event.key === 'ArrowLeft' && !isOpen) || event.key === 'ArrowUp') {
      indexOffset = -1;
    }

    let newSelectedOptionIndex = selectedOptionIndex + indexOffset;

    if (event.key === 'Home') {
      newSelectedOptionIndex = 0;
    } else if (event.key === 'End') {
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

    onChange?.(event, newSelectedOption);

    setIsKeyboardChange(true);
    setActiveOptionId(newSelectedOption.id);
    setSelectedOption(newSelectedOption);
  };

  const handleOptionClick = (event) => {
    const newSelectedOption = options.find((option) => option.id === event.currentTarget.id);

    buttonRef.current.focus();

    onChange?.(event, newSelectedOption);

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

    const buttonMetrics = buttonRef.current.getBoundingClientRect();
    const dropdownHeightPx = remToPx(dropdownHeight);

    const getDirectionDropdown = () => {
      const windowHeight = window.innerHeight;
      const spaceBottom = windowHeight - buttonMetrics.bottom;
      const spaceTop = buttonMetrics.top;

      if (spaceBottom >= dropdownHeightPx) return 'bottom';
      if (spaceTop >= dropdownHeightPx) return 'top';
      return spaceTop > spaceBottom ? 'top' : 'bottom';
    };

    const setDropdownPosition = () => {
      const currentDirection = getDirectionDropdown();
      const buttonAbsoluteCoords = {
        top: buttonMetrics.top + window.pageYOffset,
        left: buttonMetrics.left + window.pageXOffset,
        right: buttonMetrics.right + window.pageXOffset,
        bottom: buttonMetrics.bottom + window.pageYOffset,
      };

      const width = (buttonMetrics.width / 100) * 80 + 'px';
      const left = buttonAbsoluteCoords.left + 'px';
      let top;

      const rowGapPx = remToPx(rowGap);
      const realDropdownHeight = dropdownHeightPx - rowGapPx + DROPDOWN_PD_BLOCK_PX * 2;

      top =
        currentDirection === 'bottom'
          ? buttonAbsoluteCoords.bottom + DROPDOWN_TOP_OFFSET + 'px'
          : buttonAbsoluteCoords.top - DROPDOWN_TOP_OFFSET - realDropdownHeight + 'px';
      // eslint-disable-next-line @eslint-react/set-state-in-effect
      setDropdownCoords({ '--dropdownWidth': width, top, left });
    };

    setDropdownPosition();
  }, [isMounted, isOpen, dropdownHeight, rowGap]);

  useEffect(() => {
    if (!isOpen || !buttonRef.current) return;

    buttonRef.current.focus();

    const handleScroll = (event) => {
      if (event.target === dropdownRef.current) return;

      setIsOpen(false);
    };

    const handleMouseDown = (event) => {
      if (buttonRef.current?.contains(event.target)) return;
      if (dropdownRef.current?.contains(event.target)) return;

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
      {description && (
        <span id={selectLabelId} className={styles.select__description}>
          {description}
        </span>
      )}

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

      <div className={`${styles.select__body} ${className}`}>
        <div
          className={`${styles.select__button} ${isOpen ? styles['select__button--active'] : ''}
            surface surface--secondary`}
          tabIndex='0'
          role='combobox'
          aria-describedby={ariaDescribedby}
          aria-activedescendant={isVisible ? activeOptionId : undefined}
          aria-expanded={isOpen}
          aria-haspopup='listbox'
          aria-controls={customSelectId}
          aria-labelledby={selectLabelId}
          onClick={handleButtonClick}
          onKeyDown={handleButtonKeyDown}
          ref={buttonRef}
        >
          {selectedOption ? (
            <span className={`${styles['select__button-text']}`}>
              {selectedOption?.description}
            </span>
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
                height:
                  options.length === maxVisibleOptions
                    ? 'auto'
                    : `calc(${dropdownHeight}rem - 
                      ${DROPDOWN_PD_BLOCK - rowGap}rem - ${CLIP_GUARD}px)`,
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
                      paddingBlock: OPTION_PD_BLOCK + 'rem',
                    }}
                  >
                    <span className={`${styles['select__option-text']}`}>{option.description}</span>
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
