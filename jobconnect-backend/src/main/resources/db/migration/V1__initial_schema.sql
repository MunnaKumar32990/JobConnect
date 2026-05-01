-- ================================================================
-- JobConnect Database Schema - PostgreSQL 15+
-- Complete relational database design for job portal system
-- ================================================================

-- Create ENUM types
CREATE TYPE user_role AS ENUM ('CANDIDATE', 'RECRUITER', 'ADMIN');
CREATE TYPE account_status AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');
CREATE TYPE experience_level AS ENUM ('ENTRY', 'MID', 'SENIOR');
CREATE TYPE job_type AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN');
CREATE TYPE company_size AS ENUM ('STARTUP', 'SMALL', 'MEDIUM', 'LARGE', 'ENTERPRISE');
CREATE TYPE application_status AS ENUM ('APPLIED', 'SHORTLISTED', 'INTERVIEW', 'REJECTED', 'WITHDRAWN', 'HIRED');
CREATE TYPE proficiency_level AS ENUM ('BEGINNER', 'INTERMEDIATE', 'EXPERT');
CREATE TYPE skill_category AS ENUM ('PROGRAMMING', 'FRAMEWORK', 'TOOL', 'LANGUAGE', 'SOFT_SKILL');
CREATE TYPE interview_type AS ENUM ('PHONE', 'VIDEO', 'IN_PERSON');
CREATE TYPE notification_type AS ENUM ('APPLICATION_RECEIVED', 'STATUS_CHANGED', 'INTERVIEW_SCHEDULED', 'JOB_POSTED', 'PROFILE_VIEWED');

-- ================================================================
-- TABLE: users
-- Core user table for all system users
-- ================================================================
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role user_role NOT NULL,
    account_status account_status DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chk_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_users_account_status ON users(account_status);

-- ================================================================
-- TABLE: candidate_profiles
-- Candidate-specific profile information
-- ================================================================
CREATE TABLE candidate_profiles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    headline VARCHAR(255),
    about_me TEXT,
    phone_number VARCHAR(20),
    location VARCHAR(255),
    city VARCHAR(100),
    country VARCHAR(100),
    experience_level experience_level,
    total_years_experience INT DEFAULT 0 CHECK (total_years_experience >= 0),
    date_of_birth DATE,
    profile_photo_url VARCHAR(500),
    is_open_to_work BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_candidate_profiles_location ON candidate_profiles(location);
CREATE INDEX idx_candidate_profiles_experience_level ON candidate_profiles(experience_level);
CREATE INDEX idx_candidate_profiles_is_open_to_work ON candidate_profiles(is_open_to_work);

-- ================================================================
-- TABLE: companies
-- Company information for recruiters
-- ================================================================
CREATE TABLE companies (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    industry VARCHAR(100),
    company_size company_size,
    website VARCHAR(500),
    location VARCHAR(255),
    city VARCHAR(100),
    country VARCHAR(100),
    description TEXT,
    logo_url VARCHAR(500),
    founded_year INT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_companies_name ON companies(name);
CREATE INDEX idx_companies_industry ON companies(industry);
CREATE INDEX idx_companies_is_active ON companies(is_active);

-- ================================================================
-- TABLE: recruiter_profiles
-- Recruiter-specific profile information
-- ================================================================
CREATE TABLE recruiter_profiles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company_id BIGINT REFERENCES companies(id) ON DELETE SET NULL,
    position VARCHAR(100),
    phone_number VARCHAR(20),
    is_verified BOOLEAN DEFAULT false,
    verification_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_recruiter_profiles_company_id ON recruiter_profiles(company_id);
CREATE INDEX idx_recruiter_profiles_is_verified ON recruiter_profiles(is_verified);

-- ================================================================
-- TABLE: job_categories
-- Job categories for organization and filtering
-- ================================================================
CREATE TABLE job_categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_job_categories_name ON job_categories(name);

-- ================================================================
-- TABLE: skills
-- Master list of all available skills
-- ================================================================
CREATE TABLE skills (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    category skill_category,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_skills_name ON skills(name);
CREATE INDEX idx_skills_category ON skills(category);

-- ================================================================
-- TABLE: candidate_skills
-- Skills associated with candidates
-- ================================================================
CREATE TABLE candidate_skills (
    id BIGSERIAL PRIMARY KEY,
    candidate_id BIGINT NOT NULL REFERENCES candidate_profiles(id) ON DELETE CASCADE,
    skill_id BIGINT NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    proficiency_level proficiency_level,
    years_of_experience INT,
    is_endorsement_visible BOOLEAN DEFAULT true,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(candidate_id, skill_id)
);

CREATE INDEX idx_candidate_skills_candidate_id ON candidate_skills(candidate_id);
CREATE INDEX idx_candidate_skills_skill_id ON candidate_skills(skill_id);
CREATE INDEX idx_candidate_skills_proficiency ON candidate_skills(proficiency_level);

-- ================================================================
-- TABLE: jobs
-- Job postings by recruiters
-- ================================================================
CREATE TABLE jobs (
    id BIGSERIAL PRIMARY KEY,
    company_id BIGINT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    posted_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255),
    city VARCHAR(100),
    country VARCHAR(100),
    job_type job_type,
    experience_level experience_level,
    salary_min DECIMAL(12, 2),
    salary_max DECIMAL(12, 2),
    currency VARCHAR(10) DEFAULT 'USD',
    application_deadline DATE,
    is_remote BOOLEAN DEFAULT false,
    status VARCHAR(50) DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'CLOSED', 'ARCHIVED')),
    view_count INT DEFAULT 0,
    application_count INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_jobs_company_id ON jobs(company_id);
CREATE INDEX idx_jobs_posted_by ON jobs(posted_by);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_location ON jobs(location);
CREATE INDEX idx_jobs_job_type ON jobs(job_type);
CREATE INDEX idx_jobs_experience_level ON jobs(experience_level);
CREATE INDEX idx_jobs_created_at ON jobs(created_at);
CREATE INDEX idx_jobs_salary_range ON jobs(salary_min, salary_max);

-- ================================================================
-- TABLE: job_skills
-- Required skills for jobs (many-to-many relationship)
-- ================================================================
CREATE TABLE job_skills (
    id BIGSERIAL PRIMARY KEY,
    job_id BIGINT NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    skill_id BIGINT NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    is_required BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(job_id, skill_id)
);

CREATE INDEX idx_job_skills_job_id ON job_skills(job_id);
CREATE INDEX idx_job_skills_skill_id ON job_skills(skill_id);

-- ================================================================
-- TABLE: applications
-- Job applications from candidates
-- ================================================================
CREATE TABLE applications (
    id BIGSERIAL PRIMARY KEY,
    job_id BIGINT NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    candidate_id BIGINT NOT NULL REFERENCES candidate_profiles(id) ON DELETE CASCADE,
    applied_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    cover_letter TEXT,
    application_status application_status DEFAULT 'APPLIED',
    rating INT CHECK (rating >= 1 AND rating <= 5),
    review_notes TEXT,
    interview_scheduled_date DATE,
    interview_notes TEXT,
    rejected_reason VARCHAR(255),
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE(job_id, candidate_id)
);

CREATE INDEX idx_applications_job_id ON applications(job_id);
CREATE INDEX idx_applications_candidate_id ON applications(candidate_id);
CREATE INDEX idx_applications_status ON applications(application_status);
CREATE INDEX idx_applications_applied_at ON applications(applied_at);
CREATE INDEX idx_applications_applied_by ON applications(applied_by);

-- ================================================================
-- TABLE: resumes
-- Resume files uploaded by candidates
-- ================================================================
CREATE TABLE resumes (
    id BIGSERIAL PRIMARY KEY,
    candidate_id BIGINT NOT NULL REFERENCES candidate_profiles(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size_kb INT,
    file_format VARCHAR(10) CHECK (file_format IN ('PDF', 'DOCX')),
    is_primary BOOLEAN DEFAULT false,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_resumes_candidate_id ON resumes(candidate_id);
CREATE INDEX idx_resumes_is_primary ON resumes(is_primary);

-- ================================================================
-- TABLE: saved_jobs
-- Jobs bookmarked/saved by candidates
-- ================================================================
CREATE TABLE saved_jobs (
    id BIGSERIAL PRIMARY KEY,
    candidate_id BIGINT NOT NULL REFERENCES candidate_profiles(id) ON DELETE CASCADE,
    job_id BIGINT NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(candidate_id, job_id)
);

CREATE INDEX idx_saved_jobs_candidate_id ON saved_jobs(candidate_id);
CREATE INDEX idx_saved_jobs_job_id ON saved_jobs(job_id);
CREATE INDEX idx_saved_jobs_saved_at ON saved_jobs(saved_at);

-- ================================================================
-- TABLE: interview_schedules
-- Interview scheduling information
-- ================================================================
CREATE TABLE interview_schedules (
    id BIGSERIAL PRIMARY KEY,
    application_id BIGINT NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    interview_date TIMESTAMP NOT NULL,
    duration_minutes INT DEFAULT 60,
    interview_type interview_type,
    interviewer_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    meeting_link VARCHAR(500),
    preparation_notes TEXT,
    feedback TEXT,
    is_completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_interview_schedules_application_id ON interview_schedules(application_id);
CREATE INDEX idx_interview_schedules_interview_date ON interview_schedules(interview_date);
CREATE INDEX idx_interview_schedules_is_completed ON interview_schedules(is_completed);

-- ================================================================
-- TABLE: notifications
-- In-app notifications for all users
-- ================================================================
CREATE TABLE notifications (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    notification_type notification_type,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    related_entity_id BIGINT,
    related_entity_type VARCHAR(50),
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_notification_type ON notifications(notification_type);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);

-- ================================================================
-- TABLE: audit_logs
-- Audit trail for compliance and security
-- ================================================================
CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100),
    entity_type VARCHAR(50),
    entity_id BIGINT,
    old_values JSONB,
    new_values JSONB,
    ip_address VARCHAR(45),
    user_agent VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity_type ON audit_logs(entity_type);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- ================================================================
-- Sample Data Insertion (Optional - for development)
-- ================================================================

-- Insert job categories
INSERT INTO job_categories (name, description) VALUES
    ('Software Development', 'Software development and engineering roles'),
    ('Data Science', 'Data analysis and machine learning roles'),
    ('Product Management', 'Product and project management roles'),
    ('Design', 'UI/UX and design roles'),
    ('Sales & Marketing', 'Sales and marketing roles'),
    ('DevOps & Infrastructure', 'DevOps and cloud infrastructure roles')
ON CONFLICT DO NOTHING;

-- Insert skills
INSERT INTO skills (name, category) VALUES
    ('Java', 'PROGRAMMING'),
    ('Python', 'PROGRAMMING'),
    ('JavaScript', 'PROGRAMMING'),
    ('TypeScript', 'PROGRAMMING'),
    ('Spring Boot', 'FRAMEWORK'),
    ('React', 'FRAMEWORK'),
    ('Angular', 'FRAMEWORK'),
    ('PostgreSQL', 'TOOL'),
    ('Docker', 'TOOL'),
    ('Kubernetes', 'TOOL'),
    ('AWS', 'TOOL'),
    ('Git', 'TOOL'),
    ('English', 'LANGUAGE'),
    ('Communication', 'SOFT_SKILL'),
    ('Problem Solving', 'SOFT_SKILL'),
    ('Leadership', 'SOFT_SKILL')
ON CONFLICT DO NOTHING;

-- ================================================================
-- End of Database Schema
-- ================================================================
