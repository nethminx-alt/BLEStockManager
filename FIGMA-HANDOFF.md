# StockFlow — Figma Design Handoff

Use this document to recreate the UI in Figma with high fidelity.

---

## 1. Design Tokens

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#F4F6F9` | Page background |
| `--surface` | `#FFFFFF` | Cards, sidebar, topbar, modals |
| `--border` | `#E5E9F0` | Borders, dividers |
| `--text` | `#1A2332` | Primary text |
| `--text-secondary` | `#5A6A7E` | Secondary / muted text |
| `--primary` | `#2563EB` | Primary actions, active states |
| `--primary-hover` | `#1D4ED8` | Primary button hover |
| `--primary-light` | `#EFF6FF` | Active nav, light primary bg |
| `--success` | `#059669` | In-stock badge text |
| `--success-bg` | `#ECFDF5` | In-stock badge bg |
| `--warning` | `#D97706` | Low-stock badge text |
| `--warning-bg` | `#FFFBEB` | Low-stock badge bg |
| `--danger` | `#DC2626` | Out-of-stock / delete |
| `--danger-bg` | `#FEF2F2` | Danger badge / button bg |

### Typography

- **Font family:** Inter (or SF Pro / system-ui as fallback)
- **Weights used:** 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

| Style | Size | Weight | Line height | Usage |
|-------|------|--------|-------------|-------|
| Page title | 20px | 700 | 1.3 | Topbar title |
| Card title | 16px | 600 | 1.4 | Section headers |
| Body | 14px | 400–500 | 1.5 | Table cells, buttons |
| Label | 13px | 600 | 1.4 | Form labels |
| Small / meta | 12–13px | 400–500 | 1.4 | SKU, badges, hints |
| Stat value | 28px | 700 | 1.2 | Dashboard numbers |
| Nav item | 14px | 500 | 1.4 | Sidebar links |
| Overline | 11px | 600 | 1.3 | "MENU" labels (uppercase, +0.6px tracking) |

### Spacing scale

Use 4px base:

`4 · 6 · 8 · 10 · 12 · 14 · 16 · 18 · 20 · 22 · 24 · 28 · 32`

Common values:
- Card padding: 22px
- Table cell: 14–16px vertical, 20px horizontal
- Modal padding: 24px
- Sidebar width: **260px**
- Gap between stats cards: 20px
- Button padding: 10px 18px (default), 6px 12px (small)

### Radius

| Element | Radius |
|---------|--------|
| Cards | 12px |
| Buttons | 10px |
| Inputs / selects | 10px |
| Badges / pills | 20px (pill) |
| Product thumb | 8px |
| Modal | 16px |
| Nav item | 8px |
| Brand icon | 10px |

### Shadows

```
--shadow:    0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)
--shadow-md: 0 4px 12px rgba(0,0,0,0.08)
Modal:       0 20px 50px rgba(0,0,0,0.15)
```

---

## 2. Layout Structure

### Desktop (1440×900 reference)

```
┌──────────┬────────────────────────────────────────────┐
│ Sidebar  │ Topbar                                     │
│ 260px    │  height ~64–72px                           │
│          ├────────────────────────────────────────────┤
│          │ Content area                               │
│          │  padding: 28px 32px                        │
│          │                                            │
│          │  [ Stats row – 4 columns ]                 │
│          │                                            │
│          │  [ Main card / table ]                     │
│          │                                            │
└──────────┴────────────────────────────────────────────┘
```

- Sidebar: fixed left, full height, white, 1px right border
- Topbar: sticky, white, 1px bottom border
- Content: light gray bg (`#F4F6F9`)

### Sidebar

1. Brand row (padding 24px 20px) — icon 36×36 + wordmark
2. Nav section
   - Overline "MENU"
   - Nav items: icon 20px + label, 10px 12px padding, 8px radius
   - Active = primary-light bg + primary text
3. Footer: user card (avatar + name/role) + API status dot

### Topbar

- Left: Page title (20px Bold)
- Right: Search (240–280px) + Export CSV (secondary) + Add Product (primary)

---

## 3. Components (create as Figma Components)

### Buttons

| Variant | Fill | Text | Border | Notes |
|---------|------|------|--------|-------|
| Primary | `#2563EB` | White | none | Hover `#1D4ED8` |
| Secondary | White | `#1A2332` | 1px `#E5E9F0` | Hover bg `#F4F6F9` |
| Danger | `#FEF2F2` | `#DC2626` | none | Hover slightly darker |
| Ghost | transparent | `#5A6A7E` | none | Icon-only close, etc. |
| Small | same | same | same | 6px 12px, 13px text, 8px radius |

Include leading icon (18px) where used.

### Status Badges

Pill shape (20px radius), 4px 10px padding, 12px Semibold:

- **In Stock** → bg `#ECFDF5` / text `#059669`
- **Low Stock** → bg `#FFFBEB` / text `#D97706`
- **Out of Stock** → bg `#FEF2F2` / text `#DC2626`
- **Neutral** (category) → bg `#F4F6F9` / text `#5A6A7E`

### Stat Card

- White surface, 12px radius, 1px border, soft shadow
- Padding 22px
- Top row: label (13px Medium, secondary) + icon container 40×40 (10px radius, tinted bg)
- Value: 28px Bold
- Meta: 13px secondary

### Product Cell

- Horizontal auto-layout, gap 14px
- Thumb: 44×44, 8px radius, border, image cover or emoji centered
- Name: 14px Semibold
- SKU: 12px secondary

### Stock Controls

- Horizontal: [−]  number  [+]
- Buttons: 28×28, 6px radius, 1px border, white fill

### Form Inputs

- Height ~40px (10px 14px padding)
- 10px radius, 1px border `#E5E9F0`
- Focus: border primary + 3px ring `rgba(37,99,235,0.12)`
- Label above: 13px Semibold, 6px gap

### Modal

- Max width 560px, 16px radius
- Overlay: `rgba(15,23,42,0.45)`
- Header + body (24px) + footer (right-aligned buttons)
- Image upload zone: dashed 2px border, 12px radius, min-height 120px

### Category Pills

- 6px 14px padding, 20px radius, 13px Medium
- Default: white + border
- Active: primary fill, white text

---

## 4. Key Screens to Build in Figma

Create these frames (Desktop 1440 wide recommended):

1. **Dashboard**
   - 4 stat cards in a row
   - “Recent Products” table card

2. **Products**
   - Category pills row
   - Full products table with stock controls + actions

3. **Low Stock Alerts**
   - Table focused on low/out items + Restock CTA

4. **Categories**
   - Grid of category summary cards

5. **Add / Edit Product Modal**
   - Image upload area (empty + with preview states)
   - Form fields in 2-column rows
   - Footer actions

6. **Empty states** (optional)
   - No products / no low stock

---

## 5. Suggested Figma Setup

1. Create a new file → **StockFlow Design System**
2. Page 1: **Foundations**
   - Color styles (from tokens above)
   - Text styles (from typography table)
   - Effect styles (shadows)
3. Page 2: **Components**
   - Buttons, Badges, Inputs, Cards, Nav items, Product cell, etc.
   - Use Auto Layout everywhere
4. Page 3: **Screens**
   - Dashboard, Products, Low Stock, Categories, Modal
5. Use **Auto Layout** + **Constraints** so the layout is responsive-ready
6. Name layers clearly (e.g. `Card / Stat`, `Btn / Primary`, `Badge / Warning`)

### Auto Layout tips

- Sidebar → Vertical, fill height
- Topbar → Horizontal, space-between
- Stats row → Horizontal, gap 20, each card fill container
- Table rows → Horizontal
- Modal form rows → Horizontal, gap 16, equal columns

---

## 6. Assets & Icons

- Icons: 20×20 (nav), 18×18 (buttons), 14×14 (stock ±)
- Style: outline / stroke 1.5–2px, rounded caps
- Brand mark: 36×36 rounded square, blue gradient (`#2563EB` → `#3B82F6`), white “S”
- User avatar: 36×36 circle, purple gradient

You can use the **Lucide** or **Heroicons** (outline) icon set — matches the current implementation.

---

## 7. Importing into Figma

**Option A — Recreate from this handoff** (recommended for clean components)

**Option B — Screenshot reference**
1. Open `index.html` with the backend running
2. Capture each screen (Dashboard, Products, Modal open)
3. Drag images into Figma as reference frames
4. Rebuild on top using Auto Layout + the tokens above

**Option C — html.to.design plugin**
1. Serve the frontend (`npx serve .`)
2. Use the Figma plugin **html.to.design** (or similar) to import the live page
3. Clean up layers and convert to components

---

## 8. Quick Checklist

- [ ] Color styles created
- [ ] Text styles created
- [ ] Button component set (Primary / Secondary / Danger / Ghost + Small)
- [ ] Badge component set
- [ ] Stat card component
- [ ] Product row / cell component
- [ ] Sidebar + Topbar as components
- [ ] 4–5 main screens framed
- [ ] Modal with image upload states
- [ ] Dark mode optional (not in current version)

---

Once you have the Foundations and Components pages set up, the screens go very fast.  
If you want, I can also generate high-fidelity mockup images of the main screens for you to drop straight into Figma as references.
