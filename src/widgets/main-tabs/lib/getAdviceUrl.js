import { browserApi } from '@/shared/lib/extension/browserApi';

const getAdviceUrl = () => browserApi.runtime.getURL('src/app/advices/index.html');

export { getAdviceUrl };
