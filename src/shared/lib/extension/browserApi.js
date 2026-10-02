const browserApi = globalThis.browser ?? globalThis.chrome;

const getManifest = () => browserApi.runtime.getManifest();

export { browserApi, getManifest };
