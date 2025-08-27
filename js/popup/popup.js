import ErrorHandlers from '../ErrorHandlers.js';
import Settings from './Settings.js';
import TabsCollection from './Tabs.js';

new ErrorHandlers().promiseGlobalErrorSetup();
await Settings.create();
await TabsCollection.create();