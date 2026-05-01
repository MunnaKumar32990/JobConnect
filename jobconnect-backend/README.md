# JobConnect Backend

Spring Boot 3.1+ REST API for the JobConnect job portal system.

## Prerequisites

- Java 17+
- Maven 3.8+
- PostgreSQL 15+
- Git

## Project Setup

### 1. Clone Repository
```bash
git clone <repo-url>
cd jobconnect-backend
```

### 2. Configure Database

Create PostgreSQL database and user:
```sql
CREATE DATABASE jobconnect_db;
CREATE USER jobconnect_user WITH PASSWORD 'jobconnect_password';
ALTER ROLE jobconnect_user WITH CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE jobconnect_db TO jobconnect_user;
```

Apply schema:
```bash
psql jobconnect_db -U jobconnect_user < src/main/resources/db/migration/V1__initial_schema.sql
```

### 3. Install Dependencies
```bash
mvn clean install
```

### 4. Configure Application
Edit `src/main/resources/application.yaml`:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/jobconnect_db
    username: jobconnect_user
    password: jobconnect_password

app:
  jwt:
    secret: "your-secret-key-min-32-chars-minimum-for-security"
```

### 5. Run Application
```bash
mvn spring-boot:run
```

Server will start at: `http://localhost:8080`

## Project Structure

```
src/main/java/com/jobconnect/
├── config/              # Spring configurations
├── controller/          # REST controllers
├── dto/                 # Data transfer objects
├── entity/              # JPA entities
├── exception/           # Exception handling
├── mapper/              # Entity-DTO mappers
├── repository/          # Data access layer
├── security/            # JWT and security
├── service/             # Business logic
└── util/                # Utility classes
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout
- `POST /api/v1/auth/refresh-token` - Refresh JWT token

## Database Entities

- User (base user table)
- CandidateProfile
- RecruiterProfile
- Company
- Job
- JobCategory
- Skill
- CandidateSkill
- JobSkill
- Application
- Resume
- SavedJob
- InterviewSchedule
- Notification
- AuditLog

## Testing

Run all tests:
```bash
mvn test
```

## Build & Deploy

### Docker Build
```bash
docker build -t jobconnect-backend:1.0 .
docker run -p 8080:8080 jobconnect-backend:1.0
```

### Production Build
```bash
mvn clean package -DskipTests -Pprod
```

## API Documentation

Access Swagger UI: `http://localhost:8080/api/v1/swagger-ui.html`

## Troubleshooting

### Port Already in Use
```bash
# Change port in application.yaml
server:
  port: 8081
```

### Database Connection Failed
- Verify PostgreSQL is running
- Check credentials in application.yaml
- Ensure database exists

## Contributing

1. Create feature branch: `git checkout -b feature/new-feature`
2. Commit changes: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/new-feature`
4. Create Pull Request

## Support

For issues and questions, please create an issue on GitHub.
