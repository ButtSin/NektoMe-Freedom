import { Link } from 'react-router-dom';

import styles from './adviceCard.module.scss';

const AdviceCard = ({ title, Icon, path, lead }) => {
  return (
    <article className={`${styles['advice-card']} surface`}>
      <Link className={`${styles['advice-card__link']}`} to={path}>
        <div className={`${styles['advice-card__link-image']}`} aria-hidden='true'>
          <Icon height={'100%'} width={'100%'} />
        </div>
        <h3 className={`${styles['advice-card__link-title']}`}>{title}</h3>
        <strong className={`${styles['advice-card__link-lead']}`}>{lead}</strong>
      </Link>
    </article>
  );
};

export { AdviceCard };
