import { extensionName, extensionVersion } from '../config/constants';

class ErrorHandler {
  _onPromiseGlobalError(event) {
    alert(
      `[${extensionName} v${extensionVersion}] Произошла ошибка обработки асинхронного кода. ` +
        'Расширение может начать работать некорректно.',
    );
    console.error(
      `[${extensionName} v${extensionVersion}] Unhandled Promise Rejection:`,
      event.reason,
    );

    event.preventDefault();
  }

  promiseGlobalErrorSetup() {
    window.addEventListener('unhandledrejection', this._onPromiseGlobalError);
  }
}

export default ErrorHandler;
