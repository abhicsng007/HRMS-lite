const API_BASE = "http://localhost:8000";

async function apiRequest(url, options = {}) {
  const res = await fetch(API_BASE + url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json();
    throw error.detail || "Something went wrong";
  }

  return res.json();
}

function getEmployees() {
  return apiRequest("/employees");
}

function createEmployee(data) {
  return apiRequest("/employees", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

function removeEmployee(id) {
  return apiRequest(`/employees/${id}`, { method: "DELETE" });
}

function markAttendance(data) {
  return apiRequest("/attendance", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

function getAttendance(empId) {
  return apiRequest(`/attendance/${empId}`);
}
