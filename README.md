# DataHub – Backend API

REST API for the DataHub SaaS platform. Built with Node.js, Express, and native PostgreSQL (no ORM).

## Live URL
https://backend-datahub-production.up.railway.app

## Tech Stack
- Node.js / Express
- PostgreSQL (native pg driver)
- JWT authentication
- bcrypt password hashing
- Deploy: Railway

## Endpoints
### Auth
- POST /auth/register
- POST /auth/login

### Tickets (protected)
- GET /tickets
- POST /tickets
- DELETE /tickets/:id

### Bookings (protected)
- GET /bookings
- POST /bookings
- DELETE /bookings/:id

### Messages (protected)
- GET /messages
- POST /messages
- DELETE /messages/:id

## Environment Variables
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret
PORT=5000

## Frontend Repo
https://github.com/Samuel-Garrote/saas-datahub
