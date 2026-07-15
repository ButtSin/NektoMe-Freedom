import { useEffect, useState } from "react";

import ThemeSwitcher from "@/html/popup/components/ThemeSwitcher/ThemeSwitcher";
import BaseSwitch from "@/html/shared/components/BaseSwitch/BaseSwitch";
import styles from "./TheSettings.module.scss";

// eslint-disable-next-line no-undef
const adviceUrl = chrome.runtime.getURL("src/html/advices/index.html");

const switches = [
  {
    mainDescription: "Отключить ограничения выбора собеседников",
    secondaryDescription: "Выбирайте любого собеседника во флирте и ролке",
    isActive: true,
  },
  {
    mainDescription: "Отключить ограничения копирования текста",
    secondaryDescription:
      "Копируйте текст в начале разговора, не дожидаясь истечения таймера",
    isActive: true,
  },
  {
    mainDescription: "Включить советы",
    secondaryDescription: `Читайте cоветы на экране поиска диалога о том, как не попасть в 
                          неприятную ситуацию и что делать, если вы уже в ней оказались`,
    isActive: true,
    requiredContent: (
      <p>
        Также с ними можно ознакомиться на этой{" "}
        <a href={`${adviceUrl}`} target="_blank">
          странице
        </a>
      </p>
    ),
  },
];

const TheSettings = (props) => {
  return (
    <div className={`${styles.settings}`}>
      {switches.map((switchItem) => {
        return (
          <BaseSwitch
            key={switchItem.mainDescription}
            mainDescription={switchItem.mainDescription}
            secondaryDescription={switchItem.secondaryDescription}
            isActive={switchItem.isActive}
            requiredContent={switchItem.requiredContent}
          />
        );
      })}{" "}
      <ThemeSwitcher />
    </div>
  );
};

export default TheSettings;
