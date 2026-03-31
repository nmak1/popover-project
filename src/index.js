import Popover from './Popover';
import './styles.css';

const button = document.getElementById('popover-button');
let popover = null;

button.addEventListener('click', (e) => {
  e.stopPropagation();
  
  // Создаем экземпляр popover при клике
  if (!popover) {
    popover = new Popover();
  }
  
  popover.show(button, 'Заголовок popover', 'Текст popover');
});