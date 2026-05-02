# 🚀 JobConnect - Full-Stack Job Portal Platform

<div align="center">

![JobConnect Logo](https://img.shields.io/badge/JobConnect-Job%20Portal-blue?style=for-the-badge)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.1.5-brightgreen?style=for-the-badge&logo=spring)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?style=for-the-badge&logo=mysql)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**A production-grade job portal connecting job seekers with employers**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [API Documentation](#-api-documentation) • [Screenshots](#-screenshots)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [User Roles](#-user-roles)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**JobConnect** is a comprehensive, full-stack job portal platform that bridges the gap between talented job seekers and forward-thinking employers. Built with modern technologies and best practices, it provides a seamless experience for candidates to find their dream jobs and recruiters to discover top talent.

### Key Highlights

✅ **Three Distinct User Roles** - Candidate, Recruiter, and Admin  
✅ **JWT-Based Authentication** - Secure and scalable  
✅ **Role-Based Access Control** - Fine-grained permissions  
✅ **Modern UI/UX** - Professional gradient design with Tailwind CSS  
✅ **RESTful API** - Clean and well-documented endpoints  
✅ **Responsive Design** - Works seamlessly on all devices  
✅ **Real-time Updates** - Dynamic application status tracking  

---

## ✨ Features

### 🎯 Core Features

#### For All Users
- 🔐 **Secure Authentication** - JWT-based login/registration
- 👤 **Profile Management** - Complete profile customization
- 🔔 **Notifications** - Real-time updates on activities
- 🔍 **Advanced Search** - Filter jobs by location, type, salary
- 📱 **Responsive Design** - Mobile-first approach

#### 👨‍💼 Candidate Features
- 📝 **Profile Creation** - Build comprehensive professional profiles
- 🎯 **Job Search & Filter** - Find jobs matching your skills
- 💼 **Application Tracking** - Monitor application status in real-time
- 📊 **Dashboard Analytics** - View application statistics
- ⭐ **Save Jobs** - Bookmark interesting opportunities
- 📄 **Resume Management** - Upload and manage resumes
- 🔔 **Job Alerts** - Get notified about matching jobs
- 📈 **Application History** - Track all past applications

**Candidate Dashboard Includes:**
- Total Applications Count
- Pending Applications
- Interviewed Applications
- Rejected Applications
- Quick Actions (Browse Jobs, Update Profile, Saved Jobs)
- Application List with Status Tracking

#### 🏢 Recruiter Features
- 📢 **Job Posting** - Create detailed job listings
- 👥 **Application Management** - Review and manage candidates
- 🏆 **Candidate Screening** - Filter and shortlist applicants
- 📊 **Recruitment Analytics** - Track hiring metrics
- 🏢 **Company Profile** - Showcase your organization
- 📧 **Candidate Communication** - Direct messaging
- 📈 **Job Performance Tracking** - Monitor job post effectiveness
- ⚙️ **Application Status Updates** - Manage candidate pipeline

**Recruiter Dashboard Includes:**
- Total Jobs Posted
- Active Jobs Count
- Total Applications Received
- Pending Reviews
- Quick Actions (Post Job, View Applications, Company Profile)
- Job Management with Edit/Delete Options

#### 👑 Admin Features
- 👥 **User Management** - Manage all platform users
- 📋 **Job Moderation** - Review and approve job postings
- 📊 **System Analytics** - Platform-wide statistics
- 🔧 **System Configuration** - Platform settings
- 📈 **Reports & Insights** - Detailed analytics
- 🚫 **Content Moderation** - Flag inappropriate content
- 🔐 **Role Management** - Assign and modify user roles
- 📧 **Bulk Operations** - Mass user/job management

**Admin Dashboard Includes:**
- Total Users (Candidates + Recruiters + Admins)
- Total Jobs Posted
- Total Applications
- Active Recruiters
- Active Candidates
- Pending Reviews
- Recent User Registrations
- Recent Job Postings
- Quick Actions (Manage Users, Manage Jobs, View Reports)

---

## 🛠 Tech Stack

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Java** | 17 | Programming Language |
| **Spring Boot** | 3.1.5 | Application Framework |
| **Spring Security** | 6.x | Authentication & Authorization |
| **Spring Data JPA** | 3.x | Data Access Layer |
| **MySQL** | 8.0+ | Relational Database |
| **JWT (JJWT)** | 0.12.3 | Token-based Authentication |
| **Lombok** | Latest | Boilerplate Code Reduction |
| **Maven** | 3.8+ | Build Tool |
| **Hibernate** | 6.x | ORM Framework |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2+ | UI Library |
| **Vite** | 4.x | Build Tool & Dev Server |
| **React Router** | 6.x | Client-side Routing |
| **Axios** | 1.x | HTTP Client |
| **Tailwind CSS** | 3.x | Utility-first CSS Framework |
| **JavaScript (ES6+)** | Latest | Programming Language |

### Development Tools

- **Git** - Version Control
- **Postman** - API Testing
- **VS Code** - Code Editor
- **IntelliJ IDEA** - Java IDE
- **MySQL Workbench** - Database Management

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   React UI   │  │ React Router │  │  Tailwind CSS│      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                    ┌───────▼───────┐
                    │  Axios HTTP   │
                    │    Client     │
                    └───────┬───────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│                      Backend Layer (REST API)                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Controllers  │  │   Services   │  │ Repositories │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ JWT Security │  │   Entities   │  │     DTOs     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                    ┌───────▼───────┐
                    │  Spring Data  │
                    │      JPA      │
                    └───────┬───────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│                      Database Layer                          │
│                      MySQL Database                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │  Users   │ │   Jobs   │ │Companies │ │Applications│     │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
└─────────────────────────────────────────────────────────────┘
```

---

## 👥 User Roles

### 1. 👤 CANDIDATE (Job Seeker)

**Access Level:** Basic User

**Capabilities:**
- ✅ Create and manage professional profile
- ✅ Search and browse job listings
- ✅ Apply to jobs with resume
- ✅ Track application status
- ✅ Save jobs for later
- ✅ Receive job recommendations
- ✅ Update skills and experience
- ✅ View application history

**Dashboard Features:**
- Application statistics (Total, Pending, Interviewed, Rejected)
- Recent applications with status
- Quick actions (Browse Jobs, Update Profile, Saved Jobs)
- Application timeline

**Restrictions:**
- ❌ Cannot post jobs
- ❌ Cannot view other candidates' profiles
- ❌ Cannot access admin features

---

### 2. 🏢 RECRUITER (Employer)

**Access Level:** Business User

**Capabilities:**
- ✅ Create and manage company profile
- ✅ Post job openings
- ✅ Review applications
- ✅ Shortlist candidates
- ✅ Update application status
- ✅ View candidate profiles
- ✅ Manage job postings (edit/delete)
- ✅ Track recruitment metrics

**Dashboard Features:**
- Job statistics (Total Jobs, Active, Applications, Pending Review)
- Job listings with application counts
- Quick actions (Post Job, View Applications, Company Profile)
- Application management interface

**Restrictions:**
- ❌ Cannot apply to jobs
- ❌ Cannot access admin features
- ❌ Cannot modify other companies' jobs

---

### 3. 👑 ADMIN (Platform Administrator)

**Access Level:** Full System Access

**Capabilities:**
- ✅ Manage all users (view, suspend, delete)
- ✅ Moderate job postings
- ✅ View system-wide analytics
- ✅ Configure platform settings
- ✅ Generate reports
- ✅ Handle disputes
- ✅ Manage content moderation
- ✅ Access all system features

**Dashboard Features:**
- System-wide statistics (Users, Jobs, Applications)
- User management interface
- Job moderation tools
- Analytics and reports
- Recent activity monitoring
- Quick actions (Manage Users, Manage Jobs, View Reports)

**Full Control:**
- ✅ Can perform any action on the platform
- ✅ Can override user permissions
- ✅ Can access all data

---

## 📦 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Java JDK 17+** - [Download](https://www.oracle.com/java/technologies/downloads/)
- **Node.js 16+** - [Download](https://nodejs.org/)
- **MySQL 8.0+** - [Download](https://dev.mysql.com/downloads/)
- **Maven 3.8+** - [Download](https://maven.apache.org/download.cgi)
- **Git** - [Download](https://git-scm.com/downloads)

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/jobconnect.git
cd jobconnect
```

### Step 2: Database Setup

1. **Create MySQL Database:**

```sql
CREATE DATABASE jobconnect_db;
```

2. **Configure Database Connection:**

Edit `jobconnect-backend/src/main/resources/application.yaml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/jobconnect_db?useSSL=false&serverTimezone=UTC
    username: your_mysql_username
    password: your_mysql_password
```

### Step 3: Backend Setup

```bash
cd jobconnect-backend

# Install dependencies
mvn clean install

# Run the application
mvn spring-boot:run
```

Backend will start on: `http://localhost:8080`

### Step 4: Frontend Setup

```bash
cd jobconnect-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will start on: `http://localhost:5174`

### Step 5: Access the Application

Open your browser and navigate to:
- **Frontend:** http://localhost:5174
- **Backend API:** http://localhost:8080

---

## ⚙️ Configuration

### Backend Configuration

**File:** `jobconnect-backend/src/main/resources/application.yaml`

```yaml
# Server Configuration
server:
  port: 8080

# Database Configuration
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/jobconnect_db
    username: root
    password: your_password
    driver-class-name: com.mysql.cj.jdbc.Driver
  
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQLDialect

# JWT Configuration
app:
  jwt:
    secret: your-512-bit-secret-key-here
    access-token-expiration: 900000      # 15 minutes
    refresh-token-expiration: 604800000  # 7 days

# CORS Configuration
  cors:
    allowed-origins: http://localhost:5174,http://localhost:3000
    allowed-methods: GET,POST,PUT,DELETE,OPTIONS,PATCH
```

### Frontend Configuration

**File:** `jobconnect-frontend/src/services/api/apiClient.js`

```javascript
const API_BASE_URL = 'http://localhost:8080/api/v1'
```

---

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/register` | Register new user | No |
| POST | `/api/v1/auth/login` | User login | No |
| POST | `/api/v1/auth/refresh` | Refresh access token | Yes |
| POST | `/api/v1/auth/logout` | User logout | Yes |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/users/{id}` | Get user by ID | Yes |
| PUT | `/api/v1/users/{id}` | Update user | Yes |
| DELETE | `/api/v1/users/{id}` | Delete user | Yes (Admin) |
| GET | `/api/v1/users` | Get all users | Yes (Admin) |

### Job Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/jobs` | Get all jobs | No |
| GET | `/api/v1/jobs/{id}` | Get job by ID | No |
| POST | `/api/v1/jobs` | Create job | Yes (Recruiter) |
| PUT | `/api/v1/jobs/{id}` | Update job | Yes (Recruiter) |
| DELETE | `/api/v1/jobs/{id}` | Delete job | Yes (Recruiter) |
| GET | `/api/v1/jobs/search` | Search jobs | No |

### Application Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/applications` | Apply to job | Yes (Candidate) |
| GET | `/api/v1/applications/{id}` | Get application | Yes |
| PUT | `/api/v1/applications/{id}/status` | Update status | Yes (Recruiter) |
| GET | `/api/v1/applications/candidate/{id}` | Get candidate apps | Yes |
| GET | `/api/v1/applications/job/{id}` | Get job applications | Yes (Recruiter) |

### Company Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/companies` | Get all companies | No |
| GET | `/api/v1/companies/{id}` | Get company by ID | No |
| POST | `/api/v1/companies` | Create company | Yes (Recruiter) |
| PUT | `/api/v1/companies/{id}` | Update company | Yes (Recruiter) |

### Candidate Profile Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/candidates/{id}` | Get profile | Yes |
| PUT | `/api/v1/candidates/{id}` | Update profile | Yes (Candidate) |
| POST | `/api/v1/candidates/{id}/resume` | Upload resume | Yes (Candidate) |

---

## 🗄 Database Schema

### Core Tables

#### users
```sql
- id (PK)
- email (UNIQUE)
- password
- first_name
- last_name
- role (CANDIDATE, RECRUITER, ADMIN)
- account_status (ACTIVE, SUSPENDED, INACTIVE)
- created_at
- updated_at
```

#### jobs
```sql
- id (PK)
- title
- description
- requirements
- responsibilities
- location
- job_type (FULL_TIME, PART_TIME, CONTRACT, REMOTE)
- experience_level
- salary_min
- salary_max
- company_id (FK)
- recruiter_id (FK)
- job_status (ACTIVE, CLOSED, DRAFT)
- created_at
- updated_at
```

#### applications
```sql
- id (PK)
- job_id (FK)
- candidate_id (FK)
- application_status (PENDING, REVIEWED, SHORTLISTED, INTERVIEWED, OFFERED, REJECTED)
- cover_letter
- resume_id (FK)
- applied_at
- updated_at
```

#### companies
```sql
- id (PK)
- name
- description
- industry
- company_size
- website
- location
- recruiter_id (FK)
- created_at
- updated_at
```

#### candidate_profiles
```sql
- id (PK)
- user_id (FK)
- headline
- summary
- experience_level
- expected_salary
- location
- phone
- created_at
- updated_at
```

---

## 📸 Screenshots

### Home Page
![Home Page](https://via.placeholder.com/800x400?text=Home+Page)

### Candidate Dashboard
![Candidate Dashboard](https://via.placeholder.com/800x400?text=Candidate+Dashboard)

### Recruiter Dashboard
![Recruiter Dashboard](https://via.placeholder.com/800x400?text=Recruiter+Dashboard)

### Admin Dashboard
![Admin Dashboard](https://via.placeholder.com/800x400?text=Admin+Dashboard)

### Job Listing
![Job Listing](https://via.placeholder.com/800x400?text=Job+Listing)

---

## 🚀 Deployment

### Backend Deployment (Heroku)

```bash
# Login to Heroku
heroku login

# Create app
heroku create jobconnect-backend

# Add MySQL addon
heroku addons:create jawsdb:kitefin

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd jobconnect-frontend
vercel --prod
```

---

## 🧪 Testing

### Backend Tests

```bash
cd jobconnect-backend
mvn test
```

### Frontend Tests

```bash
cd jobconnect-frontend
npm test
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Authors

- **Your Name** - *Initial work* - [GitHub Profile](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- Spring Boot Documentation
- React Documentation
- Tailwind CSS
- MySQL Community
- Open Source Community

---

## 📞 Support

For support, email support@jobconnect.com or join our Slack channel.

---

## 🔮 Future Enhancements

- [ ] Real-time chat between recruiters and candidates
- [ ] Video interview scheduling
- [ ] AI-powered job recommendations
- [ ] Resume parsing and skill extraction
- [ ] Email notifications
- [ ] Advanced analytics dashboard
- [ ] Mobile applications (iOS & Android)
- [ ] Integration with LinkedIn
- [ ] Salary insights and trends
- [ ] Company reviews and ratings

---

<div align="center">

**Made with ❤️ by JobConnect Team**

⭐ Star us on GitHub — it helps!

[Report Bug](https://github.com/yourusername/jobconnect/issues) • [Request Feature](https://github.com/yourusername/jobconnect/issues)

</div>
