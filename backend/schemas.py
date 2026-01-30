from pydantic import BaseModel, EmailStr

class EmployeeCreate(BaseModel):
    id: str
    name: str
    email: EmailStr
    department: str

class AttendanceCreate(BaseModel):
    employee_id: str
    date: str
    status: str
