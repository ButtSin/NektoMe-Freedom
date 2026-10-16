import { AdvicesDetailPage, AdvicesListPage } from '@/pages/advices';
import { ROUTES } from '@/shared/config/routes';

const routes = [
  {
    path: ROUTES.advicesMainPage,
    element: <AdvicesListPage />,
  },
  {
    path: ROUTES.adviceDetail,
    element: <AdvicesDetailPage />,
  },
];

export { routes };
