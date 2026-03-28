import { createApp } from 'vue';
import '@/styles/main.scss';
import App from './App.vue';
import ErrorHandlers from '@/js/ErrorHandlers';

new ErrorHandlers().promiseGlobalErrorSetup();
createApp(App).mount('#app');
