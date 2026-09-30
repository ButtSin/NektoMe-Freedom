import { STATE_CLASSES } from '../../config/stateClasses';

function enableButtons(buttons) {
  buttons.forEach((button) => button.classList.remove(STATE_CLASSES.disabled));
}

function disableButtons(buttons) {
  buttons.forEach((button) => button.classList.add(STATE_CLASSES.disabled));
}

export { disableButtons, enableButtons };
