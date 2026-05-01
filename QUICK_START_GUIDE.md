# JobConnect - Quick Start Guide

## Prerequisites

- Java 17 or higher
- Node.js 18+ and npm
- PostgreSQL 14+
- Maven 3.8+

## Database Setup

### 1. Create Database
```bash
# Using psql
psql -U postgres
CREATE DATABASE jobconnect_db;
\q
```

### 2. Configure Database Connection
Edit `jobconnect-backend/src/main/resources/application.yaml`:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/jobconnect_db
    username: your_username
    password: your_password
```

## Backend Setup

### 1. Navigate to Backend Directory
```bash
cd jobconnect-backend
```

### 2. Install Dependencies
```bash
mvn clean install
```

### 3. Run Application
```bash
mvn spring-boot:run
```

The backend will start on: **http://localhost:8080**

### 4. Verify Backend
```bash
curl http://localhost:8080/api/v1/jobs
```

## Frontend Setup

### 1. Navigate to Frontend Directory
```bash
cd jobconnect-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure API URL (Optional)
Create `.env` file:
```env
VITE_API_URL=http://localhost:8080/api/v1
```

### 4. Run Development Server
```bash
npm run dev
```

The frontend will start on: **http://localhost:5173**

## Testing the Application

### 1. Register a Candidate
- Navigate to http://localhost:5173/register
- Fill in the form with role "CANDIDATE"
- Submit registration

### 2. Register a Recruiter
- Navigate to http://localhost:5173/register
- Fill in the form with role "RECRUITER"
- Submit registration

### 3. Login
- Navigate to http://localhost:5173/login
- Use registered credentials
- You'll be redirected based on your role

### 4. Test Features

#### As a Candidate:
- Browse jobs at `/jobs`
- View job details
- Apply to jobs
- View applications in dashboard

#### As a Recruiter:
- Post new jobs
- View posted jobs
- Manage applications
- Update application status

## API Endpoints

### Authentication
```bash
# Register
POST http://localhost:8080/api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "CANDIDATE"
}

# Login
POST http://localhost:8080/api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Jobs
```bash
# Get all jobs (paginated)
GET http://localhost:8080/api/v1/jobs?page=0&size=10

# Get job by ID
GET http://localhost:8080/api/v1/jobs/1

# Create job (requires RECRUITER role)
POST http://localhost:8080/api/v1/jobs
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Senior Java Developer",
  "description": "We are looking for...",
  "requirements": "5+ years experience...",
  "location": "New York, NY",
  "jobType": "FULL_TIME",
  "experienceLevel": "SENIOR",
  "salaryMin": 100000,
  "salaryMax": 150000,
  "currency": "USD"
}
```

### Applications
```bash
# Submit application (requires CANDIDATE role)
POST http://localhost:8080/api/v1/applications
Authorization: Bearer {token}
Content-Type: application/json

{
  "jobId": 1,
  "coverLetter": "I am interested in..."
}

# Get candidate applications
GET http://localhost:8080/api/v1/applications/candidate/{candidateId}
Authorization: Bearer {token}

# Update application status (requires RECRUITER role)
PATCH http://localhost:8080/api/v1/applications/{id}/status?status=INTERVIEW
Authorization: Bearer {token}
```

## Project Structure

```
jobconnect-backend/
├── src/main/java/com/jobconnect/
│   ├── config/              # Security & Web configuration
│   ├── controller/          # REST controllers
│   ├── dto/                 # Data Transfer Objects
│   ├── entity/              # JPA entities
│   ├── exception/           # Exception handling
│   ├── repository/          # Data repositories
│   ├── security/            # JWT & security
│   └── service/             # Business logic
└── src/main/resources/
    └── application.yaml     # Configuration

jobconnect-frontend/
├── src/
│   ├── components/          # Reusable components
│   ├── pages/               # Page components
│   ├── services/            # API services
│   └── App.jsx              # Main app component
└── package.json
```

## Common Issues & Solutions

### Backend Issues

#### Port 8080 already in use
```bash
# Change port in application.yaml
server:
  port: 8081
```

#### Database connection failed
- Verify PostgreSQL is running
- Check credentials in application.yaml
- Ensure database exists

### Frontend Issues

#### API calls failing
- Verify backend is running
- Check CORS configuration
- Verify API URL in .env

#### Port 5173 already in use
```bash
# Vite will automatically use next available port
# Or specify port in vite.config.js
```

## Development Tips

### Hot Reload
- Backend: Use Spring Boot DevTools (already configured)
- Frontend: Vite provides instant HMR

### Debugging
- Backend: Use IDE debugger or add logging
- Frontend: Use browser DevTools and React DevTools

### Database Management
```bash
# View tables
psql -U postgres -d jobconnect_db
\dt

# Reset database
DROP DATABASE jobconnect_db;
CREATE DATABASE jobconnect_db;
```

## Production Deployment

### Backend
```bash
# Build JAR
mvn clean package

# Run JAR
java -jar target/jobconnect-backend-1.0.0.jar
```

### Frontend
```bash
# Build for production
npm run build

# Serve with any static server
npx serve -s dist
```

## Environment Variables

### Backend (application.yaml)
```yaml
app:
  jwt:
    secret: ${JWT_SECRET:your-secret-key-min-256-bits}
    access-token-expiration: 3600000
    refresh-token-expiration: 86400000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8080/api/v1
```

## Support

For issues or questions:
1. Check the documentation in `/docs`
2. Review PHASE2_COMPLETION.md for implementation details
3. Check GitHub issues

## Next Steps

1. Explore the API with Postman or curl
2. Customize the UI with Tailwind CSS
3. Add more features from Phase 3 roadmap
4. Deploy to production

---

**Happy Coding! 🚀**
