class ErrorHandlers {
  _onPromiseGlobalError(event) {
    alert("Произошла ошибка обработки асинхронного кода. " + 
      "Расширение может начать работать некорректо.");
    console.error('Nekto Me Plus. Unhandled Promise Rejection: ', 
      event.reason);
    
    event.preventDefault();
  }

  promiseGlobalErrorSetup() {
    window.addEventListener('unhandledrejection', this._onPromiseGlobalError);
  }
}

export default ErrorHandlers;