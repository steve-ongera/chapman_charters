# SkyCharter – Aviation Services Platform

A full-stack web application for an air charter brokerage, built with **Django REST Framework** (backend) and **React** (frontend).

---

## Project Structure

```
skyCharter/
├── backend/                  # Django project
│   ├── core/                 # Main Django app
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── admin.py
│   ├── skyCharter/           # Django project config
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── manage.py
│   └── requirements.txt
└── frontend/                 # React project (Vite)
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx
    │   ├── styles/
    │   │   └── main.css
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── HeroSection.jsx
    │   │   ├── ServiceCard.jsx
    │   │   ├── QuoteForm.jsx
    │   │   └── TestimonialSlider.jsx
    │   └── pages/
    │       ├── Home.jsx
    │       ├── PrivateJetCharter.jsx
    │       ├── GroupAirCharter.jsx
    │       ├── AirCargo.jsx
    │       ├── AircraftLeasing.jsx
    │       ├── FlightSupport.jsx
    │       ├── AviationEmergencyServices.jsx
    │       └── AboutUs.jsx
    ├── package.json
    └── vite.config.js
```

---

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Backend   | Python 3.11, Django 5, DRF        |
| Frontend  | React 18, Vite, React Router v6   |
| Styling   | Custom CSS + Bootstrap Icons CDN  |
| Database  | SQLite (dev) / PostgreSQL (prod)  |
| Auth      | Optional – quote requests need no account |

---

## Quick Start

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser  # optional
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`, backend on `http://localhost:8000`.

---

## Environment Variables (backend/.env)
```
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173
DATABASE_URL=sqlite:///db.sqlite3   # or postgres://...
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your@email.com
EMAIL_HOST_PASSWORD=yourpassword
```

---

## Key Design Decisions

- **No account required** to submit a quote request — guest submissions are stored with an optional email.
- Quote requests hit `/api/quotes/` (POST, no auth).
- Admin panel at `/admin/` for staff to manage inquiries.
- CORS enabled for the React dev server.
- All API responses are JSON.