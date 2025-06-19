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

document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const responseMessage = document.createElement("div");
    contactForm.appendChild(responseMessage);

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all fields.");
            return;
        }

        responseMessage.textContent = "Sending...";
        responseMessage.style.color = "blue";

        try {
            const res = await fetch("http://localhost:3000/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            const data = await res.json();

            if (res.ok) {
                responseMessage.textContent = data.message || "Message sent successfully!";
                responseMessage.style.color = "green";
                contactForm.reset();
            } else {
                responseMessage.textContent = data.message || "Something went wrong.";
                responseMessage.style.color = "red";
            }
        } catch (err) {
            console.error("Fetch error:", err);
            responseMessage.textContent = "Failed to send. Please try again later.";
            responseMessage.style.color = "red";
        }
    });
});
