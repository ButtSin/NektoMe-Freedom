import { getManifest } from './browserApi';

let extensionInfo = null;

const getExtensionInfo = () => {
  if (!extensionInfo) {
    const manifest = getManifest();

    const EXTENSION_NAME = manifest.name;
    const EXTENSION_VERSION = manifest.version;

    extensionInfo = { EXTENSION_NAME, EXTENSION_VERSION };
  }

  return extensionInfo;
};

export { getExtensionInfo };
