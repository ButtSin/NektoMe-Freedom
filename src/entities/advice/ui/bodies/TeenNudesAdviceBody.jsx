import styles from './TeenNudesAdviceBody.module.scss';

const TeenNudesAdviceBody = () => {
  return (
    <section className={`${styles.advice}`}>
      <header className={`${styles.advice__header}`}>
        <h2 className={`${styles.advice__title}`}>
          Законность обмена интимным контентом с подростками — иллюзия
        </h2>
      </header>

      <div className={`${styles.advice__body}`}>
        <div className={`${styles.advice__problem}`}>
          <p>
            <strong>
              Не путайте возраст согласия с возрастом, когда можно законно обмениваться интимными
              материалами, — они, как правило, не совпадают.
            </strong>
          </p>
          <p>
            В ряде стран СНГ, если вы разговариваете с человеком, не достигшим 18-летнего возраста,
            то
          </p>
          <ul>
            <li>
              <b>...получая порнографические материалы, на которых он изображён</b>, вас могут
              привлечь по статье о детской порнографии;
            </li>
            <li>
              <b>...отправляя любые порнографические материалы ему</b>, ваши действия расценят как
              развратные.
            </li>
          </ul>
          <p>
            <strong>
              Оба случая ведут к уголовной ответственности с большими сроками лишения свободы.
            </strong>
          </p>
        </div>

        <hr className={`${styles.advice__divider}`} />

        <section className={`${styles.advice__description}`}>
          <h3>Как себя обезопасить</h3>
          <p>
            Ваша обязанность — убедиться в совершеннолетии собеседника. Его заверения, голосовые
            сообщения или фото не являются надёжной защитой в суде. При малейших сомнениях
            прекращайте общение.
          </p>
        </section>
      </div>
    </section>
  );
};

export { TeenNudesAdviceBody };
