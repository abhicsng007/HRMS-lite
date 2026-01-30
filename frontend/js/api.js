const API_BASE =
  window.location.hostname === "localhost"
    ? "http://127.0.0.1:8000"
    : window.API_BASE_URL;


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
