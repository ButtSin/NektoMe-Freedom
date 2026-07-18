import { stateClasses } from "../../config/constants";

function enableButtons(buttons) {
  buttons.forEach((button) => button.classList.remove(stateClasses.disabled));
}

function disableButtons(buttons) {
  buttons.forEach((button) => button.classList.add(stateClasses.disabled));
}

export { enableButtons, disableButtons };
