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

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload on form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // You can add form validation here
    if (name && email && message) {
        // Simulating a form submission and response
        document.getElementById('formFeedback').textContent = 'Thank you, ' + name + '! Your message has been sent.';
        document.getElementById('contactForm').reset(); // Reset form fields
    } else {
        document.getElementById('formFeedback').textContent = 'Please fill out all fields.';
    }
});
