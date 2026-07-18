function getAlertHtml(alertMessage = "Сюда надо было вставить сообщение...") {
  return `
      <div id='custom-alert' 
          class='swal2-container swal2-center swal2-fade swal2-shown'
          style='overflow-y: auto;'>
        <div class='swal2-popup swal2-modal swal2-show' 
            tabindex='-1' 
            role='dialog' 
            aria-modal='true' 
            style='display: flex;'>
          <div class='swal2-header'>
            <h2 class='swal2-title'>${alertMessage}</h2>
          </div>
          <div class='swal2-actions' style='display: flex;'>
            <button type='button' 
                    class='swal2-confirm swal2-styled confirm-alert-button' 
                    aria-label='OK'
                    style='background-color: #6ac065;'>
              OK
            </button>
          </div>
        </div>
      </div>
    `;
}

export { getAlertHtml };
