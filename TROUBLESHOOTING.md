# JobConnect - Troubleshooting Guide

## Quick Fix Steps

### Step 1: Create Database
```bash
# Open PostgreSQL command line (psql)
psql -U postgres

# Create database
CREATE DATABASE jobconnect_db;

# Exit
\q
```

### Step 2: Update Backend Configuration
The `application.yaml` is already configured with:
- Database: `jobconnect_db`
- Username: `postgres`
- Password: `postgres`
- Auto table creation: `ddl-auto: update`

**If your PostgreSQL has a different password:**
Edit `jobconnect-backend/src/main/resources/application.yaml`:
```yaml
datasource:
  username: postgres
  password: YOUR_POSTGRES_PASSWORD
```

### Step 3: Start Backend
```bash
cd jobconnect-backend
mvn clean install
mvn spring-boot:run
```

**Expected Output:**
```
Started JobConnectApplication in X.XXX seconds
```

### Step 4: Start Frontend
```bash
cd jobconnect-frontend
npm install
npm run dev
```

**Expected Output:**
```
VITE v4.x.x  ready in XXX ms
Local: http://localhost:5173/
```

---

## Common Backend Errors

### Error 1: "Cannot connect to database"
**Symptoms:**
```
Connection refused: connect
```

**Solutions:**
1. Check if PostgreSQL is running:
   ```bash
   # Windows
   services.msc
   # Look for "postgresql" service
   
   # Or check with:
   psql -U postgres
   ```

2. Verify database exists:
   ```bash
   psql -U postgres
   \l
   # Should see jobconnect_db in the list
   ```

3. Create database if missing:
   ```bash
   psql -U postgres
   CREATE DATABASE jobconnect_db;
   ```

### Error 2: "Authentication failed for user"
**Symptoms:**
```
FATAL: password authentication failed for user "postgres"
```

**Solution:**
Update `application.yaml` with correct password:
```yaml
spring:
  datasource:
    username: postgres
    password: YOUR_ACTUAL_PASSWORD
```

### Error 3: "Port 8080 already in use"
**Symptoms:**
```
Web server failed to start. Port 8080 was already in use.
```

**Solutions:**
1. Kill process using port 8080:
   ```bash
   # Windows
   netstat -ano | findstr :8080
   taskkill /PID <PID> /F
   ```

2. Or change port in `application.yaml`:
   ```yaml
   server:
     port: 8081
   ```

### Error 4: "Table doesn't exist"
**Symptoms:**
```
ERROR: relation "users" does not exist
```

**Solution:**
Change `ddl-auto` to create tables:
```yaml
spring:
  jpa:
    hibernate:
      ddl-auto: update  # or create-drop for fresh start
```

### Error 5: "JWT secret too short"
**Symptoms:**
```
The specified key byte array is X bits which is not secure enough
```

**Solution:**
Already fixed in `application.yaml` with a 256-bit key. If you still see this, ensure the secret is at least 32 characters.

### Error 6: Maven build fails
**Symptoms:**
```
Failed to execute goal
```

**Solutions:**
1. Clean and rebuild:
   ```bash
   mvn clean install -U
   ```

2. Delete `.m2` cache if needed:
   ```bash
   # Windows
   rmdir /s %USERPROFILE%\.m2\repository
   ```

---

## Common Frontend Errors

### Error 1: "Cannot find module"
**Symptoms:**
```
Error: Cannot find module 'react'
```

**Solution:**
```bash
cd jobconnect-frontend
rm -rf node_modules package-lock.json
npm install
```

### Error 2: "Network Error" when calling API
**Symptoms:**
```
AxiosError: Network Error
```

**Solutions:**
1. Verify backend is running:
   ```bash
   curl http://localhost:8080/api/v1/jobs
   ```

2. Check CORS configuration in `WebConfig.java` (already configured)

3. Verify API URL in frontend:
   - Check `.env` file or
   - Default is `http://localhost:8080/api/v1`

### Error 3: "401 Unauthorized"
**Symptoms:**
```
Request failed with status code 401
```

**Solutions:**
1. Login first to get token
2. Token might be expired - login again
3. Check if token is being sent in headers (already configured in `apiClient.js`)

### Error 4: Port 5173 already in use
**Solution:**
Vite will automatically use next available port, or:
```bash
# Kill process
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

---

## Testing the Application

### 1. Test Backend Health
```bash
# Should return 200 OK
curl http://localhost:8080/actuator/health
```

### 2. Test Registration
```bash
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User",
    "role": "CANDIDATE"
  }'
```

**Expected Response:**
```json
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "tokenType": "Bearer",
  "expiresIn": 900000
}
```

### 3. Test Login
```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 4. Test Get Jobs (Public)
```bash
curl http://localhost:8080/api/v1/jobs
```

### 5. Test Frontend
1. Open browser: http://localhost:5173
2. Click "Register"
3. Fill form and submit
4. Should redirect to jobs page

---

## Database Issues

### Reset Database
```bash
# Connect to PostgreSQL
psql -U postgres

# Drop and recreate
DROP DATABASE jobconnect_db;
CREATE DATABASE jobconnect_db;
\q
```

### View Tables
```bash
psql -U postgres -d jobconnect_db
\dt
```

### Check Data
```bash
psql -U postgres -d jobconnect_db
SELECT * FROM users;
SELECT * FROM jobs;
```

---

## Environment-Specific Issues

### Windows-Specific

1. **PostgreSQL not in PATH:**
   Add to PATH: `C:\Program Files\PostgreSQL\15\bin`

2. **Maven not found:**
   Download from https://maven.apache.org/download.cgi
   Add to PATH

3. **Node not found:**
   Download from https://nodejs.org/
   Restart terminal after install

### Linux/Mac-Specific

1. **Permission denied:**
   ```bash
   sudo chmod +x mvnw
   ./mvnw spring-boot:run
   ```

2. **PostgreSQL not running:**
   ```bash
   sudo service postgresql start
   # or
   brew services start postgresql
   ```

---

## Verification Checklist

Before reporting issues, verify:

- [ ] PostgreSQL is running
- [ ] Database `jobconnect_db` exists
- [ ] Backend starts without errors
- [ ] Backend accessible at http://localhost:8080
- [ ] Frontend starts without errors
- [ ] Frontend accessible at http://localhost:5173
- [ ] Can register a new user
- [ ] Can login with registered user
- [ ] Can view jobs page

---

## Getting Help

### Check Logs

**Backend logs:**
Look for errors in console output when running `mvn spring-boot:run`

**Frontend logs:**
1. Browser console (F12)
2. Network tab to see API calls
3. Terminal where `npm run dev` is running

### Common Log Patterns

**Success:**
```
Started JobConnectApplication in 5.123 seconds
```

**Database Connection Success:**
```
HikariPool-1 - Start completed.
```

**Table Creation:**
```
Hibernate: create table users (...)
```

---

## Quick Commands Reference

### Backend
```bash
# Clean build
mvn clean install

# Run
mvn spring-boot:run

# Skip tests
mvn spring-boot:run -DskipTests

# Check if running
curl http://localhost:8080/actuator/health
```

### Frontend
```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Database
```bash
# Connect
psql -U postgres

# List databases
\l

# Connect to database
\c jobconnect_db

# List tables
\dt

# Describe table
\d users

# Query
SELECT * FROM users;

# Exit
\q
```

---

## Still Having Issues?

1. **Check all prerequisites are installed:**
   - Java 17+: `java -version`
   - Maven: `mvn -version`
   - Node.js 18+: `node -version`
   - PostgreSQL 14+: `psql --version`

2. **Try Docker instead:**
   ```bash
   docker-compose up -d
   ```

3. **Check firewall/antivirus:**
   - Allow ports 8080, 5173, 5432

4. **Review configuration files:**
   - `application.yaml` for backend
   - `.env` for frontend (if exists)

---

**Last Updated:** December 2024
