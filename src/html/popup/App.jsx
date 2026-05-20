import { useState, useEffect } from "react";
import { extensionVersion } from "@/js/constants";
import IconLock from "@/icons/IconLock.jsx";
import MainTabs from "@/html/popup/components/MainTabs.jsx";
import styles from "@/html/popup/App.module.scss";

function App() {
  return (
    <>
      <header className={`${styles.popup__header} ${styles.header}`}>
        <h1 className={`${styles.header__title}`}>
          <span className={`${styles["header__title-text"]}`}>
            NektoMe Freedom — говорите вне лимитов
          </span>
          &nbsp;
          <span
            className={`${styles["header__title-icon"]}`}
            aria-hidden="true"
          >
            <IconLock />
          </span>
        </h1>
        <p className={`${styles.header__version}`}>
          v.&nbsp;{extensionVersion}
        </p>
      </header>
      <main className={`${styles.popup__main} ${styles.main}`}>
        <MainTabs />
      </main>
      <footer className={`${styles.popup__footer} ${styles.footer}`}>
        <p>
          С уважением и признательностью посвящается моей хорошей подруге Мали.
          Спасибо тебе за всё.
        </p>
      </footer>
    </>
  );
}

export default App;
