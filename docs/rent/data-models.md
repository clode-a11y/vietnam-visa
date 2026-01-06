# Data Models

## Entities

### District

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| name_ru | string | Name in Russian |
| name_en | string | Name in English |
| name_vn | string | Name in Vietnamese |
| description_ru | string? | Optional description RU |
| description_en | string? | Optional description EN |
| description_vn | string? | Optional description VN |
| cover_image | string | Cover image URL |
| sort_order | integer | Display order on homepage |
| is_active | boolean | Show/hide on site |
| created_at | timestamp | |
| updated_at | timestamp | |

---

### Apartment

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| district_id | UUID | FK → District |
| title_ru | string | Title in Russian |
| title_en | string | Title in English |
| title_vn | string | Title in Vietnamese |
| description_ru | text | Full description RU |
| description_en | text | Full description EN |
| description_vn | text | Full description VN |
| price_usd | decimal | Price per month in USD |
| price_vnd | decimal | Price per month in VND |
| rooms | integer | Number of rooms (0 = studio) |
| area_sqm | decimal | Area in square meters |
| floor | integer | Floor number |
| total_floors | integer | Total floors in building |
| address | string | Address (may be partial for privacy) |
| latitude | decimal | For map |
| longitude | decimal | For map |
| status | enum | available, occupied, reserved |
| available_from | date? | If occupied, when available |
| video_call_available | boolean | Can do video showing |
| viewing_available | boolean | Can do in-person viewing |
| is_active | boolean | Show/hide on site |
| created_at | timestamp | |
| updated_at | timestamp | |

**Status enum:**
- `available` — can move in now
- `occupied` — someone lives there, available from date
- `reserved` — temporarily reserved

---

### ApartmentImage

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| apartment_id | UUID | FK → Apartment |
| image_url | string | Image URL |
| sort_order | integer | Display order |
| is_cover | boolean | Main image for card |
| created_at | timestamp | |

---

### Amenity

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| name_ru | string | Name in Russian |
| name_en | string | Name in English |
| name_vn | string | Name in Vietnamese |
| icon | string | Icon name or URL |
| category | enum | general, kitchen, bathroom, building |

**Examples:** WiFi, Air Conditioning, Washing Machine, Pool, Gym, Parking, Balcony, Sea View

---

### ApartmentAmenity

| Field | Type | Description |
|-------|------|-------------|
| apartment_id | UUID | FK → Apartment |
| amenity_id | UUID | FK → Amenity |

Many-to-many junction table.

---

### ViewingRequest

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| apartment_id | UUID | FK → Apartment |
| name | string | Client name |
| phone | string | Client phone |
| messenger | enum | whatsapp, telegram, zalo |
| request_type | enum | viewing, video_call |
| preferred_date | date? | Preferred date |
| preferred_time | string? | Preferred time |
| message | text? | Additional message |
| status | enum | new, contacted, completed, cancelled |
| created_at | timestamp | |
| updated_at | timestamp | |

---

### User (Future)

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| email | string | Email |
| phone | string? | Phone |
| name | string? | Name |
| language | enum | ru, en, vn |
| created_at | timestamp | |

---

### Favorite (Future)

| Field | Type | Description |
|-------|------|-------------|
| user_id | UUID | FK → User |
| apartment_id | UUID | FK → Apartment |
| created_at | timestamp | |

---

## Relationships

```
District 1 ←→ N Apartment
Apartment 1 ←→ N ApartmentImage
Apartment N ←→ N Amenity (via ApartmentAmenity)
Apartment 1 ←→ N ViewingRequest
User N ←→ N Apartment (via Favorite)
```
