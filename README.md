# A-TECH — Premium Technology & Digital Solutions

Phase 1 production-oriented homepage using:

- React + Vite + JavaScript
- React Router
- Axios
- Framer Motion
- Java 21 + Spring Boot
- Spring Web + Spring Data JPA + Hibernate + Jakarta Validation
- MySQL

## Architecture

```text
React / Vite
    ↓
Axios
    ↓
Spring Boot REST API
    ↓
Service Layer
    ↓
JPA / Hibernate
    ↓
MySQL
```

## 1. Prerequisites

Install:

- Node.js 20+
- Java 21+
- Maven 3.9+
- MySQL 8+

## 2. Database

Open MySQL Workbench and run `database.sql`.

It creates:

```sql
atech_db
```

The `inquiries` table is created/updated by JPA on application startup.

## 3. Backend configuration

Copy:

```text
backend/.env.example
```

Set these environment variables in your terminal/IDE:

```text
DB_URL=jdbc:mysql://localhost:3306/atech_db?useSSL=false&serverTimezone=UTC
DB_USERNAME=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
```

PowerShell example:

```powershell
$env:DB_URL="jdbc:mysql://localhost:3306/atech_db?useSSL=false&serverTimezone=UTC"
$env:DB_USERNAME="root"
$env:DB_PASSWORD="your_password"
```

Start backend:

```powershell
cd backend
mvn spring-boot:run
```

API:

```text
POST http://localhost:8080/api/inquiries
```

## 4. Frontend configuration

Copy:

```text
frontend/.env.example
```

to:

```text
frontend/.env
```

Default:

```text
VITE_API_BASE_URL=http://localhost:8080
```

Install and run:

```powershell
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally:

```text
http://localhost:5173
```

## 5. Windows quick start

After Node.js, Java, Maven and MySQL are installed:

1. Run `database.sql` in MySQL Workbench.
2. Configure the backend environment variables.
3. Run `run-backend.bat`.
4. Run `run-frontend.bat`.
5. Open `http://localhost:5173`.

## 6. Inquiry flow

The requirement selector can select multiple services. Clicking **Discuss My Requirement** scrolls to the lead form and carries the selected services into it.

The form validates:

- Name
- Indian phone number
- Email
- At least one service
- Budget
- Timeline
- Message

Submission flow:

```text
LeadForm.jsx
  → inquiryService.js
  → POST /api/inquiries
  → InquiryController
  → InquiryService
  → InquiryRepository
  → MySQL
```

## 7. Backend response

Success:

```json
{
  "success": true,
  "message": "Project inquiry submitted successfully."
}
```

HTTP status: `201 Created`

Validation/server failures return safe JSON messages without exposing stack traces or database details.

## 8. Project structure

```text
a-tech/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── public/
├── backend/
│   ├── src/main/java/com/atech/backend/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── entity/
│   │   ├── exception/
│   │   ├── repository/
│   │   └── service/
│   └── pom.xml
├── database.sql
├── run-frontend.bat
├── run-backend.bat
└── README.md
```

## 9. Phase 1 scope

Only the homepage is implemented. Navigation scrolls to homepage sections. No admin dashboard, authentication, CRM dashboard or separate About/Services/Projects pages are included.

Concept projects are explicitly labelled as `CONCEPT PROJECT`; they are not presented as real A-Tech clients.

## 10. Production checklist

Before deployment:

- Replace placeholder contact details.
- Set production database credentials through secrets/environment variables.
- Restrict CORS to the real frontend origin.
- Use HTTPS.
- Set `spring.jpa.hibernate.ddl-auto=validate` or an explicit migration strategy.
- Add database migrations such as Flyway/Liquibase.
- Configure production logging and monitoring.
- Add rate limiting and abuse protection to the public inquiry endpoint.
- Replace concept project visuals with verified A-Tech work when available.
