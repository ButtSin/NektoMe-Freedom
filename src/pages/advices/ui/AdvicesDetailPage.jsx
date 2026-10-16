// import styles from './AdvicesDetailPage.module.scss'

import { Navigate, useParams } from 'react-router-dom';

import { advicesData } from '@/entities/advice';
import { ROUTES } from '@/shared/config/routes';

const AdvicesDetailPage = () => {
  const currentParams = useParams();
  const currentAdvice = advicesData.find((adviceItem) => adviceItem.id === currentParams.adviceId);

  if (!currentAdvice) {
    return <Navigate to={ROUTES.advicesMainPage} replace />;
  }

  return currentAdvice.children;
};

export { AdvicesDetailPage };
