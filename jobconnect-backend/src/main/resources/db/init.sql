-- Create database if not exists
-- Run this with: psql -U postgres

-- Drop database if exists (for fresh start)
-- DROP DATABASE IF EXISTS jobconnect_db;

-- Create database
CREATE DATABASE jobconnect_db;

-- Connect to database
\c jobconnect_db;

-- Grant privileges (if using specific user)
-- CREATE USER jobconnect_user WITH PASSWORD 'jobconnect_password';
-- GRANT ALL PRIVILEGES ON DATABASE jobconnect_db TO jobconnect_user;

-- Tables will be auto-created by Hibernate with ddl-auto: update
