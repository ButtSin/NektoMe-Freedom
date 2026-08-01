class PromiseRejectionHandler {
  constructor(appName, appVersion) {
    this.appName = appName;
    this.appVersion = appVersion;
  }

  _onPromiseGlobalError = (event) => {
    alert(
      `[${this.appName} v${this.appVersion}] Произошла ошибка обработки асинхронного кода. ` +
        'Приложение может начать работать некорректно.',
    );
    console.error(
      `[${this.appName} v${this.appVersion}] Unhandled Promise Rejection:`,
      event.reason,
    );

    event.preventDefault();
  };

  promiseGlobalErrorSetup() {
    window.addEventListener('unhandledrejection', this._onPromiseGlobalError);
  }
}

export { PromiseRejectionHandler };
