function renderEmployeeList() {
  const container = document.getElementById("employeeList");
  container.innerHTML = "";

  if (!state.employees.length) {
    container.innerHTML =
      `<p class="empty">No employees found.</p>`;
    return;
  }

  const table = document.createElement("table");

  table.innerHTML = `
    <thead>
      <tr>
        <th>Employee ID</th>
        <th>Full Name</th>
        <th>Email</th>
        <th>Department</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;

  const tbody = table.querySelector("tbody");

  state.employees.forEach(emp => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${emp.id}</td>
      <td>${emp.name}</td>
      <td>${emp.email}</td>
      <td>${emp.department}</td>
      <td class="actions">
        <button data-id="${emp.id}" >Delete</button>
      </td>
    `;

    tr.querySelector("button").onclick = async () => {
      await deleteEmployeeHandler(emp.id)
      loadEmployees();
    };

    tbody.appendChild(tr);
  });

  container.appendChild(table);
}

function renderEmployeeDropdown() {
  const select = document.getElementById("attendanceEmployee");
  select.innerHTML = "";

  state.employees.forEach(emp => {
    const opt = document.createElement("option");
    opt.value = emp.id;
    opt.textContent = emp.name;
    select.appendChild(opt);
  });
}

function renderAttendanceList() {
  const container = document.getElementById("attendanceList");
  container.innerHTML = "";

  if (!state.attendance.length) {
    container.innerHTML = `<p class="empty">No attendance records.</p>`;
    return;
  }

  state.attendance.forEach(a => {
    const div = document.createElement("div");
    div.className = "list-item";
    div.textContent = `${a.date} — ${a.status}`;
    container.appendChild(div);
  });
}

function renderAttendanceList() {
  const container = document.getElementById("attendanceList");
  container.innerHTML = "";

  if (!state.attendance.length) {
    container.innerHTML =
      `<p class="empty">No attendance records found.</p>`;
    return;
  }

  const table = document.createElement("table");
  table.innerHTML = `
    <thead>
      <tr>
        <th>Date</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;

  const tbody = table.querySelector("tbody");

  state.attendance.forEach(record => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${record.date}</td>
      <td class="${
        record.status === "Present"
          ? "status-present"
          : "status-absent"
      }">
        ${record.status}
      </td>
    `;
    tbody.appendChild(tr);
  });

  container.appendChild(table);
}
function showError(elementId, message) {
  document.getElementById(elementId).innerText = message;
}

function clearError(elementId) {
  document.getElementById(elementId).innerText = "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showLoading() {
  document.getElementById("loading").classList.remove("hidden");
}

function hideLoading() {
  document.getElementById("loading").classList.add("hidden");
}

function showSuccess(elementId, message) {
  const el = document.getElementById(elementId);
  el.textContent = message;
  el.classList.remove("hidden");

  setTimeout(() => {
    el.classList.add("hidden");
    el.textContent = "";
  }, 3000);
}
