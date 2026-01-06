# Data Models — Туристическая карта

## Модели

- [Place (Место)](#place-место)
- [Category (Категория)](#category-категория)
- [Review (Отзыв)](#review-отзыв)
- [Suggestion (Предложение)](#suggestion-предложение)

---

## Place (Место)

Основная сущность — место на карте.

```typescript
interface Place {
  id: string

  // Основное
  name: string                    // Название
  slug: string                    // URL-friendly название
  description: string             // Описание (поддержка markdown)
  categoryId: string              // Ссылка на категорию

  // Геолокация
  location: {
    lat: number                   // Широта
    lng: number                   // Долгота
    address: string               // Адрес текстом
    district?: string             // Район Нячанга
  }

  // Медиа
  photos: string[]                // URL фотографий
  coverPhoto?: string             // Главное фото

  // Контакты
  contacts?: {
    phone?: string
    website?: string
    facebook?: string
    instagram?: string
  }

  // Дополнительно
  workingHours?: {
    monday?: string               // "09:00-22:00" или "closed"
    tuesday?: string
    wednesday?: string
    thursday?: string
    friday?: string
    saturday?: string
    sunday?: string
    note?: string                 // "Без выходных" и т.п.
  }

  priceRange?: 'budget' | 'medium' | 'expensive'  // Для еды
  avgCheck?: string               // "200,000 - 500,000 VND"

  // Фичи (зависят от категории)
  features?: string[]             // ["Wi-Fi", "Кондиционер", "Русское меню"]

  // Рейтинг
  rating: number                  // Средний рейтинг (1-5)
  reviewCount: number             // Количество отзывов

  // Мета
  status: 'draft' | 'published' | 'archived'
  createdAt: Date
  updatedAt: Date
  createdBy: string               // ID админа
}
```

### Примеры features по категориям

| Категория | Возможные features |
|-----------|-------------------|
| Рестораны | Wi-Fi, Кондиционер, Русское меню, Доставка, Терраса |
| Пляжи | Бесплатный вход, Лежаки, Душ, Туалет, Еда рядом |
| Массаж | Кондиционер, Сауна, Парковка, Карты принимают |
| Банкоматы | Без комиссии, Работает 24/7, Внутри помещения |

---

## Category (Категория)

```typescript
interface Category {
  id: string
  name: string                    // "Еда"
  slug: string                    // "food"
  icon: string                    // Emoji или иконка
  color: string                   // HEX цвет маркера
  order: number                   // Порядок отображения

  // Какие features доступны для этой категории
  availableFeatures?: string[]

  // Показывать ли цену/чек
  showPriceRange?: boolean

  placesCount: number             // Количество мест (кеш)

  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
```

### Стандартные категории

```javascript
const categories = [
  { name: "Еда", slug: "food", icon: "🍜", color: "#FF6B6B" },
  { name: "Пляжи", slug: "beaches", icon: "🏖️", color: "#4ECDC4" },
  { name: "Массаж/СПА", slug: "spa", icon: "💆", color: "#A78BFA" },
  { name: "Банкоматы", slug: "atm", icon: "🏧", color: "#60A5FA" },
  { name: "Аптеки", slug: "pharmacy", icon: "💊", color: "#34D399" },
  { name: "Магазины", slug: "shops", icon: "🛒", color: "#FBBF24" },
  { name: "Развлечения", slug: "entertainment", icon: "🎢", color: "#F472B6" },
  { name: "Транспорт", slug: "transport", icon: "🚌", color: "#9CA3AF" },
  { name: "Услуги", slug: "services", icon: "✂️", color: "#FB923C" },
]
```

---

## Review (Отзыв)

```typescript
interface Review {
  id: string
  placeId: string                 // Ссылка на место

  // Контент
  rating: number                  // 1-5 звёзд
  text: string                    // Текст отзыва
  photos?: string[]               // Фото к отзыву

  // Автор
  author: {
    name: string                  // Имя (вводится вручную)
    email?: string                // Для связи (не показывается)
  }

  // Мета
  status: 'pending' | 'approved' | 'rejected'
  createdAt: Date

  // Полезность
  helpfulCount: number            // Сколько раз отметили полезным
}
```

---

## Suggestion (Предложение места)

Когда пользователь предлагает новое место.

```typescript
interface Suggestion {
  id: string

  // Данные места (то что заполнил пользователь)
  name: string
  categoryId: string
  description?: string

  location: {
    lat: number
    lng: number
    address?: string
  }

  photos?: string[]

  contacts?: {
    phone?: string
    website?: string
  }

  // Контакт отправителя
  submitter: {
    name: string
    email?: string
    telegram?: string
  }

  // Модерация
  status: 'pending' | 'approved' | 'rejected'
  moderatorNote?: string          // Заметка модератора
  processedAt?: Date
  processedBy?: string            // ID админа

  // Если одобрено — ссылка на созданное место
  createdPlaceId?: string

  createdAt: Date
}
```

---

## Связи между моделями

```
Category (1) ──────< (N) Place
Place (1) ──────< (N) Review
Suggestion (1) ────> (0-1) Place (после одобрения)
```

---

## Индексы MongoDB

```javascript
// Place
db.places.createIndex({ "location": "2dsphere" })  // Геопоиск
db.places.createIndex({ "categoryId": 1 })
db.places.createIndex({ "status": 1 })
db.places.createIndex({ "slug": 1 }, { unique: true })

// Review
db.reviews.createIndex({ "placeId": 1, "createdAt": -1 })
db.reviews.createIndex({ "status": 1 })

// Suggestion
db.suggestions.createIndex({ "status": 1, "createdAt": -1 })
```

---

## API Endpoints

### Places
```
GET    /api/places              - Список мест (с фильтрами)
GET    /api/places/:slug        - Одно место по slug
POST   /api/places              - Создать (admin)
PUT    /api/places/:id          - Обновить (admin)
DELETE /api/places/:id          - Удалить (admin)
```

### Categories
```
GET    /api/categories          - Список категорий
POST   /api/categories          - Создать (admin)
PUT    /api/categories/:id      - Обновить (admin)
```

### Reviews
```
GET    /api/places/:id/reviews  - Отзывы места
POST   /api/places/:id/reviews  - Добавить отзыв
PUT    /api/reviews/:id         - Модерация (admin)
```

### Suggestions
```
POST   /api/suggestions         - Предложить место
GET    /api/admin/suggestions   - Список на модерации (admin)
PUT    /api/admin/suggestions/:id - Одобрить/отклонить (admin)
```
