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
    mainDescription: "Включить советы по безопасности",
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

export { switches };
