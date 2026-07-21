import { extensionVersion } from '@/shared/config/constants';
import IconLock from '@/shared/ui/atoms/icons/IconLock.jsx';

import styles from './PopupLayout.module.scss';

const PopupLayout = ({ children }) => {
  return (
    <>
      <header className={`${styles.popup__header} ${styles.header}`}>
        <h1 className={`${styles.header__title}`}>
          <span className={`${styles['header__title-text']}`}>
            NektoMe Freedom — говорите вне лимитов
          </span>
          &nbsp;
          <span className={`${styles['header__title-icon']}`} aria-hidden='true'>
            <IconLock />
          </span>
        </h1>
        <p className={`${styles.header__version}`}>v.&nbsp;{extensionVersion}</p>
      </header>
      <main>{children}</main>
      <footer className={`${styles.popup__footer} ${styles.footer}`}>
        <p>
          С уважением и признательностью посвящается моей хорошей подруге Мали. Спасибо тебе за всё.
        </p>
      </footer>
    </>
  );
};

export { PopupLayout };
