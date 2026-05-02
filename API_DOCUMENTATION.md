# API Endpoints Documentation - Recruiter Features

## 🔐 Authentication
All recruiter endpoints require:
- Valid JWT token in Authorization header
- RECRUITER role

```
Authorization: Bearer <your-jwt-token>
```

## 📋 Job Endpoints

### 1. Get Jobs by Recruiter
**Endpoint**: `GET /api/v1/jobs/recruiter/{recruiterId}`

**Description**: Fetch all jobs posted by a specific recruiter

**Authorization**: Required (RECRUITER role)

**Parameters**:
- `recruiterId` (path) - ID of the recruiter
- `page` (query, optional) - Page number (default: 0)
- `size` (query, optional) - Page size (default: 20)

**Request Example**:
```http
GET /api/v1/jobs/recruiter/123?page=0&size=10
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response Example**:
```json
{
  "content": [
    {
      "id": 1,
      "title": "Senior Full Stack Developer",
      "description": "We are looking for...",
      "requirements": "5+ years experience...",
      "location": "San Francisco, CA",
      "jobType": "FULL_TIME",
      "experienceLevel": "SENIOR",
      "salaryMin": 120000,
      "salaryMax": 180000,
      "status": "OPEN",
      "viewCount": 150,
      "applicationCount": 25,
      "company": {
        "id": 1,
        "name": "Tech Innovations Inc"
      },
      "postedBy": {
        "id": 123,
        "firstName": "John",
        "lastName": "Doe"
      },
      "createdAt": "2024-01-15T10:30:00",
      "updatedAt": "2024-01-15T10:30:00"
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 10
  },
  "totalElements": 15,
  "totalPages": 2
}
```

### 2. Create Job
**Endpoint**: `POST /api/v1/jobs`

**Description**: Create a new job posting

**Authorization**: Required (RECRUITER role)

**Request Body**:
```json
{
  "title": "Senior Full Stack Developer",
  "description": "We are looking for an experienced developer...",
  "requirements": "5+ years experience\nReact and Node.js\nMySQL",
  "location": "San Francisco, CA",
  "city": "San Francisco",
  "country": "USA",
  "jobType": "FULL_TIME",
  "experienceLevel": "SENIOR",
  "salaryMin": 120000,
  "salaryMax": 180000,
  "currency": "USD",
  "applicationDeadline": "2024-12-31",
  "isRemote": false,
  "company": {
    "id": 1
  },
  "postedBy": {
    "id": 123
  }
}
```

**Response**: Created job object (201 Created)

### 3. Update Job
**Endpoint**: `PUT /api/v1/jobs/{id}`

**Description**: Update an existing job

**Authorization**: Required (RECRUITER role)

**Parameters**:
- `id` (path) - Job ID

**Request Body**: Same as Create Job

**Response**: Updated job object (200 OK)

### 4. Delete Job
**Endpoint**: `DELETE /api/v1/jobs/{id}`

**Description**: Delete a job posting

**Authorization**: Required (RECRUITER or ADMIN role)

**Parameters**:
- `id` (path) - Job ID

**Response**: 204 No Content

### 5. Get Job by ID
**Endpoint**: `GET /api/v1/jobs/{id}`

**Description**: Get detailed information about a specific job

**Authorization**: Not required

**Parameters**:
- `id` (path) - Job ID

**Response**: Job object

### 6. Search Jobs
**Endpoint**: `GET /api/v1/jobs/search`

**Description**: Search jobs with filters

**Authorization**: Not required

**Query Parameters**:
- `keyword` (optional) - Search in title and description
- `location` (optional) - Filter by location
- `jobType` (optional) - FULL_TIME, PART_TIME, CONTRACT, INTERN, REMOTE
- `experienceLevel` (optional) - ENTRY, MID, SENIOR
- `minSalary` (optional) - Minimum salary
- `isRemote` (optional) - true/false
- `page` (optional) - Page number
- `size` (optional) - Page size

**Request Example**:
```http
GET /api/v1/jobs/search?keyword=developer&location=San Francisco&jobType=FULL_TIME&page=0&size=20
```

## 📨 Application Endpoints

### 1. Get Applications by Recruiter
**Endpoint**: `GET /api/v1/applications/recruiter/{recruiterId}`

**Description**: Fetch all applications for jobs posted by a recruiter

**Authorization**: Required (RECRUITER role)

**Parameters**:
- `recruiterId` (path) - ID of the recruiter
- `page` (query, optional) - Page number
- `size` (query, optional) - Page size

**Request Example**:
```http
GET /api/v1/applications/recruiter/123?page=0&size=50
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response Example**:
```json
{
  "content": [
    {
      "id": 1,
      "applicationStatus": "PENDING",
      "coverLetter": "I am very interested...",
      "appliedAt": "2024-01-20T14:30:00",
      "job": {
        "id": 1,
        "title": "Senior Full Stack Developer"
      },
      "candidate": {
        "id": 456,
        "user": {
          "id": 789,
          "firstName": "Jane",
          "lastName": "Smith",
          "email": "jane@example.com"
        },
        "headline": "Full Stack Developer",
        "experienceLevel": "SENIOR"
      }
    }
  ],
  "totalElements": 25,
  "totalPages": 1
}
```

### 2. Get Applications by Job
**Endpoint**: `GET /api/v1/applications/job/{jobId}`

**Description**: Fetch all applications for a specific job

**Authorization**: Required (RECRUITER role)

**Parameters**:
- `jobId` (path) - ID of the job
- `page` (query, optional) - Page number
- `size` (query, optional) - Page size

**Request Example**:
```http
GET /api/v1/applications/job/1?page=0&size=20
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Update Application Status
**Endpoint**: `PATCH /api/v1/applications/{id}/status`

**Description**: Update the status of an application

**Authorization**: Required (RECRUITER role)

**Parameters**:
- `id` (path) - Application ID
- `status` (query) - New status

**Status Values**:
- `PENDING` - Initial status
- `REVIEWED` - Application has been reviewed
- `SHORTLISTED` - Candidate shortlisted
- `INTERVIEWED` - Interview conducted
- `OFFERED` - Job offer made
- `REJECTED` - Application rejected

**Request Example**:
```http
PATCH /api/v1/applications/1/status?status=SHORTLISTED
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response**: Updated application object

### 4. Get Application by ID
**Endpoint**: `GET /api/v1/applications/{id}`

**Description**: Get detailed information about a specific application

**Authorization**: Required

**Parameters**:
- `id` (path) - Application ID

**Response**: Application object

### 5. Get All Applications (Admin)
**Endpoint**: `GET /api/v1/applications`

**Description**: Get all applications (admin only)

**Authorization**: Required (ADMIN role)

**Parameters**:
- `page` (query, optional) - Page number
- `size` (query, optional) - Page size

## 🏢 Company Endpoints

### 1. Get All Companies
**Endpoint**: `GET /api/v1/companies`

**Description**: Fetch all companies

**Authorization**: Not required

**Parameters**:
- `page` (query, optional) - Page number
- `size` (query, optional) - Page size

**Response**: Paginated list of companies

### 2. Get Company by ID
**Endpoint**: `GET /api/v1/companies/{id}`

**Description**: Get detailed information about a company

**Authorization**: Not required

**Parameters**:
- `id` (path) - Company ID

### 3. Create Company
**Endpoint**: `POST /api/v1/companies`

**Description**: Create a new company profile

**Authorization**: Required (RECRUITER role)

**Request Body**:
```json
{
  "name": "Tech Innovations Inc",
  "description": "Leading technology company...",
  "industry": "Technology",
  "companySize": "100-500",
  "website": "https://techinnovations.com",
  "location": "San Francisco, CA"
}
```

### 4. Update Company
**Endpoint**: `PUT /api/v1/companies/{id}`

**Description**: Update company information

**Authorization**: Required (RECRUITER role)

**Parameters**:
- `id` (path) - Company ID

**Request Body**: Same as Create Company

## 🔑 Authentication Endpoints

### 1. Login
**Endpoint**: `POST /api/v1/auth/login`

**Description**: Authenticate user and get JWT token

**Request Body**:
```json
{
  "email": "recruiter@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "expiresIn": 900000,
  "user": {
    "id": 123,
    "email": "recruiter@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "RECRUITER"
  }
}
```

### 2. Register
**Endpoint**: `POST /api/v1/auth/register`

**Description**: Register a new user

**Request Body**:
```json
{
  "email": "newrecruiter@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "RECRUITER"
}
```

## 📊 Response Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 204 | No Content (successful deletion) |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (invalid/missing token) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 500 | Internal Server Error |

## 🔍 Error Response Format

```json
{
  "timestamp": "2024-01-20T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/v1/jobs"
}
```

## 💡 Usage Tips

### 1. Pagination
Always use pagination for large datasets:
```
?page=0&size=20
```

### 2. Sorting
Add sort parameter (if supported):
```
?sort=createdAt,desc
```

### 3. Token Refresh
When access token expires (401), use refresh token to get new access token

### 4. Error Handling
Always check response status and handle errors appropriately

## 🧪 Testing with cURL

### Get Jobs by Recruiter
```bash
curl -X GET "http://localhost:8080/api/v1/jobs/recruiter/123?page=0&size=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Create Job
```bash
curl -X POST "http://localhost:8080/api/v1/jobs" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Senior Developer",
    "description": "Job description",
    "location": "San Francisco",
    "jobType": "FULL_TIME",
    "experienceLevel": "SENIOR",
    "salaryMin": 100000,
    "salaryMax": 150000,
    "company": {"id": 1},
    "postedBy": {"id": 123}
  }'
```

### Update Application Status
```bash
curl -X PATCH "http://localhost:8080/api/v1/applications/1/status?status=SHORTLISTED" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📱 Frontend Integration

### Using Axios (Recommended)

```javascript
import apiClient from './apiClient'

// Get recruiter's jobs
const getRecruiterJobs = async (recruiterId) => {
  const response = await apiClient.get(`/jobs/recruiter/${recruiterId}`, {
    params: { page: 0, size: 100 }
  })
  return response.data
}

// Create job
const createJob = async (jobData) => {
  const response = await apiClient.post('/jobs', jobData)
  return response.data
}

// Update application status
const updateStatus = async (applicationId, status) => {
  const response = await apiClient.patch(
    `/applications/${applicationId}/status`,
    null,
    { params: { status } }
  )
  return response.data
}
```

## 🔒 Security Notes

1. **Never expose JWT tokens** in client-side code
2. **Store tokens securely** in httpOnly cookies or localStorage
3. **Validate all inputs** on both frontend and backend
4. **Use HTTPS** in production
5. **Implement rate limiting** to prevent abuse
6. **Log all sensitive operations** for audit trail

## 📚 Additional Resources

- [Spring Boot Security Documentation](https://spring.io/projects/spring-security)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [REST API Design Guidelines](https://restfulapi.net/)

---

**Last Updated**: January 2024
**API Version**: v1
**Base URL**: `http://localhost:8080/api/v1`
