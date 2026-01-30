from database import SessionLocal
from models import Employee, Attendance

db = SessionLocal()

employees = [
    Employee(id="EMP001", name="Amit Sharma", email="amit.sharma@company.com", department="Engineering"),
    Employee(id="EMP002", name="Neha Verma", email="neha.verma@company.com", department="Human Resources"),
    Employee(id="EMP003", name="Rahul Mehta", email="rahul.mehta@company.com", department="Finance"),
    Employee(id="EMP004", name="Priya Singh", email="priya.singh@company.com", department="Marketing"),
    Employee(id="EMP005", name="Karan Patel", email="karan.patel@company.com", department="Sales"),
]

attendance = [
    Attendance(employee_id="EMP001", date="2026-01-01", status="Present"),
    Attendance(employee_id="EMP001", date="2026-01-02", status="Present"),
    Attendance(employee_id="EMP002", date="2026-01-01", status="Present"),
    Attendance(employee_id="EMP003", date="2026-01-02", status="Absent"),
]

db.add_all(employees)
db.add_all(attendance)
db.commit()
db.close()

print("Sample data inserted successfully.")
