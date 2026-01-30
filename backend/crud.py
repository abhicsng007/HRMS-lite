from sqlalchemy.orm import Session
from models import Employee, Attendance

def create_employee(db: Session, employee):
    db_employee = Employee(**employee.dict())
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee

def get_employees(db: Session):
    return db.query(Employee).all()

def delete_employee(db: Session, emp_id: str):
    emp = db.query(Employee).filter(Employee.id == emp_id).first()
    if emp:
        db.delete(emp)
        db.commit()
    return emp

def mark_attendance(db: Session, attendance):
    record = Attendance(**attendance.dict())
    db.add(record)
    db.commit()
    return record

def get_attendance(db: Session, emp_id: str):
    return db.query(Attendance).filter(
        Attendance.employee_id == emp_id
    ).all()
