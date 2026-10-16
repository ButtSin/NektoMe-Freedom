import { getExtensionInfo } from '@/shared/lib/extension/info';
import IconLock from '@/shared/ui/atoms/icons/IconLock.jsx';

import './ExtensionLayout.scss';

const { EXTENSION_VERSION } = getExtensionInfo();

const ExtensionLayout = ({ children }) => {
  return (
    <>
      <header className='extension__header header'>
        <h1 className='header__title'>
          <span className='header__title-text'>NektoMe Freedom — говорите вне лимитов</span>
          &nbsp;
          <span className='header__title-icon' aria-hidden='true'>
            <IconLock />
          </span>
        </h1>
        <p className='header__version'>v.&nbsp;{EXTENSION_VERSION}</p>
      </header>
      <main>{children}</main>
      <footer className='extension__footer footer'>
        <p>
          С уважением и признательностью посвящается моей хорошей подруге Мали. Спасибо тебе за всё.
        </p>
      </footer>
    </>
  );
};

export { ExtensionLayout };
