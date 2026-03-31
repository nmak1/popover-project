import Popover from './Popover';
import './styles.css';

const button = document.getElementById('popover-button');
const popover = new Popover();

button.addEventListener('click', () => {
  popover.show(button, 'Заголовок popover', 'Текст popover');
});

// Закрытие при клике вне popover
document.addEventListener('click', (e) => {
  if (!e.target.closest('.popover') && e.target !== button) {
    popover.hide();
  }
});