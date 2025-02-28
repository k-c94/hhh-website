document.addEventListener('DOMContentLoaded', function () {
    // Track Newsletter Form Submission and handle validation
    const newsletterForm = document.querySelector('.newsletter-container form');
    newsletterForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from reloading the page
        console.log("Form submission triggered"); // Log when form submission is triggered

        const email = newsletterForm.querySelector('input[type="email"]').value;
        console.log("Entered email:", email); // Log the entered email address

        // Simple email validation
        if (validateEmail(email)) {
            console.log("Email is valid."); // Log if email is valid

            // Track the Newsletter Signup with Facebook Pixel
            fbq('track', 'NewsLetter Sign Up');

            // Example using fetch to send email to Mailchimp or your server endpoint
            fetch('http://localhost:3000/send-email', {  // Replace with actual endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email })
            })
            .then(response => {
                console.log('Response from server:', response);  // Log the response from the server
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);  // Log the success response from the server
            })
            .catch((error) => {
                console.error('Error:', error);  // Log any errors in the fetch request
            });

            // Proceed with form submission after tracking
            console.log("Submitting the form to the server...");
            newsletterForm.submit(); // Submit the form after tracking
        } else {
            console.log("Invalid email address."); // Log if email is invalid
            alert('Please enter a valid email address.');
        }
    });

    // Simple email validation function
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    }

    // Track Purchase Event on "Buy Tickets" Button Click
    document.querySelectorAll('.btn-outline-light').forEach(button => {
        button.addEventListener('click', function () {
            console.log("Purchase Event Fired");
            fbq('track', 'Purchase', { value: '20.00', currency: 'USD' });
        });
    });
});
