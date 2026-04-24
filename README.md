# ERP System

A role-based ERP built with:

- `frontend`: React + Vite
- `backend`: Node.js + Express + MongoDB 

This is a role-based ERP with separate admin, staff, and student areas.

MongoDB stores the main working data for:

- users
- fee records
- attendance records
- grade records
- circulars
- support tickets
- timetable entries

## Roles

### Admin

- manage students
- manage staff
- generate fee records
- publish circulars
- view ERP reports
- manage support desk tickets

### Staff

- mark attendance
- publish grades
- view student directory
- view teaching timetable
- read notices
- work on student support tickets

### Student

- view attendance
- view grades
- view timetable
- pay fees
- raise support tickets
- read campus circulars


## Backend Features

- role-aware login for `student`, `staff`, and `admin`
- Mongo-backed ERP records using Mongoose models
- automatic seeding on startup
- support ticket workflow shared between admin and staff
- fallback memory mode if `MONGO_URI` is not provided

## Frontend Features

- role-based dashboards
- module visibility based on logged-in role
- working forms for:
  - add student
  - add staff
  - generate fee
  - publish circular
  - mark attendance
  - publish grade
  - raise support ticket
  - update support ticket status, assignment, and resolution

## MongoDB Models

The backend now stores ERP data using these models:

- `User`
- `FeeRecord`
- `AttendanceRecord`
- `GradeRecord`
- `Circular`
- `SupportTicket`
- `TimetableEntry`


## Current Scope

Current limitations:

- authentication uses plain stored passwords and should be upgraded to hashing and token/session auth for production
- operational ERP collections are seeded with sample data on first run
- there is no audit dashboard, file upload flow, or payment gateway integration yet
- student, staff, and admin permissions are app-level and not yet fine-grained by department
