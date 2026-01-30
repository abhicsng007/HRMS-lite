async function loadEmployees() {
  try {
    showLoading();
    state.employees = await getEmployees();
    renderEmployeeList();
    renderEmployeeDropdown();
  } catch (e) {
    showError("employeeError", e);
  } finally {
    hideLoading();
  }
}

async function deleteEmployeeHandler(employeeId) {
  if (!confirm("Are you sure you want to delete this employee?")) return;

  try {
    showLoading();
    await removeEmployee(employeeId); // from api.js
    showSuccess("employeeDeleted", "Employee deleted successfully");
    loadEmployees();
  } catch (err) {
    showError("employeeError", err);
  } finally {
    hideLoading();
  }
}


document.getElementById("addEmployeeBtn").onclick = async () => {
  const empIdInput = document.getElementById("empId");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const deptInput = document.getElementById("dept");

  const data = {
    id: empIdInput.value.trim(),
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    department: deptInput.value.trim(),
  };

  // 🛡 Frontend validations
  if (!data.id || !data.name || !data.email || !data.department) {
    showError("employeeError", "All fields are required.");
    return;
  }

  if (!isValidEmail(data.email)) {
    showError("employeeError", "Please enter a valid email address.");
    return;
  }

  clearError("employeeError");

    try {
    showLoading();
    await createEmployee(data);
    showSuccess("employeeSuccess", "Employee added successfully");
    empIdInput.value = "";
    nameInput.value = "";
    emailInput.value = "";
    deptInput.value = "";
    loadEmployees();
    } catch (err) {
    showError("employeeError", err);
    } finally {
    hideLoading();
    }

};

document.getElementById("markAttendanceBtn").onclick = async () => {
  const empId = document.getElementById("attendanceEmployee").value;
  const date = document.getElementById("attendanceDate").value;
  const status = document.getElementById("attendanceStatus").value;

  if (!empId) {
    alert("Please select an employee.");
    return;
  }

  if (!date) {
    alert("Please select a date.");
    return;
  }

  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate > today) {
    alert("Attendance cannot be marked for future dates.");
    return;
  }

  if (!status) {
    alert("Please select attendance status.");
    return;
  }

  await markAttendance({ employee_id: empId, date, status });

  state.attendance = await getAttendance(empId);
  renderAttendanceList();
};


document.getElementById("attendanceEmployee").onchange = async () => {
  const empId = attendanceEmployee.value;
  state.attendance = await getAttendance(empId);
  renderAttendanceList();
};

document.getElementById("viewAttendanceBtn").onclick = async () => {
  const empId = document.getElementById("attendanceEmployee").value;

  if (!empId) {
    alert("Please select an employee.");
    return;
  }
  showLoading();
  state.attendance = await getAttendance(empId);
  renderAttendanceList();
  hideLoading();
};


loadEmployees();
