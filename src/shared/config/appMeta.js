import { getManifest } from '../lib/browser';

const manifest = getManifest();

const EXTENSION_NAME = manifest.name;
const EXTENSION_VERSION = manifest.version;

export { EXTENSION_NAME, EXTENSION_VERSION };
