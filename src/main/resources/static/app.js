/**
 * Student Registration Logic
 * Handles form submission to the Spring Boot backend.
 */

document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentRegistrationForm');
    const studentsTableBody = document.getElementById('studentsTableBody');
    const statusMessage = document.getElementById('statusMessage');
    const submitBtn = document.getElementById('submitBtn');

    /**
     * Fetch and render students list
     */
    const fetchStudents = async () => {
        try {
            const response = await fetch('http://localhost:8080/students');
            if (!response.ok) throw new Error('Failed to fetch student directory');
            
            const students = await response.json();
            renderStudents(students);
        } catch (error) {
            console.error('Fetch Students Error:', error);
            studentsTableBody.innerHTML = '<tr><td colspan="5" class="empty-state error">Could not load students.</td></tr>';
        }
    };

    /**
     * Delete student by ID
     * @param {number} id 
     */
    const deleteStudent = async (id) => {
        if (!confirm(`Are you sure you want to remove student #${id}?`)) return;

        try {
            // Updated to use simple query param for now, matching common controller patterns
            const response = await fetch(`http://localhost:8080/deleteStudents?id=${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                showMessage('Student removed successfully.', 'success');
                await fetchStudents();
            } else {
                showMessage('Delete failed. Check server logs.', 'error');
            }
        } catch (error) {
            console.error('Delete Error:', error);
            showMessage('Connection error. Could not delete student.', 'error');
        }
    };

    /**
     * Render students into the table
     * @param {Array} students 
     */
    const renderStudents = (students) => {
        if (!students || students.length === 0) {
            studentsTableBody.innerHTML = '<tr><td colspan="5" class="empty-state">No students registered yet.</td></tr>';
            return;
        }

        studentsTableBody.innerHTML = students.map(student => `
            <tr>
                <td>#${student.id}</td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.course}</td>
                <td>
                    <button class="delete-btn" data-id="${student.id}">Remove</button>
                </td>
            </tr>
        `).join('');

        // Attach event listeners to delete buttons
        studentsTableBody.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                deleteStudent(id);
            });
        });
    };

    /**
     * Display status messages to the user
     * @param {string} message - The message to show
     * @param {string} type - 'success' or 'error'
     */
    const showMessage = (message, type) => {
        statusMessage.textContent = message;
        statusMessage.className = `status-message visible ${type}`;
        
        // Hide message after 5 seconds if it's a success
        if (type === 'success') {
            setTimeout(() => {
                statusMessage.classList.remove('visible');
            }, 5000);
        }
    };

    /**
     * Handle form submission
     */
    studentForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Basic validation check
        if (!studentForm.checkValidity()) {
            showMessage('Please fill in all required fields accurately.', 'error');
            return;
        }

        // Disable button during request
        submitBtn.disabled = true;
        submitBtn.textContent = 'Registering...';
        
        // Prepare student data
        const formData = new FormData(studentForm);
        const studentData = {
            name: formData.get('name'),
            email: formData.get('email'),
            course: formData.get('course')
        };

        try {
            const response = await fetch('http://localhost:8080/saveStudents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(studentData)
            });

            if (response.ok) {
                showMessage('Student registered successfully.', 'success');
                studentForm.reset();
                // Refresh the table
                await fetchStudents();
            } else {
                showMessage('Registration failed. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Fetch Error:', error);
            showMessage('Connection error. Is the server running?', 'error');
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Register Student';
        }
    });

    // Initial fetch on load
    fetchStudents();

    // Optional: Add focus styling to inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            statusMessage.classList.remove('visible');
        });
    });
});
