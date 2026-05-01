# JobConnect - Deployment Checklist

## Pre-Deployment Checklist

### Backend Configuration
- [ ] Update JWT secret in production (min 256 bits)
- [ ] Configure production database credentials
- [ ] Set appropriate token expiration times
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS for production domain
- [ ] Set up logging configuration
- [ ] Configure connection pool settings
- [ ] Set up database backup strategy
- [ ] Review and update application.yaml for production

### Frontend Configuration
- [ ] Update API URL to production backend
- [ ] Remove debug/development flags
- [ ] Configure production build settings
- [ ] Set up CDN for static assets (optional)
- [ ] Configure analytics (if needed)
- [ ] Test responsive design on all devices
- [ ] Optimize images and assets
- [ ] Enable production mode

### Security
- [ ] Change all default passwords
- [ ] Set strong JWT secret
- [ ] Enable HTTPS
- [ ] Configure rate limiting
- [ ] Set up firewall rules
- [ ] Enable SQL injection protection
- [ ] Configure XSS protection
- [ ] Set up CSRF tokens
- [ ] Review and test authentication flow
- [ ] Implement password complexity rules

### Database
- [ ] Create production database
- [ ] Run database migrations
- [ ] Set up database backups
- [ ] Configure database connection pooling
- [ ] Create database indexes (already in entities)
- [ ] Set up monitoring
- [ ] Configure read replicas (if needed)
- [ ] Test database performance

### Docker Deployment
- [ ] Build Docker images
- [ ] Test Docker Compose locally
- [ ] Configure environment variables
- [ ] Set up volumes for data persistence
- [ ] Configure network settings
- [ ] Set up health checks
- [ ] Configure restart policies
- [ ] Test container orchestration

### Testing
- [ ] Test user registration flow
- [ ] Test login/logout functionality
- [ ] Test job posting (recruiter)
- [ ] Test job application (candidate)
- [ ] Test pagination on all list pages
- [ ] Test role-based access control
- [ ] Test token refresh mechanism
- [ ] Load test API endpoints
- [ ] Test error handling
- [ ] Cross-browser testing

### Monitoring & Logging
- [ ] Set up application monitoring
- [ ] Configure log aggregation
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Configure performance monitoring
- [ ] Set up uptime monitoring
- [ ] Create alerting rules
- [ ] Set up database monitoring
- [ ] Configure metrics collection

### Documentation
- [ ] Update API documentation
- [ ] Document deployment process
- [ ] Create runbook for common issues
- [ ] Document backup/restore procedures
- [ ] Create user guides
- [ ] Document environment variables
- [ ] Update README with production URLs

### Performance
- [ ] Enable caching where appropriate
- [ ] Optimize database queries
- [ ] Configure CDN (if needed)
- [ ] Enable gzip compression
- [ ] Optimize frontend bundle size
- [ ] Implement lazy loading
- [ ] Test page load times
- [ ] Configure connection pooling

## Deployment Steps

### 1. Prepare Environment
```bash
# Create production environment file
cp .env.example .env.production

# Update with production values
nano .env.production
```

### 2. Build Application
```bash
# Backend
cd jobconnect-backend
mvn clean package -DskipTests

# Frontend
cd jobconnect-frontend
npm run build
```

### 3. Deploy with Docker
```bash
# Build and start containers
docker-compose -f docker-compose.prod.yml up -d

# Check container status
docker-compose ps

# View logs
docker-compose logs -f
```

### 4. Database Setup
```bash
# Connect to database
docker exec -it jobconnect-db psql -U jobconnect

# Verify tables
\dt

# Check data
SELECT COUNT(*) FROM users;
```

### 5. Verify Deployment
```bash
# Test backend health
curl http://your-domain.com/api/v1/jobs

# Test frontend
curl http://your-domain.com

# Test authentication
curl -X POST http://your-domain.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

## Post-Deployment

### Immediate Actions
- [ ] Verify all services are running
- [ ] Test critical user flows
- [ ] Check logs for errors
- [ ] Verify database connections
- [ ] Test authentication
- [ ] Monitor resource usage
- [ ] Set up SSL certificate
- [ ] Configure domain DNS

### Within 24 Hours
- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Review user feedback
- [ ] Verify backup systems
- [ ] Test disaster recovery
- [ ] Update documentation
- [ ] Notify stakeholders

### Within 1 Week
- [ ] Analyze usage patterns
- [ ] Review security logs
- [ ] Optimize based on metrics
- [ ] Plan next iteration
- [ ] Gather user feedback
- [ ] Update roadmap

## Environment Variables

### Backend (.env)
```bash
# Database
SPRING_DATASOURCE_URL=jdbc:postgresql://db-host:5432/jobconnect_db
SPRING_DATASOURCE_USERNAME=jobconnect_user
SPRING_DATASOURCE_PASSWORD=strong_password_here

# JWT
JWT_SECRET=your-super-secret-jwt-key-min-256-bits
JWT_ACCESS_TOKEN_EXPIRATION=3600000
JWT_REFRESH_TOKEN_EXPIRATION=86400000

# Server
SERVER_PORT=8080
SPRING_PROFILES_ACTIVE=prod
```

### Frontend (.env)
```bash
VITE_API_URL=https://api.your-domain.com/api/v1
VITE_APP_NAME=JobConnect
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG=false
```

## Rollback Plan

### If Deployment Fails
1. Stop new containers
   ```bash
   docker-compose down
   ```

2. Restore previous version
   ```bash
   docker-compose -f docker-compose.backup.yml up -d
   ```

3. Restore database (if needed)
   ```bash
   psql jobconnect_db < backup.sql
   ```

4. Verify rollback
   ```bash
   curl http://your-domain.com/health
   ```

## Monitoring Endpoints

### Health Checks
- Backend: `http://your-domain.com/actuator/health`
- Frontend: `http://your-domain.com/`
- Database: Check connection from backend

### Metrics
- Application metrics: `/actuator/metrics`
- Database metrics: PostgreSQL monitoring
- Container metrics: `docker stats`

## Common Issues

### Backend Won't Start
- Check database connection
- Verify environment variables
- Check port availability
- Review application logs

### Frontend Can't Connect
- Verify API URL configuration
- Check CORS settings
- Verify backend is running
- Check network connectivity

### Database Connection Failed
- Verify credentials
- Check database is running
- Verify network connectivity
- Check connection pool settings

### Authentication Issues
- Verify JWT secret is set
- Check token expiration settings
- Verify user exists in database
- Check password encryption

## Support Contacts

- DevOps Team: devops@example.com
- Backend Team: backend@example.com
- Frontend Team: frontend@example.com
- Database Admin: dba@example.com

## Useful Commands

### Docker
```bash
# View logs
docker-compose logs -f [service]

# Restart service
docker-compose restart [service]

# Scale service
docker-compose up -d --scale backend=3

# Execute command in container
docker exec -it [container] bash
```

### Database
```bash
# Backup
docker exec jobconnect-db pg_dump -U jobconnect jobconnect_db > backup.sql

# Restore
docker exec -i jobconnect-db psql -U jobconnect jobconnect_db < backup.sql

# Connect
docker exec -it jobconnect-db psql -U jobconnect jobconnect_db
```

### Application
```bash
# Check backend health
curl http://localhost:8080/actuator/health

# Test authentication
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password"}'
```

## Success Criteria

Deployment is successful when:
- [ ] All services are running
- [ ] Users can register and login
- [ ] Jobs can be posted and viewed
- [ ] Applications can be submitted
- [ ] No critical errors in logs
- [ ] Response times are acceptable
- [ ] Database is accessible
- [ ] Backups are working

---

**Last Updated:** December 2024
**Version:** 1.0.0
