export default class Popover {
  constructor() {
    this.popoverElement = null;
  }

  show(element, title, content) {
    this.hide();

    this.popoverElement = document.createElement('div');
    this.popoverElement.className = 'popover';
    
    const arrow = document.createElement('div');
    arrow.className = 'popover-arrow';
    
    const header = document.createElement('div');
    header.className = 'popover-header';
    header.textContent = title;
    
    const body = document.createElement('div');
    body.className = 'popover-body';
    body.textContent = content;
    
    this.popoverElement.appendChild(arrow);
    this.popoverElement.appendChild(header);
    this.popoverElement.appendChild(body);
    
    document.body.appendChild(this.popoverElement);
    
    // Позиционирование
    const rect = element.getBoundingClientRect();
    const popoverRect = this.popoverElement.getBoundingClientRect();
    
    this.popoverElement.style.left = `${rect.left + rect.width / 2 - popoverRect.width / 2}px`;
    this.popoverElement.style.top = `${rect.top - popoverRect.height - 10}px`;
    
    // Позиционирование стрелки
    const arrowRect = arrow.getBoundingClientRect();
    arrow.style.left = `${popoverRect.width / 2 - arrowRect.width / 2}px`;
  }

  hide() {
    if (this.popoverElement) {
      this.popoverElement.remove();
      this.popoverElement = null;
    }
  }
}