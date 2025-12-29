# User Stories

## Roles

1. **Guest** — unregistered visitor looking for apartment
2. **User** — registered visitor (future feature)
3. **Agent** — manages apartments via admin panel

---

## Home Page

### US-H1: Value Proposition
> As a guest, I want to immediately understand what this site is about, so I can decide to stay or leave

- Clear headline: "Apartment Rentals in Nha Trang"
- Short subtitle with value proposition

### US-H2: Quick Search
> As a guest, I want to start searching immediately without scrolling

Search fields:
- District (dropdown, dynamic from admin)
- Price range (from-to)
- Number of rooms
- "Search" button

### US-H3: Language Switcher
> As a guest, I want to switch language to one I understand

- RU / EN / VN in header
- All content translated

### US-H4: Apartments by District
> As a guest, I want to see apartments grouped by districts to quickly find interesting location

```
Apartments in Europa →
[card] [card] [card] [card]  ← horizontal slider

Apartments in Center →
[card] [card] [card] [card]  ← horizontal slider
```

### US-H5: Apartment Card Preview
> As a guest, I want to see key info in preview to decide whether to click

Card contains:
- Photo (slider with dots)
- Price / month
- District name
- Rooms (Studio / 1BR / 2BR / etc.)
- Status badge: ✅ Available | 📅 From [date]
- Video call icon: 📹 if available
- Favorite button: ❤️

### US-H6: Horizontal Card Slider
> As a guest, I want to scroll through apartments in a district without leaving the page

- Horizontal scroll (touch on mobile)
- Arrow buttons ← → on desktop
- Smooth animation

### US-H7: View All in District
> As a guest, I want to click district title and see all apartments there

- Click "Apartments in Europa →" → catalog page filtered by district

### US-H8: Map View Button
> As a guest, I want to see all apartments on a map

- Button "View on Map" → map page with all apartments

### US-H9: Quick Contact
> As a guest, I want to message agent if I have questions

- Floating WhatsApp/Telegram button
- Always visible on scroll

### US-H10: Favorites
> As a guest, I want to save apartments I like

- Click ❤️ on card → saved to favorites
- Without registration: localStorage
- With registration: database
- On registration: merge localStorage → database

---

## Catalog Page

TBD

---

## Apartment Detail Page

TBD

---

## Map Page

TBD

---

## Admin Panel

TBD

---

## Favorites Page

TBD
