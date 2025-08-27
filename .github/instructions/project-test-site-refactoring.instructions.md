---
applyTo: '**'
---
# Инструкция по рефакторингу проекта на модульную архитектуру с функциональным подходом

## Цель рефакторинга
Преобразовать существующий многостраничный проект, сохранив внешний вид и функционал, но сделав код более читаемым, поддерживаемым и масштабируемым с использованием модульной архитектуры и функционального подхода.

## Оценка текущего проекта: 4/10 (junior+ уровень)

### Что хорошо:
- Работающий функционал
- Понимание асинхронности (fetch, promises)
- Базовая работа с DOM и событиями

### Основные проблемы:
- Сильное дублирование кода (особенно API запросы и DOM манипуляции)
- Отсутствие абстракций и переиспользования
- Смешение логики в одних функциях (300+ строк в reminders.js)
- Прямая работа с DOM без слоя абстракции
- Хардкод значений (appID, selectors, HTML templates)
- Отсутствие обработки ошибок
- Монолитный CSS файл (800+ строк в main.css)

## Текущая структура проекта

```
index.html
public/
    detailedInfo.html
    getObjects.html
    getObjectsV2.html
    navBar.html
    reg.html
    reminders.html
src/
    assets/
        rabbit-variant-outline.svg
    scripts/
        detailedInfo.js
        getObjects.js
        getObjectsV2.js
        index.js
        navBar.js
        reg.js
        reminders.js
    styles/
        main.css
```

## Новая модульная структура проекта

```
index.html
public/
    detailedInfo.html
    getObjects.html
    getObjectsV2.html
    navBar.html
    reg.html
    reminders.html
src/
    assets/
        rabbit-variant-outline.svg
    modules/
        core/
            config.js           # Константы и конфигурация
            api.js              # Централизованная работа с API
            storage.js          # Работа с localStorage
            router.js           # Навигация и редиректы
        ui/
            dom.js              # DOM утилиты
            modal.js            # Управление модальными окнами
            form.js             # Работа с формами
            table.js            # Управление таблицами
            animation.js        # Анимации и UI эффекты
        auth/
            auth.js             # Авторизация
            session.js          # Управление сессиями
            permissions.js      # Проверка прав доступа
        objects/
            objects-api.js      # API для работы с объектами
            objects-ui.js       # UI компоненты объектов
            objects-crud.js     # CRUD операции
        reminders/
            reminders-api.js    # API для работы с напоминаниями
            reminders-ui.js     # UI компоненты напоминаний
            reminders-flow.js   # Бизнес-логика создания напоминаний
        navigation/
            navbar.js           # Навигационная панель
            mobile-menu.js      # Мобильное меню
        utils/
            validation.js       # Утилиты валидации
            helpers.js          # Общие вспомогательные функции
            constants.js        # Константы селекторов и классов
    pages/
        index.js               # Контроллер главной страницы
        registration.js        # Контроллер регистрации
        objects-list.js        # Контроллер списка объектов
        object-detail.js       # Контроллер детальной информации
        reminders-page.js      # Контроллер страницы напоминаний
    styles/
        base/
            reset.css          # Сброс стилей
            variables.css      # CSS переменные
            typography.css     # Типографика
        components/
            buttons.css        # Стили кнопок
            forms.css          # Стили форм
            cards.css          # Стили карточек
            tables.css         # Стили таблиц
            modals.css         # Стили модальных окон
            navbar.css         # Стили навигации
        layout/
            grid.css           # Сетка и layout
            spacing.css        # Отступы
            animations.css     # Анимации
        utilities/
            flexbox.css        # Flexbox утилиты
            positioning.css    # Позиционирование
            colors.css         # Цвета
            media-queries.css  # Медиа-запросы
        main.css              # Главный файл импортов
```

### Описание модулей

#### Core модули (базовая функциональность)
- **config.js** - Все константы приложения (URLs, appID, селекторы)
- **api.js** - Централизованный модуль для API запросов с обработкой ошибок
- **storage.js** - Работа с localStorage (sessionID, role)
- **router.js** - Навигация и проверки авторизации

#### UI модули (пользовательский интерфейс)
- **dom.js** - Переиспользуемые DOM операции (createElement, найти элементы)
- **modal.js** - Создание и управление модальными окнами
- **form.js** - Валидация форм, управление состоянием кнопок
- **table.js** - Работа с таблицами (создание строк, шаблонизация)
- **animation.js** - GSAP анимации и переходы

#### Функциональные модули (бизнес-логика)
- **auth/** - Полный цикл авторизации и управления сессиями
- **objects/** - CRUD операции с объектами (разделение API, UI, логики)
- **reminders/** - Управление напоминаниями (разбивка сложного flow)
- **navigation/** - Навигация и мобильное меню

#### Page контроллеры (композиция модулей)
- Каждая страница имеет свой контроллер, который импортирует нужные модули
- Контроллеры содержат только логику композиции, не реализацию

#### CSS модули (модульные стили)
- **base/** - Базовые стили (сброс, переменные, типографика)
- **components/** - Компоненты (кнопки, формы, карточки, таблицы)
- **layout/** - Разметка (сетка, отступы, анимации)
- **utilities/** - Утилиты (flexbox, позиционирование, цвета)

## Дублирующийся код (приоритет для рефакторинга)

### API запросы
```javascript
// Текущий дублирующийся код:
fetch(`https://api.directual.com/good/api/v5/data/...?appID=640a9d7b-5015-4ea0-8206-a4eddcef054b&sessionID=${sessionID}`)

// Станет:
import { apiRequest } from '../modules/core/api.js';
const data = await apiRequest('reminds/completedReminders');
```

### DOM манипуляции
```javascript
// Текущий дублирующийся код:
const clone = template.content.cloneNode(true);
clone.querySelector('#remName').textContent = obj.textRemind || '';

// Станет:
import { createTableRow } from '../modules/ui/table.js';
const row = createTableRow(template, obj, reminderFieldMap);
```

### Модальные окна
```javascript
// Текущий дублирующийся код:
popup = document.createElement('div');
popup.classList.add('popup-window', 'hide');

// Станет:
import { createModal } from '../modules/ui/modal.js';
const modal = createModal(content, { closable: true });
```

### CSS стили
```css
/* Текущий монолитный CSS (800+ строк) */
/* Станет модульным: */
@import 'base/reset.css';
@import 'base/variables.css';
@import 'components/buttons.css';
/* ... */
```

## Принципы нового подхода

### Функциональное программирование
- **Чистые функции** для всех утилит
- **Композиция функций** для сложной логики
- **Каррирование** для переиспользования
- **Иммутабельность** данных

### Модульная архитектура
- **Единственная ответственность** каждого модуля
- **Явные зависимости** через ES6 imports
- **Слабая связанность** между модулями
- **Высокая когезия** внутри модулей

### CSS Architecture (ITCSS подход)
- **Слои стилей** от общих к специфичным
- **Компонентный подход** - один файл на компонент
- **Переменные CSS** для константных значений
- **Утилитарные классы** для частых операций

## Примеры рефакторинга

### JavaScript модули

#### Было (reminders.js - 300+ строк):
```javascript
document.addEventListener('DOMContentLoaded', function () {
    // Огромная функция со всей логикой
    fetch(`https://api.directual.com/good/api/v5/data/reminds/completedReminders?appID=640a9d7b-5015-4ea0-8206-a4eddcef054b&sessionID=${sessionID}`)
    // ... 300 строк кода
});
```

#### Станет (reminders-page.js):
```javascript
import { checkAuth } from '../modules/auth/session.js';
import { loadReminders } from '../modules/reminders/reminders-api.js';
import { initRemindersTables } from '../modules/reminders/reminders-ui.js';
import { initReminderFlow } from '../modules/reminders/reminders-flow.js';

document.addEventListener('DOMContentLoaded', async () => {
    if (!checkAuth()) return;
    
    const [completed, active] = await Promise.all([
        loadReminders('completed'),
        loadReminders('active')
    ]);
    
    initRemindersTables(completed, active);
    initReminderFlow();
});
```

### CSS модули

#### Было (main.css - 800+ строк):
```css
/* Все стили в одном файле */
* { box-sizing: border-box; }
body { margin: 0; background-image: radial-gradient(...); }
.link-btn { display: flex; background-color: #104b85; ... }
.navbar { display: flex; position: fixed; ... }
/* ... еще 700+ строк */
```

#### Станет (модульно):

**main.css:**
```css
@import 'base/reset.css';
@import 'base/variables.css';
@import 'base/typography.css';
@import 'components/buttons.css';
@import 'components/navbar.css';
@import 'layout/grid.css';
@import 'utilities/flexbox.css';
@import 'utilities/media-queries.css';
```

**base/variables.css:**
```css
:root {
    --color-primary: #104b85;
    --color-secondary: #4d6328;
    --border-radius: 0.25rem;
    --shadow-default: 0px 0px 10px 0px #ffffff72 inset;
}
```

**components/buttons.css:**
```css
.link-btn {
    display: flex;
    background-color: var(--color-primary);
    color: white;
    padding: 0.5rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-default);
    transition: transform 0.3s;
}
```

## План рефакторинга

### Этап 1: Создание базовых модулей (2-3 дня)
1. **config.js** - Вынос всех констант
2. **api.js** - Централизация API запросов
3. **dom.js** - Базовые DOM утилиты
4. **storage.js** - Работа с localStorage

### Этап 2: CSS модули (2-3 дня)
1. **Разбивка main.css** на модули по категориям
2. **Создание CSS переменных** для константных значений
3. **Создание утилитарных классов** для частых операций
4. **Оптимизация медиа-запросов** в отдельном файле

### Этап 3: UI модули (3-4 дня)
1. **modal.js** - Модальные окна
2. **form.js** - Работа с формами
3. **table.js** - Управление таблицами
4. **animation.js** - Анимации

### Этап 4: Функциональные модули (4-5 дней)
1. **auth/** - Авторизация и сессии
2. **objects/** - Управление объектами
3. **reminders/** - Система напоминаний
4. **navigation/** - Навигация

### Этап 5: Page контроллеры (2-3 дня)
1. Создание контроллеров для каждой страницы
2. Подключение модулей через импорты
3. Тестирование функциональности

### Этап 6: Оптимизация (1-2 дня)
1. Финальная проверка функциональности
2. Удаление старых файлов
3. Документация модулей

## Технические требования
- **ES6+ модули** с import/export
- **Async/await** вместо then/catch цепочек
- **Деструктуризация** для удобной работы с данными
- **Template literals** для HTML шаблонов
- **Функции высшего порядка** для переиспользования логики
- **Чистые функции** без побочных эффектов
- **CSS переменные** для константных значений
- **ITCSS методология** для организации стилей

## Ожидаемый результат

### JavaScript
- **Читаемый код** с четкой структурой (файлы по 20-50 строк)
- **Переиспользуемые модули** без дублирования
- **Легкое тестирование** благодаря чистым функциям
- **Простое масштабирование** через композицию модулей
- **Удобное сопровождение** с явными зависимостями

### CSS
- **Модульная структура** стилей по компонентам
- **Переиспользуемые утилиты** и переменные
- **Легкое сопровождение** - один файл на компонент
- **Быстрое изменение темы** через CSS переменные
- **Оптимизированные медиа-запросы** в отдельном файле

Проект станет профессиональной базой для дальнейшего развития в SPA или интеграции с фреймворками!

## Критерии завершения рефакторинга
1. ✅ Весь функционал работает идентично оригиналу
2. ✅ CSS разбит на логические модули (< 100 строк на файл)
3. ✅ JavaScript разбит на функциональные модули (< 50 строк на файл)
4. ✅ Нет дублирования кода
5. ✅ Все константы вынесены в конфигурацию
6. ✅ API запросы централизованы
7. ✅ DOM манипуляции абстрагированы
8. ✅ Модальные окна стандартизированы
9. ✅ Формы используют общие утилиты валидации
10. ✅ Анимации вынесены в отдельные модули