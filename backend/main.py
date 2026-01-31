import os
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models, schemas, crud
from database import engine, SessionLocal
from dotenv import load_dotenv

load_dotenv()


models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="HRMS Lite")

FRONTEND_URL = os.getenv("FRONTEND_URL")
PORT = int(os.getenv("PORT", 8080))

origins = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "https://hrms-lite-eight.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins= origins ,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/api/employees", status_code=201)
def add_employee(employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    try:
        return crud.create_employee(db, employee)
    except:
        raise HTTPException(status_code=409, detail="Employee already exists")

@app.get("/api/employees")
def list_employees(db: Session = Depends(get_db)):
    return crud.get_employees(db)

@app.delete("/api/employees/{emp_id}")
def remove_employee(emp_id: str, db: Session = Depends(get_db)):
    emp = crud.delete_employee(db, emp_id)
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    return {"message": "Employee deleted"}

@app.post("/api/attendance", status_code=201)
def mark_attendance(att: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    return crud.mark_attendance(db, att)

@app.get("/api/attendance/{emp_id}")
def get_attendance(emp_id: str, db: Session = Depends(get_db)):
    return crud.get_attendance(db, emp_id)
