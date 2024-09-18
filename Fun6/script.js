document.addEventListener('DOMContentLoaded', function() {
    emailjs.init('YOUR_USER_ID'); // Replace 'YOUR_USER_ID' with your actual EmailJS user ID

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const templateParams = {
            from_name: name,
            from_email: email,
            message: message
        };

        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams) // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual service and template IDs
            .then(function(response) {
                document.getElementById('status').innerText = 'Message sent successfully!';
            }, function(error) {
                document.getElementById('status').innerText = 'Failed to send message. Please try again.';
            });
    });
});
