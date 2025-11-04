# 🏥 Санаторий "Днестр" - Система управления санаторием

Полнофункциональная система управления санаторием с backend API, PostgreSQL базой данных и современным React frontend.

## 🏗 Архитектура проекта

### Backend (Node.js + TypeScript + PostgreSQL)
- **Express.js** REST API с TypeORM
- **PostgreSQL** база данных
- **JWT** аутентификация
- **Swagger** документация API
- **Docker** контейнеризация

### Frontend (React + TypeScript + Vite)
- **React 18** с TypeScript
- **TailwindCSS** + ShadCN/UI
- **Dual Storage**: LocalStorage + PostgreSQL API
- **React Router v6**

## 🚀 Основные возможности

### 🏨 Управление размещением
- **Календарный и сеточный режимы** просмотра номеров
- **Интерактивная схема номеров** с цветовой индикацией:
  - 🟢 Свободно (available)
  - 🔴 Занято (occupied)
  - 🟡 Забронировано (booked)
  - 🟣 Резерв (reserved)
  - ⚫ Заблокировано (maintenance/out_of_order)
- **Два корпуса** (A и B) с 5 этажами
- **Категории номеров:**
  - 1 Местный стд.
  - 1 Местный ул. 1 кат. (душ)
  - 2х Местный
  - 2х Местный ул. 1 кат. (душ)
  - Семейный
  - Семейный ул. 1 кат. (душ)
  - Люкс 2 Местный
  - Люкс

### 📅 Система бронирования
- **CRUD операции** через REST API
- **Статусы бронирований:**
  - pending - Ожидает подтверждения
  - confirmed - Подтверждена
  - checked_in - Заселен
  - checked_out - Выселен
  - cancelled - Отменена
  - no_show - Не явился
- **Управление бронированиями:**
  - Создание и редактирование
  - Подтверждение и заселение
  - Досрочный выезд
  - Продление срока
  - Перевод между номерами
  - Обмен гостями
  - Отмена брони
- **Работа с путевками** и организациями
- **Финансовый учет:** totalAmount, paidAmount, remainingAmount

### 👥 Управление гостями
- **База данных гостей** в PostgreSQL
- **Полная информация:**
  - ФИО (firstName, lastName, middleName)
  - Паспортные данные (passportNumber - unique)
  - Контакты (phone, email)
  - Дата рождения и возраст (автоматический расчет)
  - Адрес
  - Экстренные контакты (emergencyContact, emergencyPhone)
  - Заметки
- **История бронирований** каждого гостя
- **Поиск** по всем полям
- **Валидация данных** через class-validator

### 🏢 Управление организациями
- Регистрация организаций
- Выдача путевок
- Контрактная информация
- Отслеживание выданных путевок

### 📊 Отчетность и аналитика
- **Отчет по занятости:**
  - Статистика по корпусам, этажам, категориям
  - Текущая заполненность
  - Экспорт в PDF, DOCX
- **Отчет по состоянию на дату:**
  - Свободные/занятые/забронированные номера
  - Прогноз на 7 дней
  - Движение гостей (заезды/выезды)
  - Свободные места по типам
- **Отчет по гостям:**
  - Список гостей за период
  - История бронирований
  - Финансовая информация
- **Фильтры:** по корпусу, этажу, категории, периоду

### 🌙 Ночной аудит
- **Автоматическая обработка:**
  - Автоматическое выселение (checked_out)
  - Завершение просроченных броней
  - Подтверждение броней к заселению
  - Обновление статусов номеров
- **Журнал аудита** (AuditLog entity)
- **История аудитов** с возможностью возврата

### 🔐 Система безопасности
- **JWT аутентификация** с bcrypt хешированием
- **Роли пользователей:**
  - Administrator - полный доступ
  - Manager - управление бронированиями и отчеты
  - Reception - заселение/выселение, базовые операции
- **Audit Log** - полное логирование всех операций:
  - CREATE, UPDATE, DELETE
  - LOGIN, LOGOUT
  - CHECK_IN, CHECK_OUT
  - CANCEL_BOOKING, EXTEND_BOOKING
- **Rate limiting** - защита от DDoS
- **Helmet.js** - безопасность HTTP заголовков
- **CORS** настройка

### ⚙️ Настройки системы
- **Управление номерами** через API
- **Управление пользователями** и ролями
- **Резервное копирование:**
  - Экспорт данных в JSON
  - Импорт из резервной копии
  - PostgreSQL бэкапы
- **Журнал аудита** всех операций

## 🛠 Технологический стек

### Backend
- **Node.js** + **TypeScript**
- **Express.js** 5.1.0 - веб-фреймворк
- **TypeORM** 0.3.25 - ORM для PostgreSQL
- **PostgreSQL** 15 - основная база данных
- **JWT** (jsonwebtoken) - аутентификация
- **bcryptjs** - хеширование паролей
- **class-validator** + **class-transformer** - валидация
- **Swagger** (swagger-jsdoc, swagger-ui-express) - API документация
- **Helmet** - безопасность
- **express-rate-limit** - защита от DDoS
- **CORS** - кросс-доменные запросы

### Frontend
- **React 18** + **TypeScript**
- **Vite** - быстрая сборка
- **TailwindCSS** - стилизация
- **ShadCN/UI** - компоненты
- **React Router v6** - маршрутизация
- **Lucide React** - иконки
- **date-fns** - работа с датами
- **React Hook Form** + **Zod** - формы и валидация

### DevOps
- **Docker** + **Docker Compose**
- **PostgreSQL** контейнер
- **Nginx** (production)
- **Health checks** и автоматический перезапуск

## 📋 Требования

- **Node.js** 18+
- **PostgreSQL** 15+
- **Docker** и **Docker Compose** (опционально)
- **npm** или **yarn**

## 🚀 Быстрый старт

### Вариант 1: Docker Compose (Рекомендуется)

1. **Клонируйте репозиторий**
   ```bash
   git clone <repository-url>
   cd sanatorium-management
   ```

2. **Настройте переменные окружения**
   ```bash
   cp backend/.env.example backend/.env
   # Отредактируйте backend/.env при необходимости
   ```

3. **Запустите все сервисы**
   ```bash
   docker-compose up -d
   ```

4. **Доступ к приложению:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - API Documentation: http://localhost:3001/api-docs
   - PostgreSQL: localhost:5432

### Вариант 2: Локальная разработка

#### Backend

1. **Установите PostgreSQL** и создайте базу данных:
   ```sql
   CREATE DATABASE sanatorium_db;
   CREATE USER sanatorium WITH PASSWORD 'password';
   GRANT ALL PRIVILEGES ON DATABASE sanatorium_db TO sanatorium;
   ```

2. **Настройте backend**
   ```bash
   cd backend
   cp .env.example .env
   # Отредактируйте .env с вашими настройками БД
   npm install
   npm run dev
   ```

3. **Backend запустится на** http://localhost:3001
   - API Docs: http://localhost:3001/api-docs
   - Health check: http://localhost:3001/health

#### Frontend

1. **Установите зависимости**
   ```bash
   npm install
   ```

2. **Запустите dev-сервер**
   ```bash
   npm run dev
   ```

3. **Откройте приложение** http://localhost:5173

### Сборка для продакшена

```bash
# Frontend
npm run build

# Backend
cd backend
npm run build

# Docker (все сервисы)
docker-compose -f docker-compose.yml --profile production up -d
```

## 📁 Структура проекта

```
sanatorium-management/
├── backend/                    # Backend API
│   ├── src/
│   │   ├── config/            # Конфигурация (database.ts)
│   │   ├── entities/          # TypeORM сущности
│   │   │   ├── User.ts        # Пользователи
│   │   │   ├── Room.ts        # Номера
│   │   │   ├── Guest.ts       # Гости
│   │   │   ├── Booking.ts     # Бронирования
│   │   │   └── AuditLog.ts    # Журнал аудита
│   │   ├── middleware/        # Express middleware
│   │   │   ├── auth.ts        # JWT аутентификация
│   │   │   ├── audit.ts       # Логирование операций
│   │   │   ├── errorHandler.ts
│   │   │   └── logger.ts
│   │   ├── routes/            # API маршруты
│   │   ├── seeds/             # Начальные данные
│   │   └── server.ts          # Точка входа
│   ├── init.sql               # SQL инициализация
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── src/                       # Frontend
│   ├── components/
│   │   ├── auth/             # Авторизация
│   │   ├── booking/          # Бронирование
│   │   ├── guest/            # Гости
│   │   ├── organization/     # Организации
│   │   ├── room/             # Номера
│   │   └── ui/               # ShadCN компоненты
│   ├── contexts/
│   │   └── AuthContext.tsx   # Контекст авторизации
│   ├── types/
│   │   ├── booking.ts        # TypeScript типы
│   │   └── supabase.ts
│   ├── App.tsx
│   └── main.tsx
├── docker-compose.yml         # Docker конфигурация
├── Dockerfile.frontend        # Frontend Dockerfile
├── nginx.conf                 # Nginx конфигурация
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - Вход в систему
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/logout` - Выход
- `GET /api/auth/me` - Текущий пользователь

### Users
- `GET /api/users` - Список пользователей
- `POST /api/users` - Создать пользователя
- `PUT /api/users/:id` - Обновить пользователя
- `DELETE /api/users/:id` - Удалить пользователя

### Rooms
- `GET /api/rooms` - Список номеров
- `GET /api/rooms/:id` - Детали номера
- `POST /api/rooms` - Создать номер
- `PUT /api/rooms/:id` - Обновить номер
- `DELETE /api/rooms/:id` - Удалить номер

### Guests
- `GET /api/guests` - Список гостей
- `GET /api/guests/:id` - Детали гостя
- `POST /api/guests` - Создать гостя
- `PUT /api/guests/:id` - Обновить гостя
- `DELETE /api/guests/:id` - Удалить гостя

### Bookings
- `GET /api/bookings` - Список бронир��ваний
- `GET /api/bookings/:id` - Детали бронирования
- `POST /api/bookings` - Создать бронирование
- `PUT /api/bookings/:id` - Обновить бронирование
- `DELETE /api/bookings/:id` - Удалить бронирование
- `POST /api/bookings/:id/check-in` - Заселить
- `POST /api/bookings/:id/check-out` - Выселить
- `POST /api/bookings/:id/cancel` - Отменить

### Reports
- `GET /api/reports/occupancy` - Отчет по занятости
- `GET /api/reports/status` - Отчет по состоянию
- `GET /api/reports/guests` - Отчет по гостям

### Audit
- `GET /api/audit` - Журнал аудита
- `GET /api/audit/:id` - Детали записи

**Полная документация:** http://localhost:3001/api-docs

## 💾 База данных

### PostgreSQL Schema

**Tables:**
- `users` - Пользователи системы
- `rooms` - Номера санатория
- `guests` - Гости
- `bookings` - Бронирования
- `audit_logs` - Журнал аудита

**Extensions:**
- `uuid-ossp` - UUID генерация
- `pg_trgm` - Полнотекстовый поиск

### Dual Storage Strategy

Приложение поддерживает два режима хранения:

1. **LocalStorage** (offline-first):
   - `sanatorium_bookings`
   - `sanatorium_guests`
   - `sanatorium_rooms`
   - `sanatorium_organizations`
   - `sanatorium_currentDate`
   - `sanatorium_auditHistory`

2. **PostgreSQL** (через API):
   - Полная синхронизация с backend
   - Реляционные связи
   - Транзакции и целостность данных

## 🔒 Безопасность

- **JWT токены** с истечением через 7 дней
- **bcrypt** хеширование паролей (10 раундов)
- **Rate limiting** - 100 запросов за 15 минут
- **Helmet.js** - защита HTTP заголовков
- **CORS** - настроенные домены
- **Валидация** всех входных данных
- **Audit logging** всех операций
- **SQL injection** защита через TypeORM
- **XSS** защита

## 📈 Мониторинг

- **Health check endpoint:** `/health`
- **API Documentation:** `/api-docs`
- **Database logging** в development режиме
- **Audit logs** для всех операций
- **Docker health checks** для всех сервисов

## 🎨 Дизайн

- Адаптивный дизайн для всех устройств
- Цветовая индикация статусов
- Градиентные фоны для разных разделов
- Современный UI с ShadCN компонентами
- Интуитивно понятный интерфейс

## 🔧 Разработка

### Доступные скрипты

**Frontend:**
```bash
npm run dev          # Dev-сервер
npm run build        # Сборка
npm run preview      # Предпросмотр сборки
npm run lint         # Линтинг
```

**Backend:**
```bash
npm run dev          # Dev-сервер с nodemon
npm run build        # Сборка TypeScript
npm start            # Запуск production
```

**Docker:**
```bash
docker-compose up -d              # Запустить все сервисы
docker-compose down               # Остановить все сервисы
docker-compose logs -f backend    # Логи backend
docker-compose logs -f postgres   # Логи БД
```

## 🧪 Тестирование

```bash
# Frontend
npm test

# Backend
cd backend
npm test
```

## 📝 Переменные окружения

### Backend (.env)
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=sanatorium
DB_PASSWORD=password
DB_NAME=sanatorium_db

JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Frontend
```env
VITE_API_URL=http://localhost:3001/api
```

## 🚢 Деплой

### Production с Docker

```bash
# Сборка и запуск с Nginx
docker-compose --profile production up -d

# Доступ:
# - Frontend: http://localhost:80
# - Backend: http://localhost:3001
# - Nginx: http://localhost:80
```

### Manual Deploy

1. Настройте PostgreSQL на production сервере
2. Соберите backend: `cd backend && npm run build`
3. Соберите frontend: `npm run build`
4. Настройте Nginx для проксирования запросов
5. Запустите backend: `cd backend && npm start`
6. Разверните frontend build в Nginx

## 📄 Лицензия

Этот проект создан для санатория "Днестр".

## 🆘 Поддержка

Для вопросов и поддержки обращайтесь к разработчикам проекта.

---

**Создано с ❤️ для эффективного управления санаторием "Днестр"**
