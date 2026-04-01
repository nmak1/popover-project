# Popover Widget

[![Build and Deploy](https://github.com/nmak1/popover-project/actions/workflows/build.yml/badge.svg)](https://github.com/nmak1/popover-project/actions/workflows/build.yml)

Виджет popover для отображения всплывающих подсказок при клике на элемент. Реализован на чистом JavaScript без использования сторонних библиотек.

## Демо

Живая демонстрация доступна по ссылке:  
[GitHub Pages](https://nmak1.github.io/popover-project/)

## Возможности

- Появление popover при клике на кнопку
- Автоматическое позиционирование над элементом
- Стрелка, указывающая на элемент-источник
- Закрытие popover при клике вне его области
- Полностью настраиваемый контент (заголовок и текст)

## Технологии

- **JavaScript (ES6+)** - логика компонента
- **CSS3** - стилизация и анимация
- **Webpack** - сборка проекта
- **Puppeteer** - автоматическое тестирование
- **GitHub Actions** - CI/CD и деплой на GitHub Pages
- **Jest** - unit-тестирование

## Установка и запуск

### Требования
- Node.js версии 16 или выше
- npm или yarn

### Установка зависимостей

```bash
npm install
```
Режим разработки

```bash
npm start
После запуска проект будет доступен по адресу: http://localhost:8080
```
Сборка для production
```bash
npm run build
Собранные файлы будут находиться в директории dist/
```
Запуск тестов
```bash
npm test
Использование
Базовое использование
javascript
import Popover from './Popover';

const button = document.getElementById('my-button');
const popover = new Popover();

button.addEventListener('click', () => {
  popover.show(button, 'Заголовок', 'Текст подсказки');
});
```
Структура HTML 
```html
<button id="my-button" class="btn">Нажми меня</button>
```
Кастомизация  
Вы можете изменить внешний вид popover, переопределив CSS-классы:

.popover - основной контейнер

.popover-header - заголовок

.popover-body - тело popover

.popover-arrow - стрелка

Тестирование   

Проект покрыт автоматическими тестами с использованием Puppeteer.  

 Тесты проверяют:

Появление popover при клике на кнопку

Корректное отображение заголовка и текста

Закрытие popover при клике вне его области

Структура проекта
```text
popover-project/
├── src/
│   ├── index.html          # Основной HTML файл
│   ├── index.js            # Точка входа
│   ├── Popover.js          # Класс Popover
│   └── styles.css          # Стили компонента
├── test/
│   └── popover.test.js     # Авто-тесты
├── .github/
│   └── workflows/
│       └── build.yml       # GitHub Actions workflow
├── webpack.config.js       # Конфигурация Webpack
├── package.json            # Зависимости проекта
├── .gitignore              # Игнорируемые файлы
└── README.md               #   
```
 Документация   
CI/CD   
Проект настроен на автоматическую сборку и деплой при пуше в ветку main:

1. Установка зависимостей

2. Сборка проекта

3. Запуск тестов

4. Деплой на GitHub Pages (только для main ветки)    
  
Лицензия
MIT
