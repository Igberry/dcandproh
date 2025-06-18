document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    // Add click event listener to the hamburger
    hamburger.addEventListener("click", () => {
        // Toggle the 'open' class on the nav-links
        navLinks.classList.toggle("open");

        // Toggle the 'active' class on the hamburger for animation
        hamburger.classList.toggle("active");
    });
});


// Function to get the current year
function getCurrentYear() {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;
}

// Function to get the last modified date
function getLastModifiedDate() {
    const lastModifiedDate = document.lastModified;
    document.getElementById('lastModified').textContent = `Last Modified: ${lastModifiedDate}`;
}

// Call functions when the page loads
window.onload = function () {
    getCurrentYear();
    getLastModifiedDate();
};

document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
    });

    const result = await response.json();
    const feedback = document.getElementById('formFeedback');
    feedback.textContent = result.message;
    feedback.style.color = response.ok ? 'green' : 'red';

    if (response.ok) {
        document.getElementById('contactForm').reset();
    }
});