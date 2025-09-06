# Vehicle Booking Application

A full-stack vehicle booking application built with Express.js (backend) and React + TypeScript (frontend).

##  Features

- Multi-step vehicle booking form
- Vehicle type and model selection based on wheel count
- Date range picker with availability checking
- Real-time form validation
- Booking confirmation with reference number
- Responsive design with Material-UI components


```

##  Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** database (local or cloud)

##  Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd octalogic_assignment
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create environment file
cp .env.example .env
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/vehicle_booking"

# Server Configuration
PORT=3000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL="http://localhost:5173"
```

### 4. Database Setup

```bash

npm run db:generate

npm run db:migrate

npm run db:seed

# Or run all database setup commands at once
npm run db:setup
```

### 5. Start Backend Server

```bash

npm run dev


```

The backend will be running at `http://localhost:3000`

### 6. Frontend Setup

```bash
cd frontend

npm install

# Create environment file
cp .env.example .env
```

### 7. Configure Frontend Environment

Create a `.env` file in the `frontend` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api
```

### 8. Start Frontend Development Server

```bash
npm run dev
```

The frontend will be running at `http://localhost:5173`


### Backend Scripts

```bash
npm run dev          
npm run db:generate  
npm run db:migrate   
npm run db:seed    
npm run db:setup    
```



## API Endpoints

### Vehicle Endpoints
- `GET /api/vehicle-types?wheels={2|4}` - Get vehicle types by wheel count
- `GET /api/vehicles?vehicleTypeId={id}` - Get vehicles by type

### Booking Endpoints
- `POST /api/bookings` - Create a new booking
- `POST /api/bookings/check-availability` - Check vehicle availability

### Example API Requests

```bash
# Get 2-wheeler vehicle types
curl "http://localhost:3000/api/vehicle-types?wheels=2"

# Get vehicles for a specific type
curl "http://localhost:3000/api/vehicles?vehicleTypeId=1"

# Create a booking
curl -X POST "http://localhost:3000/api/bookings" \\
  -H "Content-Type: application/json" \\
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    "vehicle_id": 1,
    "start_date": "2025-09-10",
    "end_date": "2025-09-15"
  }'
```

