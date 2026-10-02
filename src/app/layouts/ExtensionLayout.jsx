import { getExtensionInfo } from '@/shared/lib/extension/info';
import IconLock from '@/shared/ui/atoms/icons/IconLock.jsx';

import styles from './ExtensionLayout.module.scss';

const { EXTENSION_VERSION } = getExtensionInfo();

const ExtensionLayout = ({ children }) => {
  return (
    <>
      <header className={`${styles.extension__header} ${styles.header}`}>
        <h1 className={`${styles.header__title}`}>
          <span className={`${styles['header__title-text']}`}>
            NektoMe Freedom — говорите вне лимитов
          </span>
          &nbsp;
          <span className={`${styles['header__title-icon']}`} aria-hidden='true'>
            <IconLock />
          </span>
        </h1>
        <p className={`${styles.header__version}`}>v.&nbsp;{EXTENSION_VERSION}</p>
      </header>
      <main>{children}</main>
      <footer className={`${styles.extension__footer} ${styles.footer}`}>
        <p>
          С уважением и признательностью посвящается моей хорошей подруге Мали. Спасибо тебе за всё.
        </p>
      </footer>
    </>
  );
};

export { ExtensionLayout };
