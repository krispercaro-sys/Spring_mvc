/**
 * Validates all student form fields.
 *
 * @returns {boolean} Whether all form values are valid.
 */
function validateStudentForm() {
    let isValid = true;

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");

    const firstNameError = document.getElementById("firstNameError");
    const lastNameError = document.getElementById("lastNameError");
    const emailError = document.getElementById("emailError");

    // Clear previous error messages before re-validating
    clearValidationStyles();

    // First Name Validation
    if (firstName.value.trim() === "") {
        firstNameError.textContent = "First name is required.";
        firstName.classList.add("invalid");
        isValid = false;
    } else if (firstName.value.trim().length < 2) {
        firstNameError.textContent =
            "First name must be at least 2 characters long.";
        firstName.classList.add("invalid");
        isValid = false;
    }

    // Last Name Validation
    if (lastName.value.trim() === "") {
        lastNameError.textContent = "Last name is required.";
        lastName.classList.add("invalid");
        isValid = false;
    } else if (lastName.value.trim().length < 2) {
        lastNameError.textContent =
            "Last name must be at least 2 characters long.";
        lastName.classList.add("invalid");
        isValid = false;
    }

    // Email Validation
    const emailValue = email.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailValue === "") {
        emailError.textContent = "Email address is required.";
        email.classList.add("invalid");
        isValid = false;
    } else if (!emailRegex.test(emailValue)) {
        emailError.textContent =
            "Please enter a valid email address " +
            "(e.g., student@example.com).";
        email.classList.add("invalid");
        isValid = false;
    }

    return isValid;
}

/**
 * Removes validation styles and error messages from the form.
 *
 * @returns {void}
 */
function clearValidationStyles() {
    const fields = ["firstName", "lastName", "email"];
    fields.forEach(fieldId => {
        const element = document.getElementById(fieldId);
        const errorSpan = document.getElementById(`${fieldId}Error`);
        if (element) element.classList.remove("invalid");
        if (errorSpan) errorSpan.textContent = "";
    });
}

/**
 * Loads all students and renders them in the table.
 *
 * @returns {Promise<void>} Resolves after rendering completes.
 */
async function getAllStudents() {
    try {
        const response = await fetch(API_URL);
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
                        onclick="initializeStudentFormById(${student.id})">
                        Edit</button>
                        <button class="btn-delete"
                        onclick="deleteStudent(${student.id})">
                        Delete</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Error fetching students:", error);
        alert(
            "Failed to fetch students. " +
            "Is your Spring Boot backend running?"
        );
    }
}
