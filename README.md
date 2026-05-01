# JobConnect - Full-Stack Job Portal System

A production-grade job portal platform connecting job seekers (candidates) with employers (recruiters).

## Project Structure

```
jobconnect-backend/      # Spring Boot 3.1+ backend
jobconnect-frontend/     # React 18+ frontend
```

## Phase 1: Foundation Setup ✅

### Backend Completed
- ✅ Maven project with Spring Boot 3.1.5
- ✅ All 13 JPA entities created
- ✅ Database schema (PostgreSQL)
- ✅ JWT authentication setup
- ✅ Security configuration
- ✅ Exception handling
- ✅ DTOs for auth endpoints

### Frontend Completed
- ✅ React + Vite project
- ✅ Tailwind CSS configured
- ✅ React Router setup
- ✅ Basic pages (Home, Login, Register)
- ✅ API client with interceptors

## Phase 2: Core Implementation ✅

### Backend Completed
- ✅ JWT Authentication Filter
- ✅ UserDetailsService implementation
- ✅ Complete service layer (Auth, User, Job, Application, Company, Candidate)
- ✅ REST controllers with role-based access
- ✅ Pagination support
- ✅ Security filter chain integration

### Frontend Completed
- ✅ API services (job, application, company, candidate)
- ✅ Navbar component
- ✅ Job listing with pagination
- ✅ Job detail page
- ✅ Candidate dashboard
- ✅ Recruiter dashboard
- ✅ Route configuration

## Getting Started

### Backend Setup
```bash
cd jobconnect-backend

# Install dependencies (Maven)
mvn clean install

# Create PostgreSQL database
createdb jobconnect_db
psql jobconnect_db < src/main/resources/db/migration/V1__initial_schema.sql

# Run application
mvn spring-boot:run
```

### Frontend Setup
```bash
cd jobconnect-frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

## Next Steps (Phase 3)

1. Advanced search and filters
2. File upload for resumes
3. Email notifications
4. Skills matching
5. Swagger API documentation
6. Unit and integration tests
7. Docker containerization
8. CI/CD pipeline

## Tech Stack

- **Backend:** Java 17, Spring Boot 3.1, PostgreSQL, JWT, MapStruct
- **Frontend:** React 18, React Router, Axios, Tailwind CSS, Redux Toolkit
- **DevOps:** Docker, Docker Compose, GitHub Actions

## Documentation

- [Architecture Design](ARCHITECTURE.md) - System architecture and design patterns
- [API Documentation](API_DOCUMENTATION.md) - Complete REST API reference
- [Database Schema](DATABASE_SCHEMA.md) - Database design and relationships

## License

MIT License - See LICENSE file

---

**Status:** Phase 2 Complete - Core Features Ready
**Last Updated:** December 2024
