# JobConnect API Documentation

## Base URL
```
http://localhost:8080/api/v1
```

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer {access_token}
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "CANDIDATE"
}
```

**Roles:** `CANDIDATE`, `RECRUITER`, `ADMIN`

**Response:** `200 OK`
```json
{
  "accessToken": "eyJhbGciOiJIUzUxMiJ9...",
  "refreshToken": "eyJhbGciOiJIUzUxMiJ9...",
  "tokenType": "Bearer",
  "expiresIn": 3600
}
```

### Login
**POST** `/auth/login`

Authenticate user and receive tokens.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "accessToken": "eyJhbGciOiJIUzUxMiJ9...",
  "refreshToken": "eyJhbGciOiJIUzUxMiJ9...",
  "tokenType": "Bearer",
  "expiresIn": 3600
}
```

### Refresh Token
**POST** `/auth/refresh?refreshToken={token}`

Get a new access token using refresh token.

**Response:** `200 OK`
```json
{
  "accessToken": "eyJhbGciOiJIUzUxMiJ9...",
  "refreshToken": "eyJhbGciOiJIUzUxMiJ9...",
  "tokenType": "Bearer",
  "expiresIn": 3600
}
```

---

## Job Endpoints

### Get All Jobs
**GET** `/jobs?page=0&size=10&sort=createdAt,desc`

Get paginated list of all jobs.

**Query Parameters:**
- `page` (optional): Page number (default: 0)
- `size` (optional): Page size (default: 20)
- `sort` (optional): Sort field and direction

**Response:** `200 OK`
```json
{
  "content": [
    {
      "id": 1,
      "title": "Senior Java Developer",
      "description": "We are looking for...",
      "requirements": "5+ years experience...",
      "location": "New York, NY",
      "city": "New York",
      "country": "USA",
      "jobType": "FULL_TIME",
      "experienceLevel": "SENIOR",
      "salaryMin": 100000,
      "salaryMax": 150000,
      "currency": "USD",
      "applicationDeadline": "2024-12-31",
      "isRemote": false,
      "status": "OPEN",
      "viewCount": 150,
      "applicationCount": 25,
      "isFeatured": false,
      "createdAt": "2024-01-01T10:00:00",
      "updatedAt": "2024-01-01T10:00:00"
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 10
  },
  "totalPages": 5,
  "totalElements": 50,
  "last": false,
  "first": true
}
```

### Get Job by ID
**GET** `/jobs/{id}`

Get detailed information about a specific job.

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Senior Java Developer",
  "description": "We are looking for...",
  "requirements": "5+ years experience...",
  "location": "New York, NY",
  "jobType": "FULL_TIME",
  "experienceLevel": "SENIOR",
  "salaryMin": 100000,
  "salaryMax": 150000,
  "currency": "USD",
  "status": "OPEN"
}
```

### Get Jobs by Company
**GET** `/jobs/company/{companyId}?page=0&size=10`

Get all jobs posted by a specific company.

**Response:** `200 OK` (Paginated response)

### Get Jobs by Status
**GET** `/jobs/status/{status}?page=0&size=10`

Get jobs filtered by status.

**Status Values:** `OPEN`, `CLOSED`, `ARCHIVED`

**Response:** `200 OK` (Paginated response)

### Create Job
**POST** `/jobs`

**Auth Required:** RECRUITER

Create a new job posting.

**Request Body:**
```json
{
  "companyId": 1,
  "title": "Senior Java Developer",
  "description": "We are looking for an experienced Java developer...",
  "requirements": "5+ years of Java experience, Spring Boot, Microservices",
  "location": "New York, NY",
  "city": "New York",
  "country": "USA",
  "jobType": "FULL_TIME",
  "experienceLevel": "SENIOR",
  "salaryMin": 100000,
  "salaryMax": 150000,
  "currency": "USD",
  "applicationDeadline": "2024-12-31",
  "isRemote": false
}
```

**Response:** `201 Created`

### Update Job
**PUT** `/jobs/{id}`

**Auth Required:** RECRUITER

Update an existing job posting.

**Request Body:** Same as Create Job

**Response:** `200 OK`

### Delete Job
**DELETE** `/jobs/{id}`

**Auth Required:** RECRUITER or ADMIN

Delete a job posting.

**Response:** `204 No Content`

---

## Application Endpoints

### Get All Applications
**GET** `/applications?page=0&size=10`

**Auth Required:** ADMIN

Get all applications in the system.

**Response:** `200 OK` (Paginated response)

### Get Application by ID
**GET** `/applications/{id}`

**Auth Required:** Authenticated

Get details of a specific application.

**Response:** `200 OK`
```json
{
  "id": 1,
  "jobId": 1,
  "candidateId": 1,
  "coverLetter": "I am very interested...",
  "applicationStatus": "APPLIED",
  "rating": null,
  "reviewNotes": null,
  "interviewScheduledDate": null,
  "interviewNotes": null,
  "rejectedReason": null,
  "createdAt": "2024-01-01T10:00:00"
}
```

### Get Applications by Job
**GET** `/applications/job/{jobId}?page=0&size=10`

**Auth Required:** RECRUITER

Get all applications for a specific job.

**Response:** `200 OK` (Paginated response)

### Get Applications by Candidate
**GET** `/applications/candidate/{candidateId}?page=0&size=10`

**Auth Required:** CANDIDATE

Get all applications submitted by a candidate.

**Response:** `200 OK` (Paginated response)

### Get Applications by Status
**GET** `/applications/status/{status}?page=0&size=10`

**Auth Required:** Authenticated

Get applications filtered by status.

**Status Values:** `APPLIED`, `REVIEWING`, `INTERVIEW`, `OFFERED`, `ACCEPTED`, `REJECTED`, `WITHDRAWN`

**Response:** `200 OK` (Paginated response)

### Submit Application
**POST** `/applications`

**Auth Required:** CANDIDATE

Submit a job application.

**Request Body:**
```json
{
  "jobId": 1,
  "candidateId": 1,
  "coverLetter": "I am very interested in this position because..."
}
```

**Response:** `201 Created`

### Update Application Status
**PATCH** `/applications/{id}/status?status=INTERVIEW`

**Auth Required:** RECRUITER

Update the status of an application.

**Query Parameters:**
- `status`: New status value

**Response:** `200 OK`

### Delete Application
**DELETE** `/applications/{id}`

**Auth Required:** CANDIDATE or ADMIN

Delete an application.

**Response:** `204 No Content`

---

## User Endpoints

### Get User by ID
**GET** `/users/{id}`

**Auth Required:** ADMIN or Owner

Get user details.

**Response:** `200 OK`
```json
{
  "id": 1,
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "CANDIDATE",
  "accountStatus": "ACTIVE",
  "createdAt": "2024-01-01T10:00:00"
}
```

### Get User by Email
**GET** `/users/email/{email}`

**Auth Required:** ADMIN

Get user by email address.

**Response:** `200 OK`

### Get Users by Role
**GET** `/users/role/{role}`

**Auth Required:** ADMIN

Get all users with a specific role.

**Response:** `200 OK`

### Update User
**PUT** `/users/{id}`

**Auth Required:** ADMIN or Owner

Update user information.

**Response:** `200 OK`

### Delete User
**DELETE** `/users/{id}`

**Auth Required:** ADMIN

Delete a user account.

**Response:** `204 No Content`

---

## Company Endpoints

### Get All Companies
**GET** `/companies?page=0&size=10`

Get paginated list of companies.

**Response:** `200 OK` (Paginated response)

### Get Company by ID
**GET** `/companies/{id}`

Get company details.

**Response:** `200 OK`

### Create Company
**POST** `/companies`

**Auth Required:** RECRUITER or ADMIN

Create a new company profile.

**Response:** `201 Created`

### Update Company
**PUT** `/companies/{id}`

**Auth Required:** RECRUITER or ADMIN

Update company information.

**Response:** `200 OK`

### Delete Company
**DELETE** `/companies/{id}`

**Auth Required:** ADMIN

Delete a company.

**Response:** `204 No Content`

---

## Candidate Profile Endpoints

### Get Profile by ID
**GET** `/candidates/{id}`

Get candidate profile details.

**Response:** `200 OK`

### Get Profile by User ID
**GET** `/candidates/user/{userId}`

Get candidate profile by user ID.

**Response:** `200 OK`

### Create Profile
**POST** `/candidates`

**Auth Required:** CANDIDATE

Create candidate profile.

**Response:** `201 Created`

### Update Profile
**PUT** `/candidates/{id}`

**Auth Required:** CANDIDATE

Update candidate profile.

**Response:** `200 OK`

### Delete Profile
**DELETE** `/candidates/{id}`

**Auth Required:** CANDIDATE or ADMIN

Delete candidate profile.

**Response:** `204 No Content`

---

## Error Responses

### 400 Bad Request
```json
{
  "timestamp": "2024-01-01T10:00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/v1/auth/register"
}
```

### 401 Unauthorized
```json
{
  "timestamp": "2024-01-01T10:00:00",
  "status": 401,
  "error": "Unauthorized",
  "message": "Invalid credentials",
  "path": "/api/v1/auth/login"
}
```

### 403 Forbidden
```json
{
  "timestamp": "2024-01-01T10:00:00",
  "status": 403,
  "error": "Forbidden",
  "message": "Access denied",
  "path": "/api/v1/jobs"
}
```

### 404 Not Found
```json
{
  "timestamp": "2024-01-01T10:00:00",
  "status": 404,
  "error": "Not Found",
  "message": "Job not found with id: 999",
  "path": "/api/v1/jobs/999"
}
```

---

## Rate Limiting

Currently no rate limiting is implemented. Consider adding rate limiting in production.

## Versioning

API version is included in the URL: `/api/v1/`

## CORS

CORS is configured to allow requests from the frontend application.

---

**Last Updated:** December 2024
