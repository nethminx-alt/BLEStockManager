# StockFlow — Inventory Management System

Full-stack inventory tracker with clean UI, image uploads, CSV export, and a Node.js API.

## Project structure

```
inventory-system/
├── index.html          # Frontend (open in browser)
├── README.md
└── backend/
    ├── server.js       # Express API
    ├── package.json
    ├── data/           # products.json (auto-created)
    └── uploads/        # Product images
```

## Quick start

### 1. Start the backend

```bash
cd backend
npm install
npm start
```

API runs at **http://localhost:3001**

### 2. Open the frontend

Open `index.html` in your browser (double-click or drag into Chrome/Firefox/Edge).

The UI connects to `http://localhost:3001/api`.

> Tip: If you open the HTML via `file://`, some browsers may block requests.  
> Prefer a simple static server:
>
> ```bash
> # from the inventory-system folder
> npx serve .
> # or
> python3 -m http.server 8080
> ```
> Then open http://localhost:8080

## Features

| Feature | Description |
|--------|-------------|
| **Dashboard** | Total products, units, low-stock count, inventory value |
| **Products** | Table with search, category pills, stock filters |
| **Stock controls** | Inline +/− buttons (updates backend instantly) |
| **Low stock alerts** | Dedicated view for items at/below reorder level |
| **Categories** | Per-category summary cards |
| **Image upload** | Drag & drop or click · JPEG/PNG/WebP/GIF · max 5MB |
| **CSV export** | One-click download of full inventory |
| **Persistence** | JSON file storage (`backend/data/products.json`) |

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/products` | List all products |
| GET | `/api/products/:id` | Get one product |
| POST | `/api/products` | Create product (multipart: fields + optional `image`) |
| PUT | `/api/products/:id` | Update product (multipart) |
| PATCH | `/api/products/:id/stock` | Adjust stock `{ "delta": 1 }` or `{ "stock": 20 }` |
| DELETE | `/api/products/:id` | Delete product (+ image) |
| GET | `/api/stats` | Aggregate stats |
| GET | `/api/export/csv` | Download CSV |
| GET | `/api/health` | Health check |

## Environment

- Node.js 18+
- Port: `3001` (override with `PORT=xxxx npm start`)

## Notes

- Data is stored in `backend/data/products.json`
- Uploaded images go to `backend/uploads/`
- Seed data (10 sample products) is created on first run
- Frontend shows API status (Online / Offline) in the sidebar
