const isInFirefox = typeof browser !== 'undefined' && typeof chrome !== 'undefined';

const browserApi = isInFirefox ? browser : chrome;

export { browserApi };
