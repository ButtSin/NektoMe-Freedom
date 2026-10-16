import { generatePath } from 'react-router-dom';

import { AdviceCard, advicesData } from '@/entities/advice';
import { ROUTES } from '@/shared/config/routes';

import styles from './AdvicesListPage.module.scss';

const AdvicesListPage = () => {
  return (
    <section className={`${styles['advice-list-page']}`}>
      <header className={`${styles['advice-list-page__header']}`}>
        <h2 className={`${styles['advice-list-page__header-title']}`}>
          Советы по безопасному поведению на анонимных чатах
        </h2>
        <p className={`${styles['advice-list-page__header-description']}`}>
          Пожалуйста, уделите несколько минут на то, чтобы ознакомиться с наиболее актуальными
          ситуациями, в которые вы может попасть на сайтах, подобных nekto. Поверьте: некоторая
          информация отсюда действительно сможет вас удивить.
        </p>
      </header>

      <div className={`${styles['advice-list-page__body']}`}>
        <ul className={`${styles['advice-list-page__advices-list']}`}>
          {advicesData.map((adviceItem) => {
            return (
              <li className={`${styles['advice-list-page__advices-item']}`} key={adviceItem.id}>
                <AdviceCard
                  title={adviceItem.title}
                  Icon={adviceItem.icon}
                  path={generatePath(ROUTES.adviceDetail, { adviceId: adviceItem.id })}
                  lead={adviceItem.lead}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export { AdvicesListPage };
