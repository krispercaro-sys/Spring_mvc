const API_URL = "http://localhost:8080/api/students";
const API_AUTH = "http://localhost:8080/api/auth";

/**
 * Creates a student through the student REST API.
 *
 * @param {Object} studentData - Student values to submit.
 * @returns {Promise<void>} Resolves after the request completes.
 */
async function createStudent(studentData) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(studentData)
        });

        if (response.ok) {
            alert("Student added successfully!");
            await getAllStudents();
            resetForm();
        } else {
            alert("Error adding student.");
        }
    } catch (error) {
        console.error("Error creating student:", error);
    }
}

/**
 * Handles submission of the student form.
 *
 * @param {SubmitEvent} e - Form submission event.
 * @returns {void}
 */
document.getElementById("studentForm").addEventListener(
    "submit",
    function (e) {
    e.preventDefault();

    // Stop submission if validation fails
    if (!validateStudentForm()) {
        return;
    }

    const id = document.getElementById("studentId").value;
    const studentData = {
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        email: document.getElementById("email").value.trim(),
    };

    if (id) {
        updateStudent(id, studentData);
    } else {
        createStudent(studentData);
    }
    }
);

/**
 * Resets the student form and submit button state.
 *
 * @returns {void}
 */
function resetForm() {
    document.getElementById("studentId").value = "";
    document.getElementById("studentForm").reset();
    clearValidationStyles();

    const submitBtn = document.getElementById("submitBtn");
    submitBtn.textContent = "Add Student";
    submitBtn.style.backgroundColor = "#28a745";
}

/**
 * Loads all students and renders them in the table.
 *
 * @returns {Promise<void>} Resolves after rendering completes.
 */
async function getAllStudents() {
    try {
        const response = await fetch(API_URL, {
            method: "GET",
            credentials: "include"
        });
        if (!response.ok) throw new Error("Network response was not ok");

        const students = await response.json();
        const tableBody = document.getElementById("studentTableBody");
        tableBody.innerHTML = "";

        students.forEach(student => {
            const row = `
                <tr>
                    <td>${student.id}</td>
                    <td>${student.firstName}</td>
                    <td>${student.lastName}</td>
                    <td>${student.email}</td>
                    <td>
                        <button class="btn-edit"
                        onClick="initializeStudentFormById(${student.id})"
                        >Edit</button>
                        <button class="btn-delete"
                        onClick="deleteStudent(${student.id})">
                        Delete</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Error fetching students:", error);
        alert("Failed to fetch. Is your Spring Boot backend running?");
    }
}

document.addEventListener("DOMContentLoaded", getAllStudents);

/**
 * Loads a student and populates the edit form.
 *
 * @param {number|string} id - Student identifier.
 * @returns {Promise<void>} Resolves after the form is populated.
 */
async function initializeStudentFormById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "GET",
            credentials: "include"
        });
        if (!response.ok) {
            throw new Error("Could not fetch student details");
        }

        const student = await response.json();

        document.getElementById("studentId").value = student.id;
        document.getElementById("firstName").value = student.firstName;
        document.getElementById("lastName").value = student.lastName;
        document.getElementById("email").value = student.email;

        const submitBtn = document.getElementById("submitBtn");
        submitBtn.textContent = "Update";
        submitBtn.style.background = "#007bff";

        clearValidationStyles();
    } catch (error) {
        console.error("Error fetching student details:", error);
    }
}

/**
 * Updates an existing student through the REST API.
 *
 * @param {number|string} id - Student identifier.
 * @param {Object} studentData - Updated student values.
 * @returns {Promise<void>} Resolves after the request completes.
 */
async function updateStudent(id, studentData) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(studentData)
        });

        if (response.ok) {
            alert("Student updated successfully!");
            resetForm();
            await getAllStudents();
        } else {
            alert("Error updating student.");
        }
    } catch (error) {
        console.error("Error updating student", error);
    }
}

/**
 * Deletes a student through the REST API.
 *
 * @param {number|string} id - Student identifier.
 * @returns {Promise<void>} Resolves after the request completes.
 */
async function deleteStudent(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            credentials: "include"
        });

        if (response.ok) {
            const message = await response.text();
            alert(message);
            await getAllStudents();
        } else {
            alert("Error Deleting student.");
        }
    } catch (error) {
        console.error("Error deleting student:", error);
    }
}

/**
 * Authenticates a user using a session.
 *
 * @param {Object} loginDto - Authentication credentials.
 * @returns {Promise<void>} Resolves after login completes.
 */
async function loginUser(loginDto) {
    try {
        const response = await fetch(`${API_AUTH}/auth_login_session`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(loginDto)
        });

        if (response.ok) {
            alert("Login successful!");
            await getAllStudents();
        } else {
            alert("Invalid login credentials.");
        }
    } catch (error) {
        console.error("Login error:", error);
    }
}

/**
 * Logs out the current user and clears browser credentials.
 *
 * @returns {Promise<void>} Resolves after logout completes.
 */
async function logoutUser() {
    try {
        await fetch(`${API_AUTH}/logout`, {
            method: "POST",
            credentials: "include"
        });
        document.getElementById("studentTableBody").innerHTML = "";
        resetForm();
        alert("Logged out successfully!");

        try {
            await fetch(API_URL, {
                method: "GET",
                headers: {
                    "Authorized":
                        "Basic " +
                        btoa("invalid_user:wrong_password")
                }
            });
        } catch (err) {
            console.log("Browser credential cache cleared.");
        }
        window.location.reload();
    } catch (e) {
        console.error("Logout transmission crash", e);
    }
}