# HRMS Lite – Employee & Attendance Management System

A lightweight, web-based HRMS (Human Resource Management System) built using **Vanilla JavaScript**, **CSS**, and **Python (FastAPI)**.  
The application simulates a basic internal HR tool for managing employees and tracking daily attendance with a clean, production-ready UI.

---

## ✨ Features

### 👨‍💼 Employee Management
- Add a new employee
- View all employees in a structured format
- Delete an employee
- Server & client-side validation
- Duplicate employee prevention

### 🕒 Attendance Management
- Mark daily attendance (Present / Absent)
- View attendance records per employee
- Filter attendance by employee

### 📊 UI & UX
- Clean and professional layout
- Loading states during API calls
- Empty states when no data is available
- Error and success messages
- Fully usable, not just a demo

---

## 🛠 Tech Stack

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript (No frameworks)

### Backend
- Python
- FastAPI
- SQLAlchemy
- SQLite (persistent storage)

---

## 📁 Project Structure

hrms-lite/
│
├── backend/
│ ├── main.py
│ ├── database.py
│ ├── models.py
│ ├── schemas.py
│ └── hrms.db
│
├── frontend/
│ ├── index.html
│ ├── styles.css
│ ├── app.js
│ ├── api.js
│ └── ui.js
│
└── README.md


---

## ⚙️ Setup Instructions

### 1️⃣ Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate     # Windows: venv\Scripts\activate
pip install fastapi uvicorn sqlalchemy pydantic
uvicorn main:app --reload
Backend will start at:

http://127.0.0.1:8000
2️⃣ Frontend Setup
cd frontend
Open index.html directly in your browser
(or use Live Server extension in VS Code).

🔌 API Endpoints
Employees
Method	Endpoint	Description
GET	/employees	Get all employees
POST	/employees	Add new employee
DELETE	/employees/{id}	Delete employee
Attendance
Method	Endpoint	Description
POST	/attendance	Mark attendance
GET	/attendance/{employee_id}	View attendance
🚦 Validation & Error Handling
Required field checks

Email format validation

Duplicate employee prevention

Meaningful HTTP status codes

User-friendly UI messages

🎯 Scope Limitations
Single admin user (no authentication)

No payroll or leave management

No advanced HR workflows

💡 Future Improvements
Dashboard summary

Attendance date filters

Pagination for employee list

Authentication & roles

📄 License
This project is for learning and demonstration purposes.